import React, { useState } from 'react';
import {
  X,
  MapPin,
  Baby,
  ShieldCheck,
  Plus,
  Navigation,
  Compass,
  Check
} from 'lucide-react';
import { Category, StrollerAccess, Place } from '../types';
import { BASECAMP_COORDS } from '../data/places';

interface AddPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPlace: (newPlace: Omit<Place, 'id' | 'distanceFromBaseKm' | 'walkMinutesFromBase'>) => void;
}

const CATEGORY_OPTIONS: { value: Category; label: string; icon: string }[] = [
  { value: 'playground', label: 'Toddler Playground', icon: '🛝' },
  { value: 'cafe', label: 'Cafe / Coffee', icon: '☕' },
  { value: 'restaurant', label: 'Restaurant / Food', icon: '🍽️' },
  { value: 'bakery', label: 'Bakery / Pâtisserie', icon: '🥐' },
  { value: 'park', label: 'Park / Green Space', icon: '🌳' },
  { value: 'culture', label: 'Culture & Museum', icon: '🏛️' },
  { value: 'wine_bar', label: 'Wine Bar / Borrel', icon: '🍷' },
  { value: 'brewery', label: 'Brewery', icon: '🍺' },
  { value: 'pharmacy', label: 'Pharmacy / Drugstore', icon: '💊' },
  { value: 'shopping', label: 'Market / Shopping', icon: '🛍️' },
];

const NEIGHBORHOOD_OPTIONS = [
  'De Pijp',
  'Rivierenbuurt',
  'Museumkwartier',
  'Oud-Zuid',
  'Jordaan',
  'Canal Belt (Grachtengordel)',
  'Westerpark',
  'Plantage / Oost',
  'Indische Buurt',
  'Centrum / Damrak',
  'Amsterdam Noord',
  'Rembrandtpark / West',
];

export const AddPlaceModal: React.FC<AddPlaceModalProps> = ({
  isOpen,
  onClose,
  onAddPlace,
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Category>('playground');
  const [neighborhood, setNeighborhood] = useState('De Pijp');
  const [address, setAddress] = useState('');
  const [lat, setLat] = useState<number>(BASECAMP_COORDS[0]);
  const [lng, setLng] = useState<number>(BASECAMP_COORDS[1]);
  const [strollerAccess, setStrollerAccess] = useState<StrollerAccess>('easy');
  const [toddlerFriendly, setToddlerFriendly] = useState(true);
  const [notes, setNotes] = useState('');
  const [toddlerTip, setToddlerTip] = useState('');
  const [diaperChangeNearby, setDiaperChangeNearby] = useState(true);
  const [isLocating, setIsLocating] = useState(false);

  // Keyboard accessibility: Escape key closes the bottom sheet
  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(Number(pos.coords.latitude.toFixed(5)));
        setLng(Number(pos.coords.longitude.toFixed(5)));
        if (!address) {
          setAddress('Current GPS Coordinates');
        }
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsLocating(false);
        alert('Could not retrieve GPS coordinates.');
      },
      { timeout: 8000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const catObj = CATEGORY_OPTIONS.find((c) => c.value === category);

    onAddPlace({
      name: name.trim(),
      category,
      displayCategory: catObj ? catObj.label : 'Family Spot',
      lat: Number(lat) || BASECAMP_COORDS[0],
      lng: Number(lng) || BASECAMP_COORDS[1],
      address: address.trim() || `${neighborhood}, Amsterdam`,
      neighborhood,
      toddlerFriendly,
      strollerAccess,
      strollerDetails:
        strollerAccess === 'easy'
          ? 'Step-free access, wide paths'
          : strollerAccess === 'moderate'
          ? 'Some bumps or narrow entrance'
          : 'Steep steps / narrow layout',
      notes: notes.trim() || 'Recommended by family travelers.',
      toddlerTip: toddlerTip.trim() || 'High chairs / kid-friendly vibe.',
      diaperChangeNearby,
    });

    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2D1B10]/50 backdrop-blur-xs p-0 sm:p-4 overflow-y-auto animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-spot-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg bg-white border border-[#EDE2D5] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-8 sm:zoom-in-95"
      >
        {/* Mobile Drag Handle Indicator (Ergonomic cue) */}
        <div className="w-12 h-1.5 rounded-full bg-[#D5BFA8] mx-auto mt-2.5 mb-0.5 sm:hidden" aria-hidden="true" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EDE2D5] flex items-center justify-between bg-[#FAF4ED]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#F5ECE0] text-[#C85A32] flex items-center justify-center border border-[#DECEBE]">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <h3 id="add-spot-title" className="text-base sm:text-lg font-bold text-[#2E1A0F] font-serif">
                Add New Family Spot
              </h3>
              <p className="text-xs text-[#7A6150]">
                Share a find with both families
              </p>
            </div>
          </div>
          {/* Visible 44px close button for accessibility */}
          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center rounded-xl text-[#7A6150] hover:text-[#2E1A0F] hover:bg-[#F5ECE0] transition-colors active:scale-95"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form with overscroll-contain & 16px base font to prevent iOS zoom */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto overscroll-contain space-y-4 text-sm">
          {/* Place Name */}
          <div>
            <label htmlFor="spot-name" className="block text-xs font-bold text-[#3D2619] mb-1">
              Place / Spot Name *
            </label>
            <input
              id="spot-name"
              type="text"
              required
              enterKeyHint="next"
              autoComplete="off"
              placeholder="e.g., De Bakkerswinkel, Sarphatipark Sandpit..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-[16px] sm:text-sm bg-white border border-[#DCCEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 text-[#3D2619] placeholder-[#A89484] min-h-[44px]"
            />
          </div>

          {/* Category & Neighborhood Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="spot-category" className="block text-xs font-bold text-[#3D2619] mb-1">
                Category
              </label>
              <select
                id="spot-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full px-3 py-2.5 bg-white border border-[#DCCEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 text-[#3D2619] text-[16px] sm:text-xs min-h-[44px]"
              >
                {CATEGORY_OPTIONS.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="spot-neighborhood" className="block text-xs font-bold text-[#3D2619] mb-1">
                Neighborhood
              </label>
              <select
                id="spot-neighborhood"
                value={neighborhood}
                onChange={(e) => setNeighborhood(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-[#DCCEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 text-[#3D2619] text-[16px] sm:text-xs min-h-[44px]"
              >
                {NEIGHBORHOOD_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Address & GPS */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor="spot-address" className="text-xs font-bold text-[#3D2619]">
                Address or Street
              </label>
              <button
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isLocating}
                className="min-h-[32px] px-2 py-1 text-xs text-[#C85A32] font-semibold flex items-center gap-1 hover:underline disabled:opacity-50 active:scale-95"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>{isLocating ? 'Locating...' : 'Use Current GPS'}</span>
              </button>
            </div>
            <input
              id="spot-address"
              type="text"
              enterKeyHint="next"
              autoComplete="off"
              placeholder="e.g. Van Woustraat 45, 1074 AA Amsterdam"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 text-[16px] sm:text-sm bg-white border border-[#DCCEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 text-[#3D2619] placeholder-[#A89484] min-h-[44px]"
            />
          </div>

          {/* Stroller Accessibility Rating */}
          <div>
            <label className="block text-xs font-bold text-[#3D2619] mb-1.5">
              Stroller Accessibility Rating
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setStrollerAccess('easy')}
                className={`min-h-[48px] py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                  strollerAccess === 'easy'
                    ? 'bg-[#EBF3E8] text-[#2F5229] border-[#A9CCA0] font-bold'
                    : 'bg-[#FAF4ED] text-[#6B5341] border-[#EDE2D5]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#2F5229]" />
                <span>Easy (Step-free)</span>
              </button>

              <button
                type="button"
                onClick={() => setStrollerAccess('moderate')}
                className={`min-h-[48px] py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                  strollerAccess === 'moderate'
                    ? 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A] font-bold'
                    : 'bg-[#FAF4ED] text-[#6B5341] border-[#EDE2D5]'
                }`}
              >
                <Compass className="w-4 h-4 text-[#B45309]" />
                <span>Moderate</span>
              </button>

              <button
                type="button"
                onClick={() => setStrollerAccess('tricky')}
                className={`min-h-[48px] py-2 px-2 rounded-xl text-xs font-medium border flex flex-col items-center justify-center gap-1 transition-all active:scale-95 ${
                  strollerAccess === 'tricky'
                    ? 'bg-[#FEE2E2] text-[#991B1B] border-[#FECACA] font-bold'
                    : 'bg-[#FAF4ED] text-[#6B5341] border-[#EDE2D5]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#991B1B]" />
                <span>Tricky Steps</span>
              </button>
            </div>
          </div>

          {/* Notes & Description */}
          <div>
            <label htmlFor="spot-notes" className="block text-xs font-bold text-[#3D2619] mb-1">
              Notes & Highlights
            </label>
            <textarea
              id="spot-notes"
              rows={2}
              enterKeyHint="next"
              placeholder="Why visit? Great pastries, shaded tables, enclosed play area..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 text-[16px] sm:text-sm bg-white border border-[#DCCEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 text-[#3D2619] placeholder-[#A89484]"
            />
          </div>

          {/* Toddler / Baby Tip */}
          <div>
            <label htmlFor="spot-toddler-tip" className="block text-xs font-bold text-[#3D2619] mb-1">
              Toddler & Infant Tip
            </label>
            <input
              id="spot-toddler-tip"
              type="text"
              enterKeyHint="done"
              placeholder="e.g., High chairs available, quiet nursing corner, sandpit..."
              value={toddlerTip}
              onChange={(e) => setToddlerTip(e.target.value)}
              className="w-full px-3.5 py-2.5 text-[16px] sm:text-sm bg-white border border-[#DCCEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 text-[#3D2619] placeholder-[#A89484] min-h-[44px]"
            />
          </div>

          {/* Checkboxes with full 44px touch targets */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <label className="min-h-[44px] flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-[#4A3222] font-medium select-none">
              <input
                type="checkbox"
                checked={toddlerFriendly}
                onChange={(e) => setToddlerFriendly(e.target.checked)}
                className="w-5 h-5 rounded text-[#C85A32] focus:ring-[#C85A32] accent-[#C85A32]"
              />
              <span>Toddler-Friendly</span>
            </label>

            <label className="min-h-[44px] flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-[#4A3222] font-medium select-none">
              <input
                type="checkbox"
                checked={diaperChangeNearby}
                onChange={(e) => setDiaperChangeNearby(e.target.checked)}
                className="w-5 h-5 rounded text-[#C85A32] focus:ring-[#C85A32] accent-[#C85A32]"
              />
              <span>Diaper Changing Nearby</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 border-t border-[#EDE2D5] flex items-center justify-end gap-2 pb-2">
            <button
              type="button"
              onClick={onClose}
              className="min-h-[44px] px-4 py-2.5 rounded-xl text-[#6B5341] hover:bg-[#FAF4ED] border border-[#EDE2D5] text-xs sm:text-sm font-semibold transition-colors active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="min-h-[44px] flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#B34B24] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs active:scale-95"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Save to Itinerary</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
