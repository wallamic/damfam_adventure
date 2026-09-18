import { Place } from '../types';
import { initialPlaces, BASECAMP_COORDS } from '../data/places';

const STORAGE_KEY_USER_PLACES = 'ams_family_user_places_v1';
const STORAGE_KEY_FAVORITES = 'ams_family_favorites_v1';
const STORAGE_KEY_COMPLETED_STOPS = 'ams_family_completed_stops_v1';

// Calculate distance in kilometers using the Haversine formula
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(2));
}

// Estimate walk time assuming ~4.5 km/h stroller pace (with toddlers)
export function estimateStrollerWalkMinutes(distanceKm: number): number {
  const minutes = Math.round((distanceKm / 4.0) * 60);
  return Math.max(minutes, 2);
}

export function getStoredPlaces(): Place[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER_PLACES);
    if (!raw) return initialPlaces;
    const userPlaces: Place[] = JSON.parse(raw);
    
    // Combine seed places with user added places, avoiding duplicates
    const seedIds = new Set(initialPlaces.map((p) => p.id));
    const customPlaces = userPlaces.filter((p) => !seedIds.has(p.id));
    return [...initialPlaces, ...customPlaces];
  } catch (e) {
    console.error('Error loading stored places:', e);
    return initialPlaces;
  }
}

export function saveUserPlace(placeData: Omit<Place, 'id' | 'distanceFromBaseKm' | 'walkMinutesFromBase'>): Place {
  const distance = calculateDistanceKm(
    BASECAMP_COORDS[0],
    BASECAMP_COORDS[1],
    placeData.lat,
    placeData.lng
  );
  const walkMin = estimateStrollerWalkMinutes(distance);

  const newPlace: Place = {
    ...placeData,
    id: `user-place-${Date.now()}`,
    distanceFromBaseKm: distance,
    walkMinutesFromBase: walkMin,
    transitMinutesFromBase: Math.min(walkMin, Math.round(walkMin * 0.45) + 5),
    isUserAdded: true,
  };

  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER_PLACES);
    const existing: Place[] = raw ? JSON.parse(raw) : [];
    const updated = [newPlace, ...existing];
    localStorage.setItem(STORAGE_KEY_USER_PLACES, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving user place:', e);
  }

  return newPlace;
}

export function deleteUserPlace(placeId: string): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER_PLACES);
    if (!raw) return;
    const existing: Place[] = JSON.parse(raw);
    const filtered = existing.filter((p) => p.id !== placeId);
    localStorage.setItem(STORAGE_KEY_USER_PLACES, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error deleting place:', e);
  }
}

export function getFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FAVORITES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavorite(placeId: string): string[] {
  try {
    const favs = getFavorites();
    const nextFavs = favs.includes(placeId)
      ? favs.filter((id) => id !== placeId)
      : [...favs, placeId];
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(nextFavs));
    return nextFavs;
  } catch {
    return [];
  }
}

export function getCompletedStops(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_COMPLETED_STOPS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleCompletedStop(stopId: string): string[] {
  try {
    const list = getCompletedStops();
    const updated = list.includes(stopId)
      ? list.filter((id) => id !== stopId)
      : [...list, stopId];
    localStorage.setItem(STORAGE_KEY_COMPLETED_STOPS, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
