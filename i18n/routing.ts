import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'bg', 'fr', 'de', 'tr', 'es', 'ru', 'zh', 'ja', 'ar'],
  defaultLocale: 'en'
})