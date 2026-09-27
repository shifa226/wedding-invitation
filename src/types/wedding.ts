export interface FamilyPerson {
  relation: string;
  name: string;
  detail?: string;
  location?: string;
}

export interface FamilyCardData {
  title: string;
  role: string;
  fullName: string;
  parents: string;
  parentsDetail?: string;
  paternalGrand: string;
  paternalGrandDetail?: string;
  maternalGrand: string;
  maternalGrandDetail?: string;
}

export interface EventDetails {
  arabicTitle: string;
  title: string;
  dayOfWeek: string;
  date: string;
  formattedDate: string;
  time: string;
  venue: string;
  address: string;
  landmark?: string;
  city: string;
  mealNote: string;
  mapQuery: string;
  mapUrl: string;
  image: string;
}

export interface StoryChapter {
  arabicTitle: string;
  title: string;
  subtitle: string;
  narrative: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  caption: string;
}

export interface WeddingData {
  couple: {
    monogram: string; // "I & M"
    arabicNames: string; // "سيد عرفان & مهك"
    groom: {
      name: string;
      fullName: string;
    };
    bride: {
      name: string;
      fullName: string;
    };
  };
  bismillahArabic: string;
  bismillahEnglish: string;
  invitationNote: string;
  familyGroom: FamilyCardData;
  familyBride: FamilyCardData;
  nikah: EventDetails;
  valima: EventDetails;
  countdownTargetDate: string; // 2026-10-22T12:30:00
  story: StoryChapter[];
  gallery: GalleryItem[];
  couplePhoto: string;
  nikahPhoto: string;
  valimaPhoto: string;
  storyMomentPhoto: string;
}
