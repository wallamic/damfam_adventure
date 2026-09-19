import React from 'react';
import {
  HeartHandshake,
  Baby,
  Phone,
  Clock,
  MapPin,
  ShieldAlert,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { emergencyPediatricInfo } from '../data/transit';

export const EssentialsView: React.FC = () => {
  const callHuisarts = () => {
    window.location.href = `tel:${emergencyPediatricInfo.huisartsenpost.phone.replace(/[^0-9+]/g, '')}`;
  };

  const callEmergency = () => {
    window.location.href = 'tel:112';
  };

  const babySanctuaries = [
    {
      name: 'De Bijenkorf (Dam Square, 5th Floor)',
      type: 'Department Store Lounge',
      amenities: 'Spacious nursing rooms, private changing cubicles, high chairs, bottle warmers, microwave, and clean luxury restrooms.',
    },
    {
      name: 'Groot Melkhuis (Vondelpark)',
      type: 'Park Pavilion Chalet',
      amenities: 'Dedicated family baby-room with changing table, running hot water, microwave, high chairs, and enclosed playground.',
    },
    {
      name: 'ARTIS Royal Zoo (Plantage)',
      type: 'Zoo Restrooms',
      amenities: 'Multiple nursery cubicles with padded changing stations, rocking chairs for nursing, and stroller parking.',
    },
    {
      name: 'Museumplein Underground Plaza',
      type: 'Public / Albert Heijn',
      amenities: 'Clean accessible family restrooms, diaper supplies available at subterranean Albert Heijn supermarket.',
    },
    {
      name: 'Bocca Coffee (Kerkstraat)',
      type: 'Cafe Sanctuary',
      amenities: 'Extremely spacious single-level cafe with wide aisles for multiple strollers, clean changing table in accessible restroom.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-6 pb-44 sm:pb-36 md:pb-16 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#FAF2E8] via-[#F5ECE0] to-[#EFE2D2] border border-[#DECEBE] rounded-2xl p-4 sm:p-5 shadow-xs text-[#3D2619]">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider rounded-md bg-[#FAF4ED] text-[#803816] border border-[#DECEBE] flex items-center gap-1">
            <Baby className="w-3.5 h-3.5 text-[#C85A32]" />
            Family & Infant Essentials
          </span>
          <span className="text-xs text-[#7A6150] font-medium">Emergency & Supplies</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#2E1A0F] font-serif">
          Baby Care & Health Hub
        </h2>
        <p className="text-xs sm:text-sm text-[#5C4535] mt-1 max-w-2xl leading-relaxed">
          Quick reference for baby formula (Nutrilon), diaper supplies, clean nursing sanctuaries across Amsterdam, and urgent English-speaking pediatrician contacts.
        </p>
      </div>

      {/* Emergency & Urgent Doctor (Huisartsenpost) */}
      <div className="bg-[#FDF2F0] border border-[#F5C6CB] rounded-2xl p-4 sm:p-5 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-[#FEE2E2] text-[#991B1B] border border-[#FECACA]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#2E1A0F] font-serif">
                Urgent Medical Care (Pediatrician / GP)
              </h3>
              <p className="text-xs text-[#7A6150]">
                After-hours, evening & weekend doctor assistance
              </p>
            </div>
          </div>

          <button
            onClick={callHuisarts}
            className="min-h-[44px] flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#C85A32] hover:bg-[#B34B24] text-white font-bold text-xs transition-colors shadow-xs active:scale-95"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Doctor</span>
          </button>
        </div>

        <div className="p-3 bg-white rounded-xl border border-[#F5C6CB] text-xs space-y-2">
          <div className="flex items-center justify-between font-bold text-[#2E1A0F]">
            <span>{emergencyPediatricInfo.huisartsenpost.name}</span>
            <span className="text-[#C85A32] font-mono font-bold">
              {emergencyPediatricInfo.huisartsenpost.phone}
            </span>
          </div>
          <p className="text-[#5C4535] leading-relaxed">
            {emergencyPediatricInfo.huisartsenpost.notes}
          </p>
          <div className="text-[11px] text-[#7A6150]">
            <strong className="text-[#3D2619]">Hours:</strong> {emergencyPediatricInfo.huisartsenpost.hours} • Nearest clinic: OLVG Hospital
          </div>
        </div>

        <div className="flex items-center justify-between pt-1 text-xs text-[#5C4535]">
          <span>Life-threatening emergency: Dial <strong className="text-[#991B1B]">112</strong></span>
          <button
            onClick={callEmergency}
            className="min-h-[44px] px-3 flex items-center text-[#991B1B] font-bold hover:underline active:scale-95"
          >
            Dial 112
          </button>
        </div>
      </div>

      {/* Immediate Baby Supplies Near Eendrachtstraat 13H */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-[#2E1A0F] font-serif flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#C85A32]" />
          <span>Baby Supplies Within 300m of Basecamp</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Kruidvat */}
          <div className="bg-[#FFFDF9] border border-[#EDE2D5] rounded-2xl p-4 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FAF2E8] text-[#803816] border border-[#ECD9C5]">
                Kruidvat Drugstore
              </span>
              <span className="text-xs text-[#7A6150] font-semibold">3 min walk</span>
            </div>
            <h4 className="text-sm font-bold text-[#2E1A0F] font-serif">
              Van Woustraat 84
            </h4>
            <p className="text-xs text-[#5C4535] leading-relaxed">
              Full drugstore with baby aisles: <strong>Nutrilon baby formula</strong> (standard Dutch infant formula), <strong>Pampers (Luiers)</strong>, sensitive wipes (doekjes), toddler pouches, diaper rash cream (Sudocrem/Bepanthen), and baby paracetamol (Dafalgan/Sinaspril).
            </p>
          </div>

          {/* Albert Heijn */}
          <div className="bg-[#FFFDF9] border border-[#EDE2D5] rounded-2xl p-4 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#FAF2E8] text-[#803816] border border-[#ECD9C5]">
                Albert Heijn Supermarket
              </span>
              <span className="text-xs text-[#7A6150] font-semibold">2 min walk</span>
            </div>
            <h4 className="text-sm font-bold text-[#2E1A0F] font-serif">
              Van Woustraat 150
            </h4>
            <p className="text-xs text-[#5C4535] leading-relaxed">
              Large supermarket with fresh organic whole milk (volle melk), toddler fruit pouches (knijpfruit), mini bananas, sourdough bread, yogurts, and wine/beer for the adults at basecamp.
            </p>
          </div>
        </div>
      </div>

      {/* Clean Nursing & Diaper Sanctuaries in Amsterdam */}
      <div className="space-y-3">
        <h3 className="text-base sm:text-lg font-bold text-[#2E1A0F] font-serif flex items-center gap-2">
          <Baby className="w-4 h-4 text-[#2F5229]" />
          <span>Curated Nursing & Diaper Change Sanctuaries</span>
        </h3>
        <p className="text-xs text-[#7A6150]">
          When out exploring the city, these spots offer calm, clean spaces with running water and privacy:
        </p>

        <div className="space-y-2.5">
          {babySanctuaries.map((s, idx) => (
            <div
              key={idx}
              className="bg-[#FFFDF9] border border-[#EDE2D5] rounded-xl p-3.5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[#2E1A0F] font-serif text-sm">
                    {s.name}
                  </h4>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#FAF4ED] text-[#803816] border border-[#EDE2D5]">
                    {s.type}
                  </span>
                </div>
                <p className="text-[#5C4535] mt-1 leading-relaxed">
                  {s.amenities}
                </p>
              </div>
              <span className="self-start sm:self-center px-2 py-1 rounded bg-[#EBF3E8] border border-[#C5DCBF] text-[#2F5229] font-bold text-[11px] whitespace-nowrap">
                Verified Clean
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile-safe bottom spacer */}
      <div className="h-12" aria-hidden="true" />
    </div>
  );
};
