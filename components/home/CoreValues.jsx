export default function CoreValues({ locale, settings }) {
  const defaultCards = [
    {
      id: 'vision',
      title: locale === 'ar' ? 'الرؤية' : 'Our Vision',
      text: locale === 'ar' 
        ? 'أن نكون الشريك الرائد والأكثر موثوقية في تطوير حلول زراعية مستدامة ومبتكرة.' 
        : 'To be the leading and most trusted partner in advancing sustainable and innovative agricultural solutions.',
    },
    {
      id: 'mission',
      title: locale === 'ar' ? 'رسالتنا' : 'Our Mission',
      text: locale === 'ar' 
        ? 'تمكين المزارعين بمنتجات فائقة الجودة لحماية وتغذية المحاصيل لزيادة الإنتاجية مع الحفاظ على البيئة.' 
        : 'Empowering farmers with premium crop protection and nutrition products to maximize yield while preserving the environment.',
    },
    {
      id: 'values',
      title: locale === 'ar' ? 'قيمنا' : 'Our Values',
      text: locale === 'ar' 
        ? 'الجودة، الاستدامة، الابتكار، والالتزام الراسخ بنجاح عملائنا.' 
        : 'Quality, Sustainability, Innovation, and unwavering commitment to Customer Success.',
    },
  ];

  const sanityCards = settings?.corePrinciplesCards;
  const cardsData = sanityCards && sanityCards.length > 0 ? sanityCards : defaultCards;

  // We keep the icons hardcoded and map them to the cards by index
  const icons = [
    (
      <svg key="eye" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-green-600">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    (
      <svg key="target" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-green-600">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
      </svg>
    ),
    (
      <svg key="leaf" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-green-600">
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
      </svg>
    )
  ];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (Optional, but good for context) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#131b2f] mb-4">
            {settings?.corePrinciplesTitle?.[locale] || (locale === 'ar' ? 'مبادئنا الأساسية' : 'Our Core Principles')}
          </h2>
          <p className="text-gray-500 text-base md:text-lg">
            {settings?.corePrinciplesSubtitle?.[locale] || (locale === 'ar' 
              ? 'الأسس التي نبني عليها نجاحنا وشراكتنا مع المزارعين' 
              : 'The foundations upon which we build our success and partnership with farmers')}
          </p>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cardsData.map((card, idx) => (
            <div 
              key={card.id || card._key || idx} 
              className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center hover:-translate-y-2 hover:shadow-xl hover:border-green-100 transition-all duration-300 flex flex-col items-center"
            >
              <div className="w-20 h-20 bg-green-100/70 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                {icons[idx % icons.length]}
              </div>
              <h3 className="text-2xl font-bold text-[#131b2f] mb-4">
                {card.title?.[locale] || card.title?.en || card.title || ''}
              </h3>
              <p className="text-gray-600 leading-relaxed text-[15px]">
                {card.text?.[locale] || card.text?.en || card.text || ''}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
