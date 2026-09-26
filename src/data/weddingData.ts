import { WeddingData } from '../types/wedding';

// High-fidelity image assets generated for this luxury invitation
import couplePortrait from '../assets/images/wedding_couple_portrait_1790340802201.jpg';
import nikahVenue from '../assets/images/nikah_ceremony_venue_1790340816525.jpg';
import valimaVenue from '../assets/images/valima_reception_venue_1790340831852.jpg';
import storyMoment from '../assets/images/couple_story_moment_1790340846105.jpg';

export const weddingData: WeddingData = {
  couple: {
    monogram: 'S & M',
    arabicNames: 'سيد عرفان & مهك',
    groom: {
      name: 'Syed Irfan',
      fullName: 'Syed Irfan',
    },
    bride: {
      name: 'Mehek S.',
      fullName: 'Mehek S.',
    },
  },
  bismillahArabic: 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ',
  bismillahEnglish: 'In the Name of Allah, The Most Beneficent & Most Merciful',
  invitationNote: 'Together with their families, cordially invite you to celebrate the marriage of',
  
  // Exact Family Details as specified:
  familyGroom: {
    title: 'THE GROOM',
    role: 'Groom & Family',
    fullName: 'Syed Irfan',
    parents: 'S/o Syed Akbar (Late)',
    parentsDetail: 'S.A. Fashions, R.T. Road, Sira',
    paternalGrand: 'Paternal Grand S/o Late Syed Abdur-Rehman Saheb',
    paternalGrandDetail: 'Uppar Bazar, Sira',
    maternalGrand: 'Maternal Grand S/o Hassain Khan (Late)',
    maternalGrandDetail: 'Shirani Mohalla, Sira',
  },

  familyBride: {
    title: 'THE BRIDE',
    role: 'Bride & Family',
    fullName: 'Mehek S.',
    parents: 'D/o Syed Subhan urf Syed Ansar',
    parentsDetail: 'Fruit Merchant, 1st Block, Madhugiri',
    paternalGrand: 'Paternal Grand D/o Ismail Sab (Late)',
    paternalGrandDetail: '',
    maternalGrand: 'Maternal Grand D/o Syed Lateef Sab (Late)',
    maternalGrandDetail: '',
  },

  // Exact Nikah Details:
  // Thursday, 22nd October 2026, 12:30 PM, HSR Shadi Mahal, Opp. KSRT Bus Stop, Madhugiri, Lunch: After Nikah
  nikah: {
    arabicTitle: 'النِّكَاح',
    title: 'NIKAH',
    dayOfWeek: 'Thursday',
    date: '22 October 2026',
    formattedDate: 'Thursday, 22nd October 2026',
    time: '12:30 PM',
    venue: 'HSR Shadi Mahal',
    address: 'Opp. KSRT Bus Stop',
    landmark: 'Opp. KSRT Bus Stop',
    city: 'Madhugiri',
    mealNote: 'Lunch After Nikah',
    mapQuery: 'HSR Shadi Mahal Opp KSRTC Bus Stand Madhugiri',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=HSR+Shadi+Mahal+Opp+KSRTC+Bus+Stand+Madhugiri',
    image: nikahVenue,
  },

  // Exact Valima Details:
  // Saturday, 24th October 2026, Valima Dinner: 7:30 PM, Jamiya Shadi Mahal, Near Jamiya Masjid, Sira
  valima: {
    arabicTitle: 'الوليمة',
    title: 'VALIMA',
    dayOfWeek: 'Saturday',
    date: '24 October 2026',
    formattedDate: 'Saturday, 24th October 2026',
    time: '7:30 PM',
    venue: 'Jamiya Shadi Mahal',
    address: 'Near Jamiya Masjid',
    landmark: 'Near Jamiya Masjid',
    city: 'Sira',
    mealNote: 'Valima Dinner: 7:30 PM',
    mapQuery: 'Jamiya Shadi Mahal Near Jamiya Masjid Sira',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jamiya+Shadi+Mahal+Near+Jamiya+Masjid+Sira',
    image: valimaVenue,
  },

  countdownTargetDate: '2026-10-22T12:30:00',

  story: [
    {
      arabicTitle: 'بدايتنا',
      title: 'Our Beginning',
      subtitle: 'A Blessed Spark',
      narrative: 'By the grace of the Almighty, two paths crossed in reverence and mutual respect, united by shared values and family heritage.',
    },
    {
      arabicTitle: 'عائلاتنا',
      title: 'Our Families',
      subtitle: 'The Harmony of Elders',
      narrative: 'Rooted in timeless traditions in Sira and Madhugiri, our beloved elders bestowed their warmest du’as and blessings upon our union.',
    },
    {
      arabicTitle: 'الرحلة',
      title: 'The Journey',
      subtitle: 'Growing in Faith & Love',
      narrative: 'A journey guided by patience, mutual admiration, and prayer, preparing our hearts for the sacred covenant of marriage.',
    },
    {
      arabicTitle: 'إلى الأبد',
      title: 'Forever Begins',
      subtitle: 'A Sacred Covenant',
      narrative: 'Surrounded by the cherished warmth of our elders, family, and loved ones, we embark upon a lifetime under the encompassing mercy of Allah.',
    },
  ],

  gallery: [
    {
      id: 'p1',
      title: 'Royal Celebration',
      category: 'Wedding Couple',
      image: couplePortrait,
      caption: 'Syed Irfan & Mehek S. in regal wedding couture.',
    },
    {
      id: 'p2',
      title: 'Nikah Solemnization',
      category: 'Nikah Venue',
      image: nikahVenue,
      caption: 'The majestic ceremonial arches awaiting our honoured guests in Madhugiri.',
    },
    {
      id: 'p3',
      title: 'Valima Reception',
      category: 'Valima Banquet',
      image: valimaVenue,
      caption: 'The imperial evening setting for the grand Valima dinner in Sira.',
    },
    {
      id: 'p4',
      title: 'Henna & Heirlooms',
      category: 'Traditions',
      image: storyMoment,
      caption: 'Artisan henna patterns and blessed heirlooms honoring generations of love.',
    },
  ],

  couplePhoto: couplePortrait,
  nikahPhoto: nikahVenue,
  valimaPhoto: valimaVenue,
  storyMomentPhoto: storyMoment,
};
