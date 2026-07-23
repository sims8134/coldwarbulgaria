export interface ColdWarLocation {
  id: string
  name: string
  oblast: string
  type: 'capital' | 'city' | 'monument' | 'brutalist' | 'industrial' | 'border' | 'military' | 'model-city' | 'camp'
  /** Documentation interne - non affiche a l'ecran, non traduit. */
  category: string
  coordinates: { lat: number; lng: number }
}

// Les descriptions sont dans messages/<lang>.json -> map.sites.<id>.description
// Les libelles de type sont dans messages/<lang>.json -> map.types.<type>

export const coldWarLocations: ColdWarLocation[] = [
  { id: 'sofia', name: 'Sofia', oblast: 'Sofia-City', type: 'capital', category: 'Capital / Monumental Architecture', coordinates: { lat: 42.6977, lng: 23.3219 } },
  { id: 'plovdiv', name: 'Plovdiv', oblast: 'Plovdiv', type: 'monument', category: 'Major City / Monument', coordinates: { lat: 42.1354, lng: 24.7453 } },
  { id: 'varna', name: 'Varna', oblast: 'Varna', type: 'brutalist', category: 'Coastal / Brutalism', coordinates: { lat: 43.2141, lng: 27.9147 } },
  { id: 'burgas', name: 'Burgas', oblast: 'Burgas', type: 'industrial', category: 'Industry / Coastal', coordinates: { lat: 42.5048, lng: 27.4626 } },
  { id: 'veliko-tarnovo', name: 'Veliko Tarnovo', oblast: 'Veliko Tarnovo', type: 'city', category: 'History / Strategic Point', coordinates: { lat: 43.0757, lng: 25.6172 } },
  { id: 'stara-zagora', name: 'Stara Zagora', oblast: 'Stara Zagora', type: 'brutalist', category: 'Urban Planning / Brutalism', coordinates: { lat: 42.4258, lng: 25.6345 } },
  { id: 'ruse', name: 'Ruse', oblast: 'Ruse', type: 'border', category: 'Border / Architecture', coordinates: { lat: 43.8356, lng: 25.9657 } },
  { id: 'dimitrovgrad', name: 'Dimitrovgrad', oblast: 'Haskovo', type: 'model-city', category: 'Model City / Socialist Heritage', coordinates: { lat: 42.057, lng: 25.5947 } },
  { id: 'pernik', name: 'Pernik', oblast: 'Pernik', type: 'industrial', category: 'Heavy Industry / Mining', coordinates: { lat: 42.6052, lng: 23.0378 } },
  { id: 'pleven', name: 'Pleven', oblast: 'Pleven', type: 'monument', category: 'Memorial / Military History', coordinates: { lat: 43.417, lng: 24.6067 } },
  { id: 'shumen', name: 'Shumen', oblast: 'Shumen', type: 'monument', category: 'Giant Monument / Cubism', coordinates: { lat: 43.2712, lng: 26.9361 } },
  { id: 'sliven', name: 'Sliven', oblast: 'Sliven', type: 'industrial', category: 'Industry / Nature Gateway', coordinates: { lat: 42.6824, lng: 26.315 } },
  { id: 'dobrich', name: 'Dobrich', oblast: 'Dobrich', type: 'city', category: 'Agriculture / Urban Planning', coordinates: { lat: 43.5725, lng: 27.8272 } },
  { id: 'blagoevgrad', name: 'Blagoevgrad', oblast: 'Blagoevgrad', type: 'city', category: 'Education / Border Region', coordinates: { lat: 42.0116, lng: 23.0942 } },
  { id: 'kardzhali', name: 'Kardzhali', oblast: 'Kardzhali', type: 'industrial', category: 'Infrastructure / Energy', coordinates: { lat: 41.6339, lng: 25.3781 } },
  { id: 'pazardzhik', name: 'Pazardzhik', oblast: 'Pazardzhik', type: 'industrial', category: 'Agriculture / Industry', coordinates: { lat: 42.1887, lng: 24.3332 } },
  { id: 'kyustendil', name: 'Kyustendil', oblast: 'Kyustendil', type: 'city', category: 'Spa / Border Region', coordinates: { lat: 42.2858, lng: 22.6897 } },
  { id: 'gabrovo', name: 'Gabrovo', oblast: 'Gabrovo', type: 'industrial', category: 'Industry / Textile', coordinates: { lat: 42.8746, lng: 25.3189 } },
  { id: 'smolyan', name: 'Smolyan', oblast: 'Smolyan', type: 'model-city', category: 'Mountain / Model City', coordinates: { lat: 41.5771, lng: 24.7014 } },
  { id: 'lovech', name: 'Lovech', oblast: 'Lovech', type: 'military', category: 'History / Military', coordinates: { lat: 43.1364, lng: 24.7139 } },
  { id: 'montana', name: 'Montana', oblast: 'Montana', type: 'brutalist', category: 'Mining / Brutalism', coordinates: { lat: 43.4092, lng: 23.2253 } },
  { id: 'vidin', name: 'Vidin', oblast: 'Vidin', type: 'border', category: 'Border / River Port', coordinates: { lat: 43.9906, lng: 22.8736 } },
  { id: 'vratsa', name: 'Vratsa', oblast: 'Vratsa', type: 'monument', category: 'Nature / Memorial', coordinates: { lat: 43.21, lng: 23.5627 } },
  { id: 'razgrad', name: 'Razgrad', oblast: 'Razgrad', type: 'city', category: 'Agriculture / Urban Planning', coordinates: { lat: 43.5258, lng: 26.5142 } },
  { id: 'silistra', name: 'Silistra', oblast: 'Silistra', type: 'border', category: 'River Port / Border', coordinates: { lat: 44.1167, lng: 27.2667 } },
  { id: 'targovishte', name: 'Targovishte', oblast: 'Targovishte', type: 'industrial', category: 'Industry / Tobacco', coordinates: { lat: 43.2508, lng: 26.5725 } },
  { id: 'yambol', name: 'Yambol', oblast: 'Yambol', type: 'military', category: 'Industry / Military', coordinates: { lat: 42.4833, lng: 26.5069 } },
  { id: 'haskovo', name: 'Haskovo', oblast: 'Haskovo', type: 'border', category: 'Border / Monument', coordinates: { lat: 41.9344, lng: 25.5553 } },
  { id: 'bansko', name: 'Bansko', oblast: 'Blagoevgrad', type: 'model-city', category: 'Tourism / Mountain', coordinates: { lat: 41.8397, lng: 23.4878 } },
  { id: 'borovets', name: 'Borovets', oblast: 'Sofia', type: 'model-city', category: 'Tourism / Mountain', coordinates: { lat: 42.2667, lng: 23.5833 } },
  { id: 'belene', name: 'Belene', oblast: 'Pleven', type: 'camp', category: 'Repression / Labour Camp', coordinates: { lat: 43.6417, lng: 25.1264 } },
  { id: 'kazanlak', name: 'Kazanlak', oblast: 'Stara Zagora', type: 'industrial', category: 'Arms Industry / History', coordinates: { lat: 42.6197, lng: 25.3969 } },
  { id: 'batak', name: 'Batak', oblast: 'Pazardzhik', type: 'monument', category: 'Memorial / History', coordinates: { lat: 41.9406, lng: 24.2192 } },
  { id: 'buzludzha', name: 'Buzludzha', oblast: 'Stara Zagora', type: 'monument', category: 'Monument / Socialist Heritage', coordinates: { lat: 42.7358, lng: 25.3936 } },
]

export const locationTypeColors: Record<ColdWarLocation['type'], string> = {
  capital: '#e63946',
  city: '#4A90D9',
  monument: '#e63946',
  brutalist: '#8B4513',
  industrial: '#808080',
  border: '#FF6600',
  military: '#FFD700',
  'model-city': '#9B59B6',
  camp: '#EDE6DB',
}

/** Ordre d'affichage de la legende. Les libelles viennent de map.types.<type>. */
export const locationTypeOrder: ColdWarLocation['type'][] = [
  'capital', 'city', 'monument', 'brutalist', 'industrial', 'border', 'military', 'model-city', 'camp',
]