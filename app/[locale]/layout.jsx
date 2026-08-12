import '../globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { client } from '@/sanity/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/queries';

export async function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const settings = await client.fetch(SITE_SETTINGS_QUERY);
  const title = settings?.siteTitle?.[locale] || 'AgriCatalog';
  return {
    title,
    description: 'Catalog for agricultural products',
  };
}

export default async function RootLayout({ children, params }) {
  const { locale } = await params;
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar settings={settings} locale={locale} />
        <main className="flex-grow">
          {children}
        </main>
        <Footer settings={settings} locale={locale} />
      </body>
    </html>
  );
}
