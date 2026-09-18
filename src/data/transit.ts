import { TransitHubInfo } from '../types';

export const transitHubsFromBase: TransitHubInfo[] = [
  {
    name: 'Tram 4 Stop: Lutmastraat / Van Woustraat',
    type: 'tram',
    lines: ['Tram 4'],
    distanceFromBase: '240 meters (3 min walk)',
    walkTimeFromBaseMin: 3,
    stepFreeAccess: true,
    elevatorNotes: 'Street level low-floor tram stop. Elevated boarding platform matches tram doorway height for direct stroller roll-on.',
    strollerAdvice: 'Board via the 2nd double door marked with the large blue Stroller / Pram icon. Space inside for 2 parked strollers.',
    directionKeyDestinations: 'Northbound: Frederiksplein, Rembrandtplein, Rokin, Amsterdam Centraal. Southbound: RAI Amsterdam.',
  },
  {
    name: 'Metro 52: De Pijp Station (Noord/Zuidlijn)',
    type: 'metro',
    lines: ['Metro 52 (Noord/Zuidlijn)'],
    distanceFromBase: '550 meters (7 min walk)',
    walkTimeFromBaseMin: 7,
    stepFreeAccess: true,
    elevatorNotes: 'Modern deep station with dual street-to-concourse and concourse-to-platform heavy-duty glass elevators at both Ferdinand Bolstraat / Ceintuurbaan entrances.',
    strollerAdvice: 'Use the extra-wide ADA/stroller fare gate. Train floor is 100% flush with the platform edge—zero gap or step.',
    directionKeyDestinations: 'South: Amsterdam Zuid (connection to Schiphol Airport in 6 min). North: Rokin, Centraal Station, Noord (NDSM ferry).',
  },
  {
    name: 'Tram 12 Stop: Ceintuurbaan / Van Woustraat',
    type: 'tram',
    lines: ['Tram 12'],
    distanceFromBase: '450 meters (6 min walk)',
    walkTimeFromBaseMin: 6,
    stepFreeAccess: true,
    elevatorNotes: 'Street level low-floor platform with tactile paving and curb ramps.',
    strollerAdvice: 'Ideal east-west line across the city: connects directly to Museumplein, Concertgebouw, and Amstel Station.',
    directionKeyDestinations: 'Westbound: Museumplein, De Baarsjes, Sloterdijk. Eastbound: Amstel Station, Oost.',
  },
  {
    name: 'Free IJ Ferries: Buiksloterweg & NDSM (Centraal Station)',
    type: 'ferry',
    lines: ['Ferry F3 (Buiksloterweg)', 'Ferry F4 (NDSM Werf)'],
    distanceFromBase: '12 min via Metro 52',
    walkTimeFromBaseMin: 12,
    stepFreeAccess: true,
    elevatorNotes: 'Completely ramped floating docks behind Centraal Station. Free 24/7 public transit run by GVB.',
    strollerAdvice: 'Zero stairs! Simply roll strollers straight onto the wide open deck. No ticket or tapping required.',
    directionKeyDestinations: 'F3 goes to Eye Filmmuseum & A\'DAM Lookout (3 min ride). F4 goes to NDSM cultural shipyard (14 min ride).',
  },
];

export const transitRules = [
  {
    title: 'Kids Under 4 Ride 100% Free',
    desc: 'Children under 4 years old (both toddlers and the infant) travel completely free across all GVB trams, buses, and metro trains without requiring any ticket or card.',
    badge: 'Free for Toddlers & Infants',
    icon: 'Baby',
  },
  {
    title: 'Designated Stroller Zones on Trams & Metro',
    desc: 'Look for the double doors bearing the white/blue baby stroller emblem. On trams, this is located mid-train near the conductor desk. Inside, there is dedicated space for 2 open strollers. Wheelchairs and strollers have legal priority.',
    badge: 'Dedicated Space',
    icon: 'CheckCircle2',
  },
  {
    title: 'OVpay Contactless Payment for Adults',
    desc: 'No need to purchase paper transit cards or load OV-chipkaarts. Each of the 4 adults simply taps their contactless debit/credit card or phone (Apple Pay / Google Pay) at the card reader when entering AND exiting.',
    badge: 'Tap In & Tap Out',
    icon: 'CreditCard',
  },
  {
    title: 'Canal Bridge Stroller Navigation Trick',
    desc: 'Many historic arched bridges across the inner canal belt have 5-10 stone steps. When pushing double strollers, avoid pedestrian-only footbridges. Always cross at motorized street bridges (e.g. Rozengracht, Vijzelstraat, Utrechtsestraat) which have smooth asphalt ramps and zero stairs.',
    badge: 'Avoid Steep Stairs',
    icon: 'Footprints',
  },
];

export const emergencyPediatricInfo = {
  huisartsenpost: {
    name: 'Huisartsenposten Amsterdam (After-Hours GP / Doctor)',
    phone: '+31 (0)88 003 0600',
    hours: 'Evenings, nights (17:00 - 08:00), and all weekend 24 hours',
    location: 'OLVG West & OLVG Oost hospitals',
    notes: 'Always call first before arriving. English spoken fluently. For urgent infant fever or medical concerns.',
  },
  nearbyPharmacy: {
    name: 'Apotheek De Pijp / Kruidvat Van Woustraat',
    address: 'Van Woustraat 84, 1073 LR Amsterdam',
    walkFromBase: '3-4 min walk from Eendrachtstraat 13H',
    babySupplies: 'Nutrilon formula, Pampers size 1 & 4, baby saline spray, wipes, teething gel, infant paracetamol drops.',
  },
  generalEmergency: {
    number: '112',
    notes: 'National European emergency number for ambulance, police, or fire department.',
  },
};
