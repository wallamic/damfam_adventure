import React from 'react';
import {
  MapPin,
  Baby,
  Footprints,
  Train,
  Heart,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { Place } from '../types';

interface PlaceCardProps {
  place: Place;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectPlace: (place: Place) => void;
  onViewOnMap?: (place: Place) => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({
  place,
  isFavorite,
  onToggleFavorite,
  onSelectPlace,
  onViewOnMap,
}) => {
  const getCategoryColor = (cat: Place['category']) => {
    switch (cat) {
      case 'host_home':
        return 'bg-[#C85A32] text-white';
      case 'playground':
        return 'bg-[#2F5229] text-white';
      case 'cafe':
      case 'bakery':
        return 'bg-[#B45309] text-white';
      case 'restaurant':
        return 'bg-[#9A3412] text-white';
      case 'culture':
        return 'bg-[#78350F] text-white';
      case 'park':
        return 'bg-[#365314] text-white';
      case 'brewery':
      case 'wine_bar':
        return 'bg-[#8E3B46] text-white';
      case 'pharmacy':
        return 'bg-[#991B1B] text-white';
      default:
        return 'bg-[#6B5341] text-white';
    }
  };

  const getStrollerBadge = (access: Place['strollerAccess']) => {
    switch (access) {
      case 'easy':
        return {
          label: 'Stroller: Easy',
          classes: 'bg-[#EBF3E8] text-[#2F5229] border-[#C5DCBF]',
          icon: ShieldCheck,
        };
      case 'moderate':
        return {
          label: 'Stroller: Moderate',
          classes: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]',
          icon: AlertCircle,
        };
      case 'tricky':
        return {
          label: 'Stroller: Tricky Steps',
          classes: 'bg-[#FDE8E8] text-[#9B1C1C] border-[#FBD5D5]',
          icon: AlertCircle,
        };
    }
  };

  const strollerBadge = getStrollerBadge(place.strollerAccess);
  const StrollerIcon = strollerBadge.icon;

  return (
    <div
      onClick={() => onSelectPlace(place)}
      className="group relative bg-white rounded-2xl border border-[#EDE2D5] hover:border-[#D5BFA8] p-4 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Header */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${getCategoryColor(
                place.category
              )}`}
            >
              {place.displayCategory}
            </span>
            <span className="text-[11px] font-medium text-[#7A6150]">
              {place.neighborhood}
            </span>
            {place.isUserAdded && (
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#FAF0E4] text-[#803816] border border-[#ECD9C5]">
                Added
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(place.id);
            }}
            className="w-11 h-11 -mr-2 -mt-2 flex items-center justify-center rounded-xl text-[#BCAAA0] hover:text-[#C85A32] hover:bg-[#FAF4ED] transition-colors active:scale-90"
            title="Favorite place"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-4.5 h-4.5 ${
                isFavorite
                  ? 'fill-[#C85A32] text-[#C85A32]'
                  : 'text-[#BCAAA0]'
              }`}
            />
          </button>
        </div>

        {/* Place Title */}
        <h4 className="text-base font-bold text-[#2E1A0F] font-serif group-hover:text-[#C85A32] transition-colors leading-snug">
          {place.name}
        </h4>

        {/* Address */}
        <p className="text-xs text-[#7A6150] flex items-center gap-1 mt-1 truncate">
          <MapPin className="w-3 h-3 flex-shrink-0 text-[#A89484]" />
          <span className="truncate">{place.address}</span>
        </p>

        {/* Notes / Description */}
        <p className="text-xs text-[#5C4535] mt-2 line-clamp-2 leading-relaxed">
          {place.notes}
        </p>

        {/* Toddler Tip Highlight if present */}
        {place.toddlerTip && (
          <div className="mt-2.5 p-2 rounded-lg bg-[#FAF2E8] border border-[#ECD9C5] text-[11px] text-[#4A3222] leading-relaxed flex items-start gap-1.5">
            <Baby className="w-3.5 h-3.5 text-[#C85A32] flex-shrink-0 mt-0.5" />
            <span className="line-clamp-2">{place.toddlerTip}</span>
          </div>
        )}
      </div>

      {/* Bottom Footer Info: Walk from Base & Stroller Rating */}
      <div className="mt-3 pt-3 border-t border-[#EDE2D5] flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-[#7A6150] text-[11px]">
          {place.id === 'basecamp' ? (
            <span className="font-bold text-[#C85A32]">
              Host Base Origin
            </span>
          ) : (
            <>
              <span className="flex items-center gap-1 font-semibold text-[#3D2619]">
                <Footprints className="w-3.5 h-3.5 text-[#C85A32]" />
                ~{place.walkMinutesFromBase}m walk
              </span>
              {place.distanceFromBaseKm !== undefined && (
                <span className="text-[#826955]">({place.distanceFromBaseKm} km)</span>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 ${strollerBadge.classes}`}
          >
            <StrollerIcon className="w-3 h-3" />
            <span>{strollerBadge.label}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
