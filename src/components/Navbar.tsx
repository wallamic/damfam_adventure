import React, { useState } from 'react';
import {
  Users,
  Baby,
  MapPin,
  Calendar,
  Clock,
  Copy,
  Check,
  ExternalLink,
  CloudSun,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { BASECAMP_ADDRESS } from '../data/places';

interface NavbarProps {
  onOpenBasecampOnMap: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBasecampOnMap }) => {
  const [copied, setCopied] = useState(false);
  const [showBasecampDetails, setShowBasecampDetails] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(BASECAMP_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openGoogleMapsBasecamp = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        BASECAMP_ADDRESS
      )}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FFFDF9] text-[#3D2619] shadow-[0_2px_12px_rgba(80,50,30,0.06)] border-b border-[#EAE0D5]">
      {/* Top Banner: Group & Dates */}
      <div className="bg-[#F5ECE0] px-4 py-1.5 border-b border-[#E8DCCF] text-xs text-[#6B5341]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#EBDBC8] text-[#803816] border border-[#DEBEA4] font-semibold">
              <Calendar className="w-3 h-3 text-[#C85A32]" />
              Sep 22 – 27, 2026
            </span>
            <span className="hidden sm:inline text-[#B49E8C]">•</span>
            <span className="inline-flex items-center gap-1.5 text-[#5C4535]">
              <Users className="w-3 h-3 text-[#826955]" />
              4 Adults
              <span className="text-[#C5B4A4]">•</span>
              <Baby className="w-3.5 h-3.5 text-[#C85A32]" />
              Two 3yo + 3mo Infant
            </span>
          </div>

          <div className="flex items-center gap-3 text-[#6B5341]">
            <span className="inline-flex items-center gap-1 text-[#2F5229] font-medium text-xs">
              <CloudSun className="w-3.5 h-3.5 text-[#C85A32]" />
              ~16°C Mild Autumn
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-[#5C4535]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C85A32]" />
              Ground-Floor Base (H)
            </span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#C85A32] to-[#B45309] flex items-center justify-center text-white font-bold shadow-sm border border-[#E08A63]/40">
            <span className="text-lg font-serif">AMS</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-[#2E1A0F] font-serif">
                Amsterdam Family Trip
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider bg-[#F5ECE0] text-[#803816] border border-[#DECEBE]">
                2 Families
              </span>
            </div>
            <p className="text-xs text-[#7A6150] flex items-center gap-1">
              <span>De Pijp / Rivierenbuurt</span>
              <span>•</span>
              <span className="text-[#C85A32] font-semibold">Kid & Stroller Friendly</span>
            </p>
          </div>
        </div>

        {/* Host Basecamp Quick Action */}
        <div className="relative">
          <button
            onClick={() => setShowBasecampDetails(!showBasecampDetails)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF4ED] hover:bg-[#F2E7DC] text-[#3D2619] border border-[#DECEBE] text-xs font-medium transition-colors shadow-xs"
            aria-label="Host Basecamp address"
          >
            <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
            <span className="font-semibold hidden sm:inline text-[#5C4535]">Basecamp:</span>
            <span className="text-[#2E1A0F] font-medium">Eendrachtstraat 13H</span>
            <ChevronDown
              className={`w-3.5 h-3.5 text-[#826955] transition-transform ${
                showBasecampDetails ? 'rotate-180' : ''
              }`}
            />
          </button>

          {/* Dropdown Card */}
          {showBasecampDetails && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 p-4 rounded-xl bg-[#FFFDF9] border border-[#DECEBE] shadow-xl text-[#3D2619] z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-[#FAF0E4] text-[#C85A32] border border-[#ECD9C5]">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#2E1A0F] font-serif">
                      Host Home Basecamp
                    </h4>
                    <p className="text-xs text-[#6B5341]">Eendrachtstraat 13H, 1078XV Amsterdam</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-[#5C4535] space-y-2 py-2 border-y border-[#EDE2D5] my-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#826955]">Entrance:</span>
                  <span className="font-semibold text-[#2F5229]">Ground floor (13H = no stairs!)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#826955]">Nearest Tram:</span>
                  <span className="font-medium text-[#2E1A0F]">Tram 4 at Lutmastraat (3 min)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#826955]">Nearest Metro:</span>
                  <span className="font-medium text-[#2E1A0F]">Metro 52 De Pijp (7 min)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#826955]">Closest Playground:</span>
                  <span className="font-medium text-[#2E1A0F]">Sarphatipark (4 min walk)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={handleCopyAddress}
                  className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#F5ECE0] hover:bg-[#EBDCCF] text-xs font-semibold text-[#4A3222] transition-colors border border-[#DECEBE]"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#2F5229]" />
                      <span className="text-[#2F5229]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#826955]" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <button
                  onClick={openGoogleMapsBasecamp}
                  className="flex items-center justify-center gap-1 py-1.5 px-3 rounded-lg bg-[#C85A32] hover:bg-[#B34B24] text-white font-semibold text-xs transition-colors shadow-xs"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    setShowBasecampDetails(false);
                    onOpenBasecampOnMap();
                  }}
                  className="p-1.5 rounded-lg bg-[#F5ECE0] hover:bg-[#EBDCCF] text-[#C85A32] border border-[#DECEBE]"
                  title="Show on In-App Map"
                >
                  <MapPin className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
