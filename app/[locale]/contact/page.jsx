import Link from 'next/link';
import { client } from '@/sanity/client';
import { SITE_SETTINGS_QUERY } from '@/sanity/queries';
import { MapPin, Phone, Mail } from 'lucide-react';

export async function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: locale === 'ar' ? 'تواصل معنا | الهناء' : 'Contact Us | Al-Hanaa',
    description:
      locale === 'ar'
        ? 'تواصل معنا للاستفسار عن منتجاتنا الزراعية.'
        : 'Get in touch with Al-Hanaa for enquiries about our agricultural products.',
  };
}

// ─── Info Card ────────────────────────────────────────────────────────────────
function InfoCard({ icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-8 flex flex-col items-center text-center gap-4">
      <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <h3 className="text-base font-bold text-[#131b2f]">{title}</h3>
      <div className="text-sm text-gray-500 leading-relaxed space-y-1">{children}</div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function ContactPage({ params }) {
  const { locale } = await params;
  const settings = await client.fetch(SITE_SETTINGS_QUERY);

  const isAr = locale === 'ar';

  const email    = settings?.contactEmail  || 'info@alhanaa.com';
  const phones   = settings?.phoneNumbers  || ['+966 XX XXX XXXX'];
  const location = settings?.location?.[locale] || settings?.location?.en || (isAr ? 'المملكة العربية السعودية' : 'Saudi Arabia');

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ─── Hero Banner ─── */}
      <section className="relative bg-[#131b2f] py-20 md:py-28 overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -start-24 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -end-24 w-96 h-96 bg-green-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block bg-green-500/20 text-green-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5">
            {isAr ? 'تواصل معنا' : 'Contact'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
            {isAr ? 'تواصل معنا' : 'Contact Us'}
          </h1>
          <p className="mt-4 text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {isAr
              ? 'نحن هنا للإجابة على استفساراتك وتقديم الدعم الذي تحتاجه.'
              : 'We are here to answer your questions and provide the support you need.'}
          </p>
        </div>
      </section>

      {/* ─── Contact Cards ─── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* Location */}
          <InfoCard
            icon={<MapPin className="w-6 h-6 text-green-600" />}
            title={isAr ? 'الموقع' : 'Location'}
          >
            <p>{location}</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-green-600 font-semibold text-xs hover:underline"
            >
              {isAr ? 'عرض على خرائط Google ↗' : 'View on Google Maps ↗'}
            </a>
          </InfoCard>

          {/* Phone */}
          <InfoCard
            icon={<Phone className="w-6 h-6 text-green-600" />}
            title={isAr ? 'الهاتف' : 'Phone'}
          >
            {phones.map((phone, i) => (
              <a
                key={i}
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="block hover:text-green-600 transition-colors font-medium"
              >
                {phone}
              </a>
            ))}
          </InfoCard>

          {/* Email */}
          <InfoCard
            icon={<Mail className="w-6 h-6 text-green-600" />}
            title={isAr ? 'البريد الإلكتروني' : 'Email'}
          >
            <a
              href={`mailto:${email}`}
              className="hover:text-green-600 transition-colors font-medium break-all"
            >
              {email}
            </a>
          </InfoCard>

        </div>
      </section>

      {/* ─── Map Embed ─── */}
      <section className="pb-14 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm aspect-video w-full">
            <iframe
              title={isAr ? 'خريطة الموقع' : 'Location Map'}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14529.052440097!2d46.6753!3d24.6877!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQxJzE1LjciTiA0NsKwNDAnMzEuMSJF!5e0!3m2!1sen!2ssa!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="text-center text-xs text-gray-400 mt-3">
            {isAr
              ? '* سيتم تحديث الموقع الدقيق قريباً'
              : '* Exact coordinates will be updated soon'}
          </p>
        </div>
      </section>

    </div>
  );
}