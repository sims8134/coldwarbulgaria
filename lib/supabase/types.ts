export interface HistoryEvent {
  id: number
  event_date: string
  display_date: string
  title: string
  description: string
  image_url?: string
  theme_slug?: string
}

export interface Theme {
  id: number
  title: string
  slug: string
  icon_url?: string
  stats?: Record<string, unknown>
}

export interface Location {
  id: number
  name: string
  category: string
  coordinates: { lat: number; lng: number }
  description?: string
  image_url?: string
}

export interface ArchiveContent {
  id: number
  type: 'article' | 'video' | 'podcast'
  title: string
  description?: string
  media_url?: string
  image_url?: string
  created_at: string
}

export interface Artifact {
  id: number
  inventory_id: string
  title: string
  historical_date?: string
  source?: string
  description_text?: string
  theme_slug?: string
  image_url?: string
}