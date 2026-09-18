import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Footprints,
  Train,
  CheckCircle2,
  Circle,
  MapPin,
  Sparkles,
  Baby,
  ShieldCheck,
  Compass,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Navigation,
  Check,
  Home
} from 'lucide-react';
import { itineraryDays } from '../data/itinerary';
import { ItineraryDay, ItineraryStop } from '../types';

interface ItineraryViewProps {
  completedStops: string[];
  onToggleCompleted: (stopId: string) => void;
  onSelectCoordinateForMap: (lat: number, lng: number, title: string) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  completedStops,
  onToggleCompleted,
  onSelectCoordinateForMap,
}) => {
  const [selectedDayId, setSelectedDayId] = useState<string>('day-1');

  const currentDayIndex = itineraryDays.findIndex((d) => d.id === selectedDayId);
  const currentDay = itineraryDays[currentDayIndex >= 0 ? currentDayIndex : 0];

  const prevDay = currentDayIndex > 0 ? itineraryDays[currentDayIndex - 1] : null;
  const nextDay = currentDayIndex < itineraryDays.length - 1 ? itineraryDays[currentDayIndex + 1] : null;

  const currentDayStopsCompleted = currentDay.stops.filter((s) =>
    completedStops.includes(s.id)
  ).length;

  const openGoogleMapsDirections = (placeName: string) => {
    const origin = encodeURIComponent('Eendrachtstraat 13H, 1078XV Amsterdam');
    const destination = encodeURIComponent(`${placeName}, Amsterdam, Netherlands`);
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-5 pb-44 sm:pb-36">
      {/* Editorial Intro Banner */}
      <div className="mb-4 bg-gradient-to-br from-[#FFF8EE] via-[#FDF3E5] to-[#F5E5D3] border border-[#ECD9C5] rounded-2xl p-4 sm:p-5 shadow-xs text-[#3D2619]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md bg-[#EBDBC8] text-[#803816] border border-[#DEBEA4]">
                Neighborhood-Paced Plan
              </span>
              <span className="text-xs text-[#7A6150]">
                Basecamp: Eendrachtstraat 13H
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2E1A0F] font-serif">
              6-Day Amsterdam Itinerary
            </h2>
            <p className="text-xs sm:text-sm text-[#5C4535] mt-1 max-w-2xl leading-relaxed">
              Designed for 4 adults, two 3-year-olds, and a 3-month-old infant. Optimized district clusters eliminate canal backtracking with guaranteed diaper and nap sanctuaries.
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 text-xs text-[#6B5341] pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E8DCCF]">
            <span className="text-[#3D2619] font-bold">
              {completedStops.length} of{' '}
              {itineraryDays.reduce((acc, d) => acc + d.stops.length, 0)} stops visited
            </span>
            <span className="text-[#2F5229] font-semibold text-[11px]">
              ✓ Stroller-safe routes verified
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Mobile-First Day Navigation Bar (Thumb Zone) */}
      <div className="sticky top-0 z-30 -mx-3 sm:-mx-4 px-3 sm:px-4 py-2.5 bg-[#FAF7F2]/95 backdrop-blur-md border-y border-[#EDE2D5] shadow-2xs mb-4">
        <div className="flex items-center justify-between gap-2 mb-1.5 px-0.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#826955]">
            Select Itinerary Day:
          </span>
          <span className="text-[11px] font-semibold text-[#C85A32]">
            {currentDayStopsCompleted} of {currentDay.stops.length} completed today
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {itineraryDays.map((day) => {
            const isSelected = day.id === selectedDayId;
            const stopsInDay = day.stops.map((s) => s.id);
            const completedCount = stopsInDay.filter((id) =>
              completedStops.includes(id)
            ).length;
            const isAllCompleted =
              completedCount === stopsInDay.length && stopsInDay.length > 0;

            return (
              <button
                key={day.id}
                onClick={() => {
                  setSelectedDayId(day.id);
                  window.scrollTo({ top: 120, behavior: 'smooth' });
                }}
                className={`flex-shrink-0 min-w-[100px] px-3 py-2 rounded-xl text-xs transition-all flex flex-col items-start border active:scale-95 ${
                  isSelected
                    ? 'bg-[#C85A32] text-white font-bold border-[#B84E27] shadow-sm'
                    : 'bg-white hover:bg-[#FAF4ED] text-[#6B5341] hover:text-[#2E1A0F] border-[#EAE0D5]'
                }`}
                role="tab"
                aria-selected={isSelected}
              >
                <div className="flex items-center justify-between w-full gap-1">
                  <span className={`text-[10px] uppercase font-bold tracking-wider ${isSelected ? 'text-amber-100' : 'text-[#826955]'}`}>
                    Day {day.dayNumber}
                  </span>
                  {day.highlightIcon === 'PartyPopper' ? (
                    <span className="text-[11px]" title="Birthday Party Day">🎂</span>
                  ) : isAllCompleted ? (
                    <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                  ) : null}
                </div>
                <span className="font-bold text-xs whitespace-nowrap mt-0.5">
                  {day.shortDate}
                </span>
                <span className={`text-[10px] truncate max-w-[95px] ${isSelected ? 'text-amber-100' : 'text-[#826955]'}`}>
                  {day.neighborhood}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Overview Card */}
      <div className="mb-4 bg-[#FFFDF9] border border-[#EDE2D5] rounded-2xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-[#F5ECE0] text-[#803816] border border-[#DECEBE]">
                Day {currentDay.dayNumber}
              </span>
              {currentDay.highlightIcon === 'PartyPopper' && (
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#F8E7E9] text-[#8E3B46] border border-[#E5BCC2] flex items-center gap-1">
                  🎂 3rd Birthday at Basecamp
                </span>
              )}
              <h3 className="text-lg sm:text-xl font-bold text-[#2E1A0F] font-serif">
                {currentDay.themeTitle}
              </h3>
            </div>
            <p className="text-xs text-[#7A6150] mt-0.5">
              {currentDay.dateStr} • {currentDay.neighborhood}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-[#EBF3E8] text-[#2F5229] border border-[#C5DCBF] flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2F5229]" />
              Stroller Rating: {currentDay.strollerComfortScore}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#4A3222] leading-relaxed bg-[#FAF4ED] p-3 rounded-xl border border-[#ECD9C5]">
          {currentDay.overview}
        </p>
      </div>

      {/* Stops Timeline */}
      <div className="space-y-4">
        {currentDay.stops.map((stop, index) => {
          const isDone = completedStops.includes(stop.id);

          return (
            <div
              key={stop.id}
              className={`relative rounded-2xl border transition-all duration-150 overflow-hidden ${
                isDone
                  ? 'bg-[#F7F3ED]/70 border-[#E5DCD2] opacity-80'
                  : 'bg-white border-[#EDE2D5] shadow-xs hover:border-[#D5BFA8]'
              }`}
            >
              {/* Card Header Bar */}
              <div className="p-4 sm:p-5">
                <div className="flex items-start justify-between gap-2.5">
                  <div className="flex items-start gap-3 flex-1">
                    {/* Generous 44px Touch Target for Mark Completed */}
                    <button
                      onClick={() => onToggleCompleted(stop.id)}
                      className="mt-0.5 -ml-1 p-2 rounded-xl text-[#A89484] hover:text-[#C85A32] focus:outline-none transition-colors active:scale-95"
                      aria-label={isDone ? `Mark ${stop.title} as incomplete` : `Mark ${stop.title} as visited`}
                      title={isDone ? 'Mark as to-do' : 'Mark as completed'}
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-6 h-6 text-[#2F5229] fill-[#EBF3E8]" />
                      ) : (
                        <Circle className="w-6 h-6 text-[#BCAAA0] hover:text-[#C85A32]" />
                      )}
                    </button>

                    <div className="flex-1 min-w-0">
                      {/* Time slot & Neighborhood badge */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-1">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-[#F5ECE0] text-[#803816] border border-[#DECEBE]">
                          <Clock className="w-3 h-3 text-[#C85A32]" />
                          {stop.timeSlot}
                        </span>
                        <span className="text-xs text-[#7A6150] font-medium">
                          {stop.neighborhood}
                        </span>
                      </div>

                      <h4
                        className={`text-base sm:text-lg font-bold font-serif leading-snug ${
                          isDone
                            ? 'line-through text-[#9C8775]'
                            : 'text-[#2E1A0F]'
                        }`}
                      >
                        {stop.title}
                      </h4>
                      <p className="text-xs font-semibold text-[#C85A32] truncate">
                        {stop.placeName}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Direct Google Maps & App Map Buttons */}
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => openGoogleMapsDirections(stop.placeName)}
                      className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-[#FAF4ED] hover:bg-[#F0E2D4] text-[#803816] border border-[#DECEBE] transition-colors font-semibold active:scale-95 shadow-2xs"
                      title="Open walking directions from Basecamp in Google Maps"
                    >
                      <Navigation className="w-3.5 h-3.5 text-[#C85A32]" />
                      <span className="hidden xs:inline">Directions</span>
                    </button>

                    {stop.coordinates && (
                      <button
                        onClick={() =>
                          onSelectCoordinateForMap(
                            stop.coordinates![0],
                            stop.coordinates![1],
                            stop.placeName
                          )
                        }
                        className="flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-xl bg-[#FAF4ED] hover:bg-[#F0E2D4] text-[#4A3222] border border-[#DECEBE] transition-colors font-medium active:scale-95 shadow-2xs"
                        title="View spot on interactive map"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                        <span className="hidden xs:inline">Map</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#5C4535] mt-2.5 pl-9 sm:pl-10 leading-relaxed">
                  {stop.description}
                </p>

                {/* Transit From Basecamp Info */}
                <div className="mt-3 ml-0 sm:ml-9 p-2.5 rounded-xl bg-[#FAF2E8] border border-[#ECD9C5] text-xs text-[#4A3222] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2 font-medium">
                    <Train className="w-4 h-4 text-[#C85A32] flex-shrink-0" />
                    <span className="text-[#826955]">From Basecamp (Eendrachtstraat 13H):</span>
                    <span className="text-[#2E1A0F] font-bold">
                      {stop.transitFromBase.bestOption}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[#7A6150] text-[11px]">
                    <Footprints className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>~{stop.transitFromBase.walkMin} min walk</span>
                  </div>
                </div>

                {/* Stroller Accessibility Tags */}
                <div className="mt-3 ml-0 sm:ml-9 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-bold text-[#826955] mr-1">
                    Stroller Access:
                  </span>
                  {stop.strollerTags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2 py-0.5 rounded-md bg-[#F5ECE0] text-[#5C4535] border border-[#DECEBE]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Toddler & Baby Tip Box */}
                <div className="mt-3 ml-0 sm:ml-9 p-3 rounded-xl bg-[#FAF4ED] border-l-4 border-[#C85A32] text-xs space-y-1.5 border-y border-r border-[#ECD9C5]">
                  <div className="flex items-center gap-1.5 font-bold text-[#2E1A0F]">
                    <Baby className="w-3.5 h-3.5 text-[#C85A32]" />
                    <span>Infant & Toddler Guidance:</span>
                  </div>
                  <p className="text-[#5C4535] leading-relaxed">
                    {stop.toddlerBabyTip}
                  </p>

                  <div className="pt-1 text-[11px] text-[#7A6150] flex flex-wrap items-center gap-3">
                    <span>
                      🍼 <strong>Diaper Change:</strong> {stop.diaperChangeNearby}
                    </span>
                    {stop.backupPlayground && (
                      <span>
                        🛝 <strong>Energy Release:</strong> {stop.backupPlayground}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* End-of-Day Rest & Next Day Mobile Switcher Card (Prevents Navigation Bar Blocking) */}
      <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#F5ECE0] via-[#FAF4ED] to-[#FFFDF9] border border-[#DECEBE] shadow-xs text-[#3D2619] space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#FAF4ED] text-[#C85A32] flex items-center justify-center border border-[#DECEBE]">
            <Home className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#2E1A0F] font-serif">
              End of Day {currentDay.dayNumber} • Return to Basecamp
            </h4>
            <p className="text-xs text-[#7A6150]">
              Eendrachtstraat 13H, De Pijp / Rivierenbuurt
            </p>
          </div>
        </div>

        <p className="text-xs text-[#5C4535] leading-relaxed">
          Time for family bath time, quiet infant feeding, and relaxing dinner at basecamp. Take Tram 4 or Tram 12 back to Van Woustraat / Ceintuurbaan for step-free access straight to the front door.
        </p>

        {/* Day Navigation Shortcuts */}
        <div className="pt-2 border-t border-[#DECEBE] flex items-center justify-between gap-2">
          {prevDay ? (
            <button
              onClick={() => {
                setSelectedDayId(prevDay.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-[#FAF4ED] text-[#4A3222] border border-[#DECEBE] text-xs font-semibold transition-colors active:scale-95"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Day {prevDay.dayNumber} ({prevDay.shortDate})</span>
            </button>
          ) : (
            <div />
          )}

          {nextDay ? (
            <button
              onClick={() => {
                setSelectedDayId(nextDay.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C85A32] hover:bg-[#B34B24] text-white text-xs font-bold transition-colors active:scale-95 shadow-xs"
            >
              <span>Continue to Day {nextDay.dayNumber} ({nextDay.shortDate})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="text-xs text-[#2F5229] font-bold flex items-center gap-1">
              <Check className="w-4 h-4" />
              <span>Full Trip Completed!</span>
            </div>
          )}
        </div>
      </div>

      {/* Generous safe space ensuring bottom-most elements never get blocked */}
      <div className="h-12" aria-hidden="true" />
    </div>
  );
};
