import L from 'leaflet';

export const createOriginMarker = () => {
  return L.divIcon({
    className: 'custom-map-marker origin-marker',
    html: `
      <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full">
        <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white ring-2 ring-emerald-400">
          A
        </div>
        <div class="absolute -bottom-1 w-2 h-2 bg-emerald-600 rotate-45"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export const createDestinationMarker = () => {
  return L.divIcon({
    className: 'custom-map-marker destination-marker',
    html: `
      <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-full">
        <div class="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-sm shadow-lg border-2 border-white ring-2 ring-rose-400">
          B
        </div>
        <div class="absolute -bottom-1 w-2 h-2 bg-rose-600 rotate-45"></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

export const createTollMarker = (price: string, isActive: boolean = true) => {
  const bgClass = isActive ? 'bg-amber-500 ring-amber-300' : 'bg-slate-400 ring-slate-300 opacity-60';
  return L.divIcon({
    className: 'custom-map-marker toll-marker',
    html: `
      <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 group cursor-pointer">
        <div class="px-2 py-0.5 rounded-full ${bgClass} text-white font-semibold text-xs shadow-md border border-white ring-2 flex items-center gap-1 transition-transform group-hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <span>${price}</span>
        </div>
      </div>
    `,
    iconSize: [50, 24],
    iconAnchor: [25, 12],
    popupAnchor: [0, -14],
  });
};
