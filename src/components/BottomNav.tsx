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
  const tabs = [
    {
      id: 'itinerary' as ActiveTab,
      label: 'Itinerary',
      icon: Calendar,
      badge: '6 Days',
    },
    {
      id: 'places' as ActiveTab,
      label: 'Map & Places',
      icon: Map,
      badge: placesCount > 0 ? `${placesCount}` : undefined,
    },
    {
      id: 'transit' as ActiveTab,
      label: 'Transit Hub',
      icon: Navigation,
      badge: 'GVB / Trams',
    },
    {
      id: 'essentials' as ActiveTab,
      label: 'Baby Care',
      icon: HeartHandshake,
      badge: 'Diapers/GP',
    },
  ];

  return (
    <>
      {/* Mobile Floating Action Button (FAB) for Add Place */}
      <div className="fixed bottom-20 right-4 z-40 sm:hidden">
        <button
          onClick={onOpenAddModal}
          className="flex items-center justify-center w-13 h-13 rounded-full bg-[#C85A32] hover:bg-[#B34B24] text-white font-bold shadow-xl border-2 border-[#ECA080] active:scale-95 transition-all"
          aria-label="Add New Place"
          title="Add New Place"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Persistent Bottom Bar for Mobile & Sub-Header for Desktop */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#EAE0D5] text-[#7A6150] shadow-[0_-4px_20px_rgba(80,50,30,0.06)]">
        <div className="max-w-md mx-auto sm:max-w-xl md:max-w-3xl flex items-center justify-around px-2 py-1 sm:py-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onChangeTab(tab.id)}
                className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition-all duration-150 min-w-[72px] ${
                  isActive
                    ? 'text-[#C85A32] font-bold'
                    : 'text-[#826955] hover:text-[#3D2619] hover:bg-[#F5ECE0]'
                }`}
              >
                {isActive && (
                  <span className="absolute -top-1 w-8 h-1 rounded-full bg-[#C85A32]" />
                )}
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
                <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`hidden sm:inline-block absolute -top-1.5 -right-1 text-[9px] px-1.5 py-0.2 rounded-full font-mono font-medium ${
                      isActive
                        ? 'bg-[#C85A32] text-white'
                        : 'bg-[#F2E8DC] text-[#7A6150] border border-[#DECEBE]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Desktop Add Spot Button */}
          <button
            onClick={onOpenAddModal}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#C85A32] hover:bg-[#B34B24] text-white font-semibold text-xs transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Spot</span>
          </button>
        </div>
      </nav>
    </>
  );
};
