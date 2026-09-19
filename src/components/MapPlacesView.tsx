import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import {
  Map as MapIcon,
  Grid,
  Filter,
  Search,
  Baby,
  Footprints,
  ShieldCheck,
  AlertCircle,
  Home,
  Crosshair,
  Maximize2,
  Heart,
  Plus,
  Columns2,
  X
} from 'lucide-react';
import { Place } from '../types';
import { PlaceCard } from './PlaceCard';
import { BASECAMP_COORDS, BASECAMP_ADDRESS } from '../data/places';

interface MapPlacesViewProps {
  places: Place[];
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectPlace: (place: Place) => void;
  onOpenAddModal: () => void;
  focusCoordinate?: { lat: number; lng: number; title: string } | null;
}

type FilterOption =
  | 'all'
  | 'playgrounds'
  | 'cafes'
  | 'food'
  | 'culture'
  | 'pharmacies'
  | 'favorites';

type ViewMode = 'map' | 'list' | 'split';

export const MapPlacesView: React.FC<MapPlacesViewProps> = ({
  places,
  favorites,
  onToggleFavorite,
  onSelectPlace,
  onOpenAddModal,
  focusCoordinate,
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>('map');
  const [selectedFilter, setSelectedFilter] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Extract unique neighborhoods
  const neighborhoods = Array.from(
    new Set(places.map((p) => p.neighborhood).filter(Boolean))
  ).sort();

  // Filter places
  const filteredPlaces = places.filter((place) => {
    // Neighborhood filter
    if (selectedNeighborhood !== 'all' && place.neighborhood !== selectedNeighborhood) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        place.name.toLowerCase().includes(q) ||
        place.notes.toLowerCase().includes(q) ||
        place.neighborhood.toLowerCase().includes(q) ||
        place.address.toLowerCase().includes(q);
      if (!matches) return false;
    }

    // Category filter chips
    switch (selectedFilter) {
      case 'playgrounds':
        return place.category === 'playground' || place.category === 'park';
      case 'cafes':
        return place.category === 'cafe' || place.category === 'bakery';
      case 'food':
        return place.category === 'restaurant' || place.category === 'brewery';
      case 'culture':
        return place.category === 'culture';
      case 'pharmacies':
        return place.category === 'pharmacy' || place.category === 'shopping';
      case 'favorites':
        return favorites.includes(place.id);
      case 'all':
      default:
        return true;
    }
  });

  // Custom marker icon builder
  const createMarkerIcon = (place: Place): L.DivIcon => {
    let bgColor = '#78350F'; // chestnut
    let iconEmoji = '📍';
    let ringColor = '#ffffff';

    if (place.id === 'basecamp') {
      bgColor = '#C85A32'; // burnt terracotta
      iconEmoji = '🏠';
      ringColor = '#FDE68A';
    } else {
      switch (place.category) {
        case 'playground':
          bgColor = '#2F5229'; // moss olive
          iconEmoji = '🛝';
          break;
        case 'park':
          bgColor = '#365314'; // forest olive
          iconEmoji = '🌳';
          break;
        case 'cafe':
        case 'bakery':
          bgColor = '#B45309'; // warm amber
          iconEmoji = '☕';
          break;
        case 'restaurant':
          bgColor = '#9A3412'; // autumn rust
          iconEmoji = '🍽️';
          break;
        case 'brewery':
        case 'wine_bar':
          bgColor = '#8E3B46'; // spiced plum
          iconEmoji = '🍷';
          break;
        case 'culture':
          bgColor = '#78350F'; // chestnut
          iconEmoji = '🏛️';
          break;
        case 'pharmacy':
          bgColor = '#991B1B'; // deep brick red
          iconEmoji = '💊';
          break;
        case 'shopping':
          bgColor = '#C85A32'; // terracotta
          iconEmoji = '🛍️';
          break;
      }
    }

    const isFav = favorites.includes(place.id);
    const size = place.id === 'basecamp' ? 44 : 36;

    const html = `
      <div style="
        position: relative;
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: ${bgColor};
        color: white;
        border-radius: 50%;
        border: 2.5px solid ${ringColor};
        box-shadow: 0 4px 10px rgba(60,30,10,0.25);
        font-size: ${place.id === 'basecamp' ? '20px' : '16px'};
        cursor: pointer;
        transition: transform 0.15s ease;
      ">
        <span>${iconEmoji}</span>
        ${
          isFav
            ? '<span style="position: absolute; top: -3px; right: -3px; background: #C85A32; border-radius: 50%; width: 12px; height: 12px; border: 2px solid white;"></span>'
            : ''
        }
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-map-marker',
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
      popupAnchor: [0, -size / 2 - 4],
    });
  };

  // Initialize Map
  useEffect(() => {
    if ((viewMode !== 'map' && viewMode !== 'split') || !mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: BASECAMP_COORDS,
        zoom: 14,
        zoomControl: true,
      });

      // Warm CartoDB Voyager or OpenStreetMap tiles
      L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/">OSM</a>',
          maxZoom: 19,
          subdomains: 'abcd',
        }
      ).addTo(map);

      markersLayerRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;
    }

    // Force size recompute whenever view mode changes or container resizes
    const timer = setTimeout(() => {
      mapInstanceRef.current?.invalidateSize();
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [viewMode]);

  // Update Markers
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    filteredPlaces.forEach((place) => {
      const icon = createMarkerIcon(place);
      const marker = L.marker([place.lat, place.lng], { icon });

      const popupContent = document.createElement('div');
      popupContent.className = 'font-sans text-xs p-1 min-w-[200px] text-[#3D2619]';
      popupContent.innerHTML = `
        <div style="font-weight: 700; font-size: 13px; color: #2E1A0F; margin-bottom: 2px; font-family: 'Fraunces', Georgia, serif;">
          ${place.name}
        </div>
        <div style="font-size: 11px; color: #7A6150; margin-bottom: 6px;">
          ${place.neighborhood} • ${place.displayCategory}
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; padding: 4px 6px; background: #FAF2E8; border-radius: 6px; border: 1px solid #ECD9C5;">
          <span style="font-weight: 600; color: #C85A32;">
            ~${place.walkMinutesFromBase}m walk from Base
          </span>
          <span style="font-size: 10px; font-weight: 700; color: #2F5229;">
            ${place.strollerAccess.toUpperCase()}
          </span>
        </div>
        <div style="font-size: 11px; color: #5C4535; line-height: 1.4; margin-bottom: 8px;">
          ${place.notes.substring(0, 110)}...
        </div>
        <button id="inspect-btn-${place.id}" style="
          width: 100%;
          padding: 6px 10px;
          background: #C85A32;
          color: #ffffff;
          border: none;
          border-radius: 6px;
          font-weight: 700;
          font-size: 11px;
          cursor: pointer;
        ">
          View Place Details & Directions
        </button>
      `;

      marker.bindPopup(popupContent);

      marker.on('popupopen', () => {
        const btn = document.getElementById(`inspect-btn-${place.id}`);
        if (btn) {
          btn.onclick = () => {
            onSelectPlace(place);
          };
        }
      });

      markersLayerRef.current?.addLayer(marker);
    });
  }, [filteredPlaces, favorites]);

  // Handle external coordinate focus
  useEffect(() => {
    if (focusCoordinate && mapInstanceRef.current) {
      setViewMode('map');
      setTimeout(() => {
        mapInstanceRef.current?.setView(
          [focusCoordinate.lat, focusCoordinate.lng],
          16,
          { animate: true }
        );
      }, 200);
    }
  }, [focusCoordinate]);

  const fitAllMarkers = () => {
    if (!mapInstanceRef.current || filteredPlaces.length === 0) return;
    const bounds = L.latLngBounds(
      filteredPlaces.map((p) => [p.lat, p.lng] as [number, number])
    );
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
  };

  const centerOnBasecamp = () => {
    if (!mapInstanceRef.current) return;
    mapInstanceRef.current.setView(BASECAMP_COORDS, 15, { animate: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-5 pb-40 sm:pb-32">
      {/* Top Filter & Search Controls */}
      <div className="bg-[#FFFDF9] border border-[#EDE2D5] rounded-2xl p-3 sm:p-4 shadow-xs mb-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search bar & Neighborhood dropdown */}
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#A89484] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                inputMode="search"
                enterKeyHint="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search playgrounds, apple pie, bakeries, canals..."
                className="w-full pl-9 pr-9 py-2.5 text-[16px] sm:text-sm bg-white border border-[#DCCEC0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 text-[#3D2619] placeholder-[#A89484] min-h-[44px]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="w-8 h-8 absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center justify-center text-[#826955] hover:text-[#2E1A0F] rounded-lg active:scale-90 transition-transform"
                  aria-label="Clear search query"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className="py-2.5 px-3 text-[16px] sm:text-xs bg-white border border-[#DCCEC0] rounded-xl text-[#5C4535] focus:outline-none focus:ring-2 focus:ring-[#C85A32]/30 min-h-[44px]"
            >
              <option value="all">All Neighborhoods ({places.length})</option>
              {neighborhoods.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle (Map vs List vs Split) & Add Place Button */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <div className="inline-flex rounded-xl bg-[#FAF4ED] p-1 border border-[#EDE2D5]">
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                  viewMode === 'map'
                    ? 'bg-[#C85A32] text-white shadow-xs'
                    : 'text-[#7A6150] hover:text-[#2E1A0F]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                  viewMode === 'list'
                    ? 'bg-[#C85A32] text-white shadow-xs'
                    : 'text-[#7A6150] hover:text-[#2E1A0F]'
                }`}
              >
                <Grid className="w-3.5 h-3.5" />
                <span>List ({filteredPlaces.length})</span>
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95 ${
                  viewMode === 'split'
                    ? 'bg-[#C85A32] text-white shadow-xs'
                    : 'text-[#7A6150] hover:text-[#2E1A0F]'
                }`}
                title="View Map and List side-by-side"
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span>Split View</span>
              </button>
            </div>

            <button
              onClick={onOpenAddModal}
              className="min-h-[44px] flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#C85A32] hover:bg-[#B34B24] text-white font-bold text-xs transition-colors shadow-xs active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden xs:inline">Add Spot</span>
            </button>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="mt-3 pt-3 border-t border-[#EDE2D5] flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full font-medium transition-colors flex-shrink-0 active:scale-95 ${
              selectedFilter === 'all'
                ? 'bg-[#2E1A0F] text-white font-bold'
                : 'bg-[#FAF4ED] text-[#6B5341] hover:bg-[#F2E7DC] border border-[#EDE2D5]'
            }`}
          >
            All Places ({places.length})
          </button>

          <button
            onClick={() => setSelectedFilter('playgrounds')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full font-medium transition-colors flex-shrink-0 flex items-center gap-1 active:scale-95 ${
              selectedFilter === 'playgrounds'
                ? 'bg-[#2F5229] text-white font-bold'
                : 'bg-[#EBF3E8] text-[#2F5229] border border-[#C5DCBF]'
            }`}
          >
            <span>🛝</span>
            <span>Toddler Playgrounds</span>
          </button>

          <button
            onClick={() => setSelectedFilter('cafes')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full font-medium transition-colors flex-shrink-0 flex items-center gap-1 active:scale-95 ${
              selectedFilter === 'cafes'
                ? 'bg-[#B45309] text-white font-bold'
                : 'bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]'
            }`}
          >
            <span>☕</span>
            <span>Stroller-Friendly Cafes</span>
          </button>

          <button
            onClick={() => setSelectedFilter('food')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full font-medium transition-colors flex-shrink-0 flex items-center gap-1 active:scale-95 ${
              selectedFilter === 'food'
                ? 'bg-[#9A3412] text-white font-bold'
                : 'bg-[#FFEDD5] text-[#9A3412] border border-[#FED7AA]'
            }`}
          >
            <span>🍽️</span>
            <span>Quick Bites & Dining</span>
          </button>

          <button
            onClick={() => setSelectedFilter('culture')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full font-medium transition-colors flex-shrink-0 flex items-center gap-1 active:scale-95 ${
              selectedFilter === 'culture'
                ? 'bg-[#78350F] text-white font-bold'
                : 'bg-[#F5ECE0] text-[#78350F] border border-[#DECEBE]'
            }`}
          >
            <span>🏛️</span>
            <span>Must-See Culture</span>
          </button>

          <button
            onClick={() => setSelectedFilter('pharmacies')}
            className={`min-h-[38px] px-3.5 py-1.5 rounded-full font-medium transition-colors flex-shrink-0 flex items-center gap-1 active:scale-95 ${
              selectedFilter === 'pharmacies'
                ? 'bg-[#991B1B] text-white font-bold'
                : 'bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]'
            }`}
          >
            <span>💊</span>
            <span>Pharmacies & Essentials</span>
          </button>

          {favorites.length > 0 && (
            <button
              onClick={() => setSelectedFilter('favorites')}
              className={`min-h-[38px] px-3.5 py-1.5 rounded-full font-medium transition-colors flex-shrink-0 flex items-center gap-1.5 active:scale-95 ${
                selectedFilter === 'favorites'
                  ? 'bg-[#C85A32] text-white font-bold'
                  : 'bg-[#FAF0E4] text-[#C85A32] border border-[#ECD9C5]'
              }`}
            >
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>Saved Favorites ({favorites.length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Map Mode View */}
      {viewMode === 'map' && (
        <div className="relative rounded-2xl overflow-hidden border border-[#EDE2D5] shadow-md h-[65vh] min-h-[440px] max-h-[720px] bg-[#FAF4ED]">
          <div ref={mapContainerRef} className="w-full h-full z-10" />

          {/* Map Overlay Quick Actions */}
          <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
            <button
              onClick={centerOnBasecamp}
              className="p-2.5 rounded-xl bg-white text-[#5C4535] shadow-md hover:bg-[#FAF4ED] border border-[#EDE2D5] transition-colors"
              title="Center on Host Basecamp (Eendrachtstraat 13H)"
            >
              <Home className="w-4 h-4 text-[#C85A32]" />
            </button>
            <button
              onClick={fitAllMarkers}
              className="p-2.5 rounded-xl bg-white text-[#5C4535] shadow-md hover:bg-[#FAF4ED] border border-[#EDE2D5] transition-colors"
              title="Fit all places in view"
            >
              <Maximize2 className="w-4 h-4 text-[#6B5341]" />
            </button>
          </div>

          {/* Map Legend Floating Pill */}
          <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
            <div className="max-w-max mx-auto bg-[#FFFDF9]/95 backdrop-blur-md text-[#3D2619] px-3.5 py-1.5 rounded-full border border-[#EDE2D5] text-[10px] sm:text-xs flex items-center gap-3 shadow-md pointer-events-auto overflow-x-auto font-medium">
              <span className="flex items-center gap-1">
                <span>🏠</span> <strong className="text-[#C85A32]">Basecamp</strong>
              </span>
              <span className="flex items-center gap-1">
                <span>🛝</span> Playgrounds
              </span>
              <span className="flex items-center gap-1">
                <span>☕</span> Cafes/Pâtisseries
              </span>
              <span className="flex items-center gap-1">
                <span>🍽️</span> Food
              </span>
              <span className="flex items-center gap-1">
                <span>🏛️</span> Culture
              </span>
              <span className="flex items-center gap-1">
                <span>💊</span> Essentials
              </span>
            </div>
          </div>
        </div>
      )}

      {/* List Mode View */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredPlaces.length === 0 ? (
            <div className="col-span-full py-12 text-center text-[#7A6150]">
              <p className="text-sm">No places matched your search or filters.</p>
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setSearchQuery('');
                  setSelectedNeighborhood('all');
                }}
                className="mt-2 text-xs font-semibold text-[#C85A32] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                isFavorite={favorites.includes(place.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectPlace={onSelectPlace}
              />
            ))
          )}
        </div>
      )}

      {/* Split Mode View (Desktop Comparative Multi-Column Scanning) */}
      {viewMode === 'split' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left: Sticky interactive Leaflet Map */}
          <div className="lg:col-span-6 relative rounded-2xl overflow-hidden border border-[#EDE2D5] shadow-md h-[55vh] lg:h-[calc(100vh-250px)] lg:sticky lg:top-24 bg-[#FAF4ED]">
            <div ref={mapContainerRef} className="w-full h-full z-10" />

            {/* Map Overlay Quick Actions */}
            <div className="absolute top-3 right-3 z-20 flex flex-col gap-2">
              <button
                onClick={centerOnBasecamp}
                className="p-2.5 rounded-xl bg-white text-[#5C4535] shadow-md hover:bg-[#FAF4ED] border border-[#EDE2D5] transition-colors active:scale-95"
                title="Center on Host Basecamp (Eendrachtstraat 13H)"
              >
                <Home className="w-4 h-4 text-[#C85A32]" />
              </button>
              <button
                onClick={fitAllMarkers}
                className="p-2.5 rounded-xl bg-white text-[#5C4535] shadow-md hover:bg-[#FAF4ED] border border-[#EDE2D5] transition-colors active:scale-95"
                title="Fit all places in view"
              >
                <Maximize2 className="w-4 h-4 text-[#6B5341]" />
              </button>
            </div>

            {/* Map Legend Floating Pill */}
            <div className="absolute bottom-3 left-3 right-3 z-20 pointer-events-none">
              <div className="max-w-max mx-auto bg-[#FFFDF9]/95 backdrop-blur-md text-[#3D2619] px-3.5 py-1.5 rounded-full border border-[#EDE2D5] text-[10px] sm:text-xs flex items-center gap-3 shadow-md pointer-events-auto overflow-x-auto font-medium">
                <span className="flex items-center gap-1">
                  <span>🏠</span> <strong className="text-[#C85A32]">Basecamp</strong>
                </span>
                <span className="flex items-center gap-1">
                  <span>🛝</span> Playgrounds
                </span>
                <span className="flex items-center gap-1">
                  <span>☕</span> Cafes
                </span>
                <span className="flex items-center gap-1">
                  <span>🍽️</span> Food
                </span>
              </div>
            </div>
          </div>

          {/* Right: Scrollable Place Cards with overscroll-contain */}
          <div className="lg:col-span-6 lg:max-h-[calc(100vh-250px)] lg:overflow-y-auto lg:overscroll-contain pr-1 space-y-3">
            <div className="flex items-center justify-between px-1 text-xs text-[#7A6150] mb-1">
              <span className="font-bold text-[#2E1A0F]">
                Matching Places ({filteredPlaces.length})
              </span>
              <span>Tap a card for detailed family guide</span>
            </div>

            {filteredPlaces.length === 0 ? (
              <div className="py-12 text-center text-[#7A6150]">
                <p className="text-sm">No places matched your search or filters.</p>
                <button
                  onClick={() => {
                    setSelectedFilter('all');
                    setSearchQuery('');
                    setSelectedNeighborhood('all');
                  }}
                  className="mt-2 text-xs font-semibold text-[#C85A32] hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              filteredPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  place={place}
                  isFavorite={favorites.includes(place.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectPlace={onSelectPlace}
                />
              ))
            )}
          </div>
        </div>
      )}

      {/* Mobile-safe bottom spacer */}
      <div className="h-12" aria-hidden="true" />
    </div>
  );
};
