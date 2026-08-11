import '../globals.css';
import Navbar from '@/components/layout/Navbar';
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
  const currentYear = new Date().getFullYear();
  
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="antialiased min-h-screen flex flex-col bg-white">
        <Navbar settings={settings} locale={locale} />
        
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer matching old design */}
        <footer className="bg-[#131b2f] py-5 text-center">
          <p className="text-white/80 text-[13px]">
            &copy; {currentYear} Agricultural Products Catalog. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
