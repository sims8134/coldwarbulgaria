import HeroSection from '@/components/sections/HeroSection'
import TimelineSection from '@/components/sections/TimelineSection'
import MapSection from '@/components/sections/MapSection'
import ThemesSection from '@/components/sections/ThemesSection'
import MuseumSection from '@/components/sections/MuseumSection'
import ReconstructionsSection from '@/components/sections/ReconstructionsSection'
import MediaSection from '@/components/sections/MediaSection'
import PublicationsSection from '@/components/sections/PublicationsSection'
import PartnersSection from '@/components/sections/PartnersSection'

export default function Home() {
  return (
    <main style={{background: '#000', minHeight: '100vh', width: '100%'}}>
      <HeroSection />
      <TimelineSection />
      <MapSection />
      <ThemesSection />
      <MuseumSection />
      <ReconstructionsSection />
      <MediaSection />
      <PublicationsSection />
      <PartnersSection />
    </main>
  )
}