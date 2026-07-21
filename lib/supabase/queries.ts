import { supabase } from './client'
import type { HistoryEvent, Theme, Location, ArchiveContent, Artifact } from './types'

export async function getHistoryEvents(): Promise<HistoryEvent[]> {
  const { data, error } = await supabase
    .from('history_events')
    .select('*')
    .order('event_date', { ascending: true })
  
  if (error) throw error
  return data || []
}

export async function getThemes(): Promise<Theme[]> {
  const { data, error } = await supabase
    .from('themes')
    .select('*')
  
  if (error) throw error
  return data || []
}

export async function getLocations(): Promise<Location[]> {
  const { data, error } = await supabase
    .from('locations')
    .select('*')
  
  if (error) throw error
  return data || []
}

export async function getArchiveContent(type?: 'article' | 'video' | 'podcast'): Promise<ArchiveContent[]> {
  let query = supabase.from('archive_content').select('*')
  
  if (type) query = query.eq('type', type)
  
  const { data, error } = await query.order('created_at', { ascending: false })
  
  if (error) throw error
  return data || []
}

export async function getArtifacts(themeSlug?: string): Promise<Artifact[]> {
  let query = supabase.from('artifacts').select('*')
  
  if (themeSlug) query = query.eq('theme_slug', themeSlug)
  
  const { data, error } = await query
  
  if (error) throw error
  return data || []
}