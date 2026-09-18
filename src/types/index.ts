export type Category =
  | 'all'
  | 'playground'
  | 'cafe'
  | 'restaurant'
  | 'culture'
  | 'park'
  | 'bakery'
  | 'wine_bar'
  | 'brewery'
  | 'pharmacy'
  | 'shopping'
  | 'host_home';

export type StrollerAccess = 'easy' | 'moderate' | 'tricky';

export interface Place {
  id: string;
  name: string;
  category: Category;
  displayCategory: string;
  lat: number;
  lng: number;
  address: string;
  neighborhood: string;
  toddlerFriendly: boolean;
  strollerAccess: StrollerAccess;
  strollerDetails?: string;
  notes: string;
  toddlerTip?: string;
  distanceFromBaseKm?: number;
  walkMinutesFromBase?: number;
  transitMinutesFromBase?: number;
  diaperChangeNearby?: boolean;
  isUserAdded?: boolean;
}

export interface ItineraryStop {
  id: string;
  timeSlot: string; // e.g. "09:30 - 11:30"
  title: string;
  placeName: string;
  neighborhood: string;
  category: Category;
  address: string;
  coordinates?: [number, number];
  transitFromBase: {
    walkMin: number;
    transitMin?: number;
    bestOption: string; // e.g., "Tram 4 from Van Woustraat (14 min)"
  };
  strollerTags: string[]; // e.g. ["Step-Free", "Wide Paths", "Elevator Available"]
  toddlerBabyTip: string;
  diaperChangeNearby: string;
  backupPlayground?: string;
  description: string;
}

export interface ItineraryDay {
  id: string;
  dateStr: string; // "Tuesday, September 22, 2026"
  dayNumber: number;
  shortDate: string; // "Tue Sep 22"
  themeTitle: string; // "Arrival & Settle-In (De Pijp)"
  neighborhood: string;
  highlightIcon: string;
  overview: string;
  strollerComfortScore: 'High' | 'Moderate' | 'Good';
  stops: ItineraryStop[];
}

export interface TransitHubInfo {
  name: string;
  type: 'tram' | 'metro' | 'ferry' | 'train';
  lines: string[];
  distanceFromBase: string;
  walkTimeFromBaseMin: number;
  stepFreeAccess: boolean;
  elevatorNotes: string;
  strollerAdvice: string;
  directionKeyDestinations: string;
}
