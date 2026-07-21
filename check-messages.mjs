// Compare les cles de tous les fichiers messages/*.json.
// Usage a la racine du projet :  node check-messages.mjs

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

const DIR = 'messages'
const REF = 'en.json' // fichier de reference

function flatten(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out)
    else out.push(key)
  }
  return out
}

let files
try {
  files = readdirSync(DIR).filter(f => f.endsWith('.json'))
} catch {
  console.error(`Dossier "${DIR}" introuvable. Lance ce script a la racine du projet.`)
  process.exit(1)
}

const keys = {}
for (const f of files) {
  try {
    keys[f] = new Set(flatten(JSON.parse(readFileSync(join(DIR, f), 'utf8'))))
  } catch (e) {
    console.log(`${f} : JSON INVALIDE — ${e.message}`)
  }
}

if (!keys[REF]) { console.error(`${REF} introuvable ou invalide.`); process.exit(1) }

const ref = keys[REF]
console.log(`Reference : ${REF} (${ref.size} cles)\n`)

let clean = true
for (const f of files) {
  if (!keys[f] || f === REF) continue
  const missing = [...ref].filter(k => !keys[f].has(k))
  const extra = [...keys[f]].filter(k => !ref.has(k))
  if (!missing.length && !extra.length) { console.log(`${f.padEnd(10)} OK (${keys[f].size} cles)`); continue }
  clean = false
  console.log(`${f.padEnd(10)} ${keys[f].size} cles`)
  if (missing.length) {
    console.log(`   MANQUANTES (${missing.length}) :`)
    for (const k of missing.slice(0, 30)) console.log(`      ${k}`)
    if (missing.length > 30) console.log(`      ... et ${missing.length - 30} autres`)
  }
  if (extra.length) {
    console.log(`   EN TROP (${extra.length}) :`)
    for (const k of extra.slice(0, 15)) console.log(`      ${k}`)
    if (extra.length > 15) console.log(`      ... et ${extra.length - 15} autres`)
  }
  console.log('')
}
if (clean) console.log('\nToutes les langues ont exactement les memes cles.')
