/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav, ActiveTab } from './components/BottomNav';
import { ItineraryView } from './components/ItineraryView';
import { MapPlacesView } from './components/MapPlacesView';
import { TransitView } from './components/TransitView';
import { EssentialsView } from './components/EssentialsView';
import { AddPlaceModal } from './components/AddPlaceModal';
import { PlaceDetailModal } from './components/PlaceDetailModal';
import { Place } from './types';
import {
  getStoredPlaces,
  saveUserPlace,
  deleteUserPlace,
  getFavorites,
  toggleFavorite,
  getCompletedStops,
  toggleCompletedStop,
} from './lib/storage';
import { BASECAMP_COORDS } from './data/places';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('itinerary');
  const [places, setPlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completedStops, setCompletedStops] = useState<string[]>([]);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [focusCoordinate, setFocusCoordinate] = useState<{
    lat: number;
    lng: number;
    title: string;
  } | null>(null);

  // Initialize stored state
  useEffect(() => {
    setPlaces(getStoredPlaces());
    setFavorites(getFavorites());
    setCompletedStops(getCompletedStops());
  }, []);

  const handleToggleFavorite = (id: string) => {
    const updated = toggleFavorite(id);
    setFavorites(updated);
  };

  const handleToggleCompleted = (stopId: string) => {
    const updated = toggleCompletedStop(stopId);
    setCompletedStops(updated);
  };

  const handleAddPlace = (
    newPlaceData: Omit<Place, 'id' | 'distanceFromBaseKm' | 'walkMinutesFromBase'>
  ) => {
    const created = saveUserPlace(newPlaceData);
    setPlaces((prev) => [created, ...prev]);
    // Switch to places tab and inspect newly created spot
    setActiveTab('places');
    setSelectedPlace(created);
  };

  const handleDeletePlace = (id: string) => {
    deleteUserPlace(id);
    setPlaces((prev) => prev.filter((p) => p.id !== id));
    if (selectedPlace?.id === id) {
      setSelectedPlace(null);
    }
  };

  const handleSelectCoordinateForMap = (lat: number, lng: number, title: string) => {
    setFocusCoordinate({ lat, lng, title });
    setActiveTab('places');
  };

  const handleOpenBasecampOnMap = () => {
    handleSelectCoordinateForMap(
      BASECAMP_COORDS[0],
      BASECAMP_COORDS[1],
      'Host Basecamp (Eendrachtstraat 13H)'
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#3D2619] font-sans flex flex-col selection:bg-amber-200 selection:text-[#3D2619]">
      {/* Top Header with Desktop Navigation */}
      <Navbar
        onOpenBasecampOnMap={handleOpenBasecampOnMap}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        placesCount={places.length}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {activeTab === 'itinerary' && (
          <ItineraryView
            completedStops={completedStops}
            onToggleCompleted={handleToggleCompleted}
            onSelectCoordinateForMap={handleSelectCoordinateForMap}
          />
        )}

        {activeTab === 'places' && (
          <MapPlacesView
            places={places}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectPlace={(place) => setSelectedPlace(place)}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            focusCoordinate={focusCoordinate}
          />
        )}

        {activeTab === 'transit' && <TransitView />}

        {activeTab === 'essentials' && <EssentialsView />}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        placesCount={places.length}
      />

      {/* Add Place Modal */}
      <AddPlaceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPlace={handleAddPlace}
      />

      {/* Place Inspection Modal */}
      <PlaceDetailModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
        isFavorite={selectedPlace ? favorites.includes(selectedPlace.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onDeletePlace={handleDeletePlace}
      />
    </div>
  );
}
