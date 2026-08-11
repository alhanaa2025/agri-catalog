import HeroSlider from '@/components/home/HeroSlider';
import { client } from '@/sanity/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/queries';

export default async function HomePage({ params }) {
  const { locale } = await params;
  const settings = await client.fetch(SITE_SETTINGS_QUERY);
  
  return (
    <div className="bg-white">
      <HeroSlider slides={settings?.heroSlides} locale={locale} />
      
      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center bg-white">
        <h1 className="text-3xl font-bold text-[#131b2f] mb-3">
          {locale === 'ar' ? 'مرحباً' : 'Welcome'}
        </h1>
        {settings?.welcomeText?.[locale] && (
          <p className="text-[#64748b] max-w-2xl mx-auto text-[15px]">
            {settings.welcomeText[locale]}
          </p>
        )}
      </div>
    </div>
  );
}
