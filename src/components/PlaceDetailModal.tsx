import React from 'react';
import {
  X,
  MapPin,
  Baby,
  Footprints,
  Train,
  Heart,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  Trash2,
  Share2,
  Navigation
} from 'lucide-react';
import { Place } from '../types';
import { BASECAMP_ADDRESS } from '../data/places';

interface PlaceDetailModalProps {
  place: Place | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onDeletePlace?: (id: string) => void;
}

export const PlaceDetailModal: React.FC<PlaceDetailModalProps> = ({
  place,
  onClose,
  isFavorite,
  onToggleFavorite,
  onDeletePlace,
}) => {
  // Keyboard accessibility: Escape key closes the bottom sheet
  React.useEffect(() => {
    if (!place) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [place, onClose]);

  if (!place) return null;

  const openGoogleMapsDirections = () => {
    const origin = encodeURIComponent(BASECAMP_ADDRESS);
    const destination = encodeURIComponent(`${place.name}, ${place.address}`);
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const sharePlace = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: place.name,
          text: `${place.name} in ${place.neighborhood}: ${place.notes}`,
          url: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            `${place.name}, ${place.address}`
          )}`,
        });
      } catch {
        // Ignored or cancelled
      }
    } else {
      navigator.clipboard.writeText(
        `${place.name} - ${place.address} (${place.neighborhood})`
      );
      alert('Place details copied to clipboard!');
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#2D1B10]/50 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="place-detail-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg bg-white border border-[#EDE2D5] rounded-t-3xl sm:rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-6"
      >
        {/* Mobile Drag Handle Indicator (Ergonomic cue) */}
        <div className="w-12 h-1.5 rounded-full bg-[#D5BFA8] mx-auto mt-2.5 mb-0.5 sm:hidden" aria-hidden="true" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#EDE2D5] flex items-start justify-between gap-3 bg-[#FAF4ED]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F5ECE0] text-[#803816] border border-[#DECEBE]">
                {place.displayCategory}
              </span>
              <span className="text-xs text-[#7A6150] font-medium">
                {place.neighborhood}
              </span>
            </div>
            <h3 id="place-detail-title" className="text-lg sm:text-xl font-bold text-[#2E1A0F] font-serif leading-snug">
              {place.name}
            </h3>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleFavorite(place.id)}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-[#BCAAA0] hover:text-[#C85A32] hover:bg-[#F5ECE0] transition-colors active:scale-95"
              title="Toggle Favorite"
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite
                    ? 'fill-[#C85A32] text-[#C85A32]'
                    : 'text-[#BCAAA0]'
                }`}
              />
            </button>
            <button
              onClick={sharePlace}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-[#7A6150] hover:text-[#2E1A0F] hover:bg-[#F5ECE0] transition-colors active:scale-95"
              title="Share Place"
              aria-label="Share place details"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-xl text-[#7A6150] hover:text-[#2E1A0F] hover:bg-[#F5ECE0] transition-colors active:scale-95"
              title="Close"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body with overscroll-contain */}
        <div className="p-4 sm:p-5 overflow-y-auto overscroll-contain space-y-4 text-xs sm:text-sm">
          {/* Address */}
          <div className="flex items-start gap-2 text-[#5C4535]">
            <MapPin className="w-4 h-4 text-[#C85A32] flex-shrink-0 mt-0.5" />
            <span className="leading-snug">{place.address}</span>
          </div>

          {/* Distance & Transit from Eendrachtstraat 13H */}
          <div className="p-3 rounded-xl bg-[#FAF2E8] border border-[#ECD9C5] space-y-1.5">
            <div className="font-bold text-[#803816] flex items-center gap-1.5">
              <Navigation className="w-4 h-4 text-[#C85A32]" />
              <span>From Host Basecamp (Eendrachtstraat 13H):</span>
            </div>
            <div className="flex items-center gap-4 text-[#5C4535]">
              <span className="flex items-center gap-1 font-medium">
                <Footprints className="w-3.5 h-3.5 text-[#C85A32]" />
                ~{place.walkMinutesFromBase} min walk ({place.distanceFromBaseKm} km)
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Train className="w-3.5 h-3.5 text-[#C85A32]" />
                ~{place.transitMinutesFromBase} min transit
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-[#2E1A0F] mb-1 font-serif">
              About this spot:
            </h4>
            <p className="text-[#5C4535] leading-relaxed">
              {place.notes}
            </p>
          </div>

          {/* Stroller Accessibility Details */}
          <div className="p-3 rounded-xl bg-[#FAF4ED] border border-[#EDE2D5] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#2E1A0F] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#2F5229]" />
                Stroller Accessibility:
              </span>
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F5ECE0] text-[#803816] border border-[#DECEBE]">
                {place.strollerAccess}
              </span>
            </div>
            {place.strollerDetails && (
              <p className="text-[#5C4535] text-xs leading-relaxed">
                {place.strollerDetails}
              </p>
            )}
          </div>

          {/* Toddler & Baby Tip */}
          {place.toddlerTip && (
            <div className="p-3 rounded-xl bg-[#EBF3E8] border border-[#C5DCBF] space-y-1">
              <div className="font-bold text-[#2F5229] flex items-center gap-1.5">
                <Baby className="w-4 h-4 text-[#2F5229]" />
                <span>Family & Toddler Amenities:</span>
              </div>
              <p className="text-[#385929] text-xs leading-relaxed">
                {place.toddlerTip}
              </p>
              <div className="pt-1 text-[11px] text-[#4F733E] font-medium">
                {place.diaperChangeNearby
                  ? '✓ Diaper change facilities available on-site or nearby'
                  : 'ℹ Plan ahead for diaper changes nearby'}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions with 44px min-height */}
        <div className="p-4 border-t border-[#EDE2D5] bg-[#FAF4ED] flex items-center justify-between gap-2">
          {place.isUserAdded && onDeletePlace ? (
            <button
              onClick={() => {
                if (confirm(`Remove "${place.name}" from your places?`)) {
                  onDeletePlace(place.id);
                  onClose();
                }
              }}
              className="min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-[#991B1B] hover:bg-[#FEE2E2] text-xs font-semibold transition-colors active:scale-95"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="min-h-[44px] px-4 py-2.5 rounded-xl text-[#6B5341] hover:bg-[#EBDCCF] text-xs sm:text-sm font-semibold transition-colors border border-[#DECEBE] active:scale-95"
            >
              Close
            </button>
            <button
              onClick={openGoogleMapsDirections}
              className="min-h-[44px] flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#B34B24] text-white font-bold text-xs sm:text-sm transition-colors shadow-xs active:scale-95"
            >
              <Navigation className="w-4 h-4" />
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
