import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/ui/Navbar'
import Footer from '@/components/ui/Footer'
import '../globals.css'

const locales = ['en', 'bg', 'fr', 'de','tr', 'es', 'ru', 'zh', 'ja', 'ar']

export const metadata: Metadata = {
  title: 'Cold War Bulgaria',
  description: 'An immersive journey through 45 years of life behind the Iron Curtain.',
  icons: {
    icon: '/assets/favicon.png',
  },
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!locales.includes(locale)) notFound()

  const messages = await getMessages()

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar locale={locale} />
          {children}
          <Footer locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}