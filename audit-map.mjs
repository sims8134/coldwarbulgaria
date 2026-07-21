// Audit des positions de la carte.
// Verifie que chaque ville tombe bien dans le polygone de son propre oblast.
//
// Usage, a la racine du projet :
//   node audit-map.mjs
//
// Aucune dependance. Ne modifie aucun fichier.

import { readFileSync } from 'fs'

const MAP = 'components/sections/MapSection.tsx'
const LOC = 'components/map/locationData.ts'

// Codes ISO 3166-2:BG -> nom d'oblast tel qu'ecrit dans locationData.ts
const OBLAST = {
  BG01: 'Blagoevgrad',    BG02: 'Burgas',      BG03: 'Varna',
  BG04: 'Veliko Tarnovo', BG05: 'Vidin',       BG06: 'Vratsa',
  BG07: 'Gabrovo',        BG08: 'Dobrich',     BG09: 'Kardzhali',
  BG10: 'Kyustendil',     BG11: 'Lovech',      BG12: 'Montana',
  BG13: 'Pazardzhik',     BG14: 'Pernik',      BG15: 'Pleven',
  BG16: 'Plovdiv',        BG17: 'Razgrad',     BG18: 'Ruse',
  BG19: 'Silistra',       BG20: 'Sliven',      BG21: 'Smolyan',
  BG22: 'Sofia-City',     BG23: 'Sofia',       BG24: 'Stara Zagora',
  BG25: 'Targovishte',    BG26: 'Haskovo',     BG27: 'Shumen',
  BG28: 'Yambol',
}

// --- lecture des fichiers ---------------------------------------------------
let mapSrc, locSrc
try {
  mapSrc = readFileSync(MAP, 'utf8')
  locSrc = readFileSync(LOC, 'utf8')
} catch (e) {
  console.error(`Fichier introuvable : ${e.path}`)
  console.error('Lance ce script depuis la racine du projet (la ou se trouve package.json).')
  process.exit(1)
}

// --- parsing ----------------------------------------------------------------
// Les tracés n'utilisent que M (absolu) puis l (relatif) : parsing direct.
function toPoints(d) {
  const n = d.match(/-?\d+\.?\d*/g).map(Number)
  const pts = [[n[0], n[1]]]
  for (let i = 2; i + 1 < n.length; i += 2) {
    const [px, py] = pts[pts.length - 1]
    pts.push([px + n[i], py + n[i + 1]])
  }
  return pts
}

const polys = {}
for (const m of mapSrc.matchAll(/\{\s*id:\s*'(BG\d+)',\s*d:\s*'([^']+)'\s*\}/g)) {
  polys[m[1]] = toPoints(m[2])
}

const coords = {}
for (const m of mapSrc.matchAll(/'([^']+)':\s*\{\s*cx:\s*(-?[\d.]+),\s*cy:\s*(-?[\d.]+)\s*\}/g)) {
  coords[m[1]] = { cx: +m[2], cy: +m[3] }
}

const cities = []
for (const m of locSrc.matchAll(/name:\s*'([^']+)',\s*oblast:\s*'([^']+)'/g)) {
  cities.push({ name: m[1], oblast: m[2] })
}

console.log(`${Object.keys(polys).length} polygones, ${Object.keys(coords).length} positions, ${cities.length} villes\n`)

// --- geometrie --------------------------------------------------------------
function inside([x, y], poly) {
  let c = false
  for (let i = 0, n = poly.length; i < n; i++) {
    const [x1, y1] = poly[i]
    const [x2, y2] = poly[(i + 1) % n]
    if ((y1 > y) !== (y2 > y) && x < ((x2 - x1) * (y - y1)) / (y2 - y1) + x1) c = !c
  }
  return c
}

// distance du point au bord du polygone (pour reperer les marqueurs qui debordent)
function edgeDist([x, y], poly) {
  let best = Infinity
  for (let i = 0, n = poly.length; i < n; i++) {
    const [x1, y1] = poly[i]
    const [x2, y2] = poly[(i + 1) % n]
    const dx = x2 - x1, dy = y2 - y1
    const L = dx * dx + dy * dy
    let t = L ? ((x - x1) * dx + (y - y1) * dy) / L : 0
    t = Math.max(0, Math.min(1, t))
    best = Math.min(best, Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy)))
  }
  return best
}

const codeOf = {}
for (const [code, name] of Object.entries(OBLAST)) codeOf[name] = code

// --- audit ------------------------------------------------------------------
const RADIUS = 6.5 // rayon du halo du marqueur (size+2)
const bad = [], tight = [], good = []

for (const { name, oblast } of cities) {
  const c = coords[name]
  if (!c) { bad.push([name, 'aucune position dans cityCoords']); continue }
  const code = codeOf[oblast]
  if (!code || !polys[code]) { bad.push([name, `oblast "${oblast}" non reconnu`]); continue }

  const p = [c.cx, c.cy]
  if (!inside(p, polys[code])) {
    const found = Object.keys(polys).filter(k => inside(p, polys[k])).map(k => OBLAST[k])
    bad.push([name, `hors de ${oblast} — tombe dans : ${found.join(', ') || 'aucun oblast (hors du pays)'}`])
  } else {
    const d = edgeDist(p, polys[code])
    if (d < RADIUS) tight.push([name, `a ${d.toFixed(1)} px du bord (marqueur de rayon ${RADIUS} : il deborde)`])
    else good.push(name)
  }
}

const line = s => console.log(s)
if (bad.length) {
  line('MAL PLACEES')
  for (const [n, r] of bad) line(`   ${n.padEnd(16)} ${r}`)
  line('')
}
if (tight.length) {
  line('EN LIMITE')
  for (const [n, r] of tight) line(`   ${n.padEnd(16)} ${r}`)
  line('')
}
line(`CORRECTES : ${good.length} / ${cities.length}`)
if (good.length) line(`   ${good.join(', ')}`)
