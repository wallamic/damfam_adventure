import React from 'react';
import {
  Navigation,
  Train,
  CreditCard,
  Baby,
  Footprints,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  MapPin,
  Clock
} from 'lucide-react';
import { transitHubsFromBase, transitRules } from '../data/transit';
import { BASECAMP_ADDRESS } from '../data/places';

export const TransitView: React.FC = () => {
  const open9292Planner = () => {
    window.open(
      'https://9292.nl/en',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const openGVBApp = () => {
    window.open(
      'https://gvb.nl/en',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const openNSPlanner = () => {
    window.open(
      'https://www.ns.nl/en/journeyplanner/#/?vertrek=Schiphol%20Airport&aankomst=Amsterdam%20Zuid',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 pb-28 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#FAF2E8] via-[#F5ECE0] to-[#EFE2D2] border border-[#DECEBE] rounded-2xl p-4 sm:p-5 shadow-xs text-[#3D2619]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md bg-[#FAF4ED] text-[#803816] border border-[#DECEBE] flex items-center gap-1">
            <Train className="w-3.5 h-3.5 text-[#C85A32]" />
            Mobility Hub
          </span>
          <span className="text-xs text-[#7A6150] font-medium">GVB & OVpay Guide</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2E1A0F] font-serif">
          Transit & Stroller Mobility
        </h2>
        <p className="text-xs sm:text-sm text-[#5C4535] mt-1 max-w-2xl leading-relaxed">
          Step-free public transit guidelines from your basecamp at <strong>Eendrachtstraat 13H</strong>. Amsterdam is exceptionally stroller friendly when you know which tram doors and step-free metro elevators to use!
        </p>

        {/* Quick Link Buttons */}
        <div className="mt-4 pt-3 border-t border-[#DECEBE] flex flex-wrap items-center gap-2">
          <button
            onClick={open9292Planner}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C85A32] hover:bg-[#B34B24] text-white font-bold text-xs transition-colors shadow-xs"
          >
            <span>9292.nl Journey Planner</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={openGVBApp}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF4ED] text-[#4A3222] font-semibold text-xs border border-[#DECEBE] transition-colors shadow-xs"
          >
            <span>GVB Official App</span>
            <ExternalLink className="w-3 h-3" />
          </button>

          <button
            onClick={openNSPlanner}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-[#FAF4ED] text-[#4A3222] font-semibold text-xs border border-[#DECEBE] transition-colors shadow-xs"
          >
            <span>Schiphol Airport Train</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Immediate Stations from Eendrachtstraat 13H */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base sm:text-lg font-bold text-[#2E1A0F] font-serif flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#C85A32]" />
            <span>Stations Closest to Eendrachtstraat 13H</span>
          </h3>
          <span className="text-xs text-[#7A6150] font-medium">
            De Pijp / Rivierenbuurt
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {transitHubsFromBase.map((hub, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] border border-[#EDE2D5] rounded-2xl p-4 shadow-xs space-y-2.5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF4ED] text-[#803816] border border-[#EDE2D5]">
                    {hub.type.toUpperCase()}
                  </span>
                  <span className="text-xs font-semibold text-[#C85A32] flex items-center gap-1">
                    <Footprints className="w-3 h-3" />
                    {hub.distanceFromBase}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#2E1A0F] font-serif">
                  {hub.name}
                </h4>

                <div className="flex flex-wrap gap-1 my-1.5">
                  {hub.lines.map((line, lIdx) => (
                    <span
                      key={lIdx}
                      className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAF2E8] text-[#803816] border border-[#ECD9C5]"
                    >
                      {line}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-[#5C4535] leading-relaxed mt-1">
                  {hub.elevatorNotes}
                </p>
              </div>

              <div className="pt-2 border-t border-[#EDE2D5] space-y-1 text-xs">
                <div className="p-2 rounded-lg bg-[#EBF3E8] border border-[#C5DCBF] text-[#2F5229] text-[11px] flex items-start gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2F5229] flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>Stroller Advice:</strong> {hub.strollerAdvice}
                  </span>
                </div>
                <div className="text-[11px] text-[#7A6150] pt-0.5">
                  <strong className="text-[#4A3222]">Key Connections:</strong> {hub.directionKeyDestinations}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transit Rules & OVpay Guide */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-[#2E1A0F] font-serif flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#C85A32]" />
          <span>Rules for Kids, Strollers & OVpay</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {transitRules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] border border-[#EDE2D5] rounded-2xl p-4 shadow-xs space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs sm:text-sm font-bold text-[#2E1A0F] font-serif">
                  {rule.title}
                </h4>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF2E8] text-[#803816] border border-[#ECD9C5]">
                  {rule.badge}
                </span>
              </div>
              <p className="text-xs text-[#5C4535] leading-relaxed">
                {rule.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Crucial Canal Bridge Advice */}
      <div className="bg-[#FAF2E8] border border-[#ECD9C5] rounded-2xl p-4 sm:p-5 text-xs sm:text-sm space-y-2">
        <div className="flex items-center gap-2 font-bold text-[#803816]">
          <AlertTriangle className="w-4 h-4 text-[#C85A32]" />
          <span>Pro-Tip: Navigating Amsterdam's Arched Canal Bridges</span>
        </div>
        <p className="text-[#5C4535] leading-relaxed">
          Many picturesque arched pedestrian bridges across the Prinsengracht and Keizersgracht feature 6 to 12 steep stone steps with no ramp. Trying to haul a double stroller and a newborn up these steps repeatedly is exhausting.
        </p>
        <div className="p-3 bg-white rounded-xl border border-[#ECD9C5] text-xs text-[#4A3222] space-y-1">
          <p className="font-bold text-[#803816]">
            ✓ The Step-Free Canal Crossing Strategy:
          </p>
          <p>
            Instead of crossing via narrow footbridges, walk just 50 meters to the nearest street with tram tracks or roadway (such as <strong>Utrechtsestraat, Vijzelstraat, or Rozengracht</strong>). These vehicular bridges are 100% asphalted, completely flat, and have wide smooth sidewalks for strollers.
          </p>
        </div>
      </div>
    </div>
  );
};
