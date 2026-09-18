import React from 'react';
import { Calendar, Map, Navigation, HeartHandshake, Plus } from 'lucide-react';

export type ActiveTab = 'itinerary' | 'places' | 'transit' | 'essentials';

interface BottomNavProps {
  activeTab: ActiveTab;
  onChangeTab: (tab: ActiveTab) => void;
  onOpenAddModal: () => void;
  placesCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onChangeTab,
  onOpenAddModal,
  placesCount = 0,
}) => {
  return (
    <nav
      role="navigation"
      aria-label="Main application navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#EAE0D5] text-[#7A6150] shadow-[0_-4px_24px_rgba(80,50,30,0.08)] pb-[max(env(safe-area-inset-bottom,0px),0.5rem)]"
    >
      <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl flex items-center justify-around px-1 py-1 sm:py-1.5">
        {/* Tab 1: Itinerary */}
        <button
          onClick={() => onChangeTab('itinerary')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-150 min-h-[48px] ${
            activeTab === 'itinerary'
              ? 'text-[#C85A32] font-bold'
              : 'text-[#826955] hover:text-[#3D2619] hover:bg-[#F5ECE0]'
          } active:scale-95`}
          aria-selected={activeTab === 'itinerary'}
          role="tab"
        >
          <div className="relative">
            <Calendar className={`w-5 h-5 ${activeTab === 'itinerary' ? 'scale-110' : ''} transition-transform`} />
            {activeTab === 'itinerary' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C85A32]" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight">Itinerary</span>
        </button>

        {/* Tab 2: Map & Places */}
        <button
          onClick={() => onChangeTab('places')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-150 min-h-[48px] ${
            activeTab === 'places'
              ? 'text-[#C85A32] font-bold'
              : 'text-[#826955] hover:text-[#3D2619] hover:bg-[#F5ECE0]'
          } active:scale-95`}
          aria-selected={activeTab === 'places'}
          role="tab"
        >
          <div className="relative">
            <Map className={`w-5 h-5 ${activeTab === 'places' ? 'scale-110' : ''} transition-transform`} />
            {placesCount > 0 && (
              <span className="absolute -top-1.5 -right-2 text-[9px] px-1 py-0.2 rounded-full bg-[#F5ECE0] text-[#803816] border border-[#DECEBE] font-mono font-bold">
                {placesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight">Map & Places</span>
        </button>

        {/* Center Elevated Action: Add Spot (Modern Mobile Pattern) */}
        <div className="flex-1 flex flex-col items-center justify-center px-1">
          <button
            onClick={onOpenAddModal}
            className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 -mt-4 rounded-full bg-[#C85A32] hover:bg-[#B34B24] text-white shadow-lg border-3 border-[#FFFDF9] active:scale-95 transition-transform"
            aria-label="Add New Family Spot"
            title="Add New Family Spot"
          >
            <Plus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.8]" />
          </button>
          <span className="text-[10px] sm:text-[11px] mt-0.5 font-bold text-[#C85A32] tracking-tight">
            Add Spot
          </span>
        </div>

        {/* Tab 3: Transit */}
        <button
          onClick={() => onChangeTab('transit')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-150 min-h-[48px] ${
            activeTab === 'transit'
              ? 'text-[#C85A32] font-bold'
              : 'text-[#826955] hover:text-[#3D2619] hover:bg-[#F5ECE0]'
          } active:scale-95`}
          aria-selected={activeTab === 'transit'}
          role="tab"
        >
          <div className="relative">
            <Navigation className={`w-5 h-5 ${activeTab === 'transit' ? 'scale-110' : ''} transition-transform`} />
            {activeTab === 'transit' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C85A32]" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight">Transit Hub</span>
        </button>

        {/* Tab 4: Baby Care */}
        <button
          onClick={() => onChangeTab('essentials')}
          className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-150 min-h-[48px] ${
            activeTab === 'essentials'
              ? 'text-[#C85A32] font-bold'
              : 'text-[#826955] hover:text-[#3D2619] hover:bg-[#F5ECE0]'
          } active:scale-95`}
          aria-selected={activeTab === 'essentials'}
          role="tab"
        >
          <div className="relative">
            <HeartHandshake className={`w-5 h-5 ${activeTab === 'essentials' ? 'scale-110' : ''} transition-transform`} />
            {activeTab === 'essentials' && (
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C85A32]" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] mt-0.5 tracking-tight">Baby Care</span>
        </button>
      </div>
    </nav>
  );
};
