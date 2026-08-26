import React, { useState, useEffect, useRef } from 'react';
import { LocationPoint } from '../../types/trip';
import { searchAddresses } from '../../services/geocoding';
import { MapPin, ArrowUpDown, X, Loader2, Navigation } from 'lucide-react';

interface AddressInputProps {
  origin: LocationPoint | null;
  destination: LocationPoint | null;
  onSelectOrigin: (point: LocationPoint | null) => void;
  onSelectDestination: (point: LocationPoint | null) => void;
  onSwap: () => void;
  googleApiKey?: string;
}

export const AddressInput: React.FC<AddressInputProps> = ({
  origin,
  destination,
  onSelectOrigin,
  onSelectDestination,
  onSwap,
  googleApiKey,
}) => {
  const [originQuery, setOriginQuery] = useState(origin?.address || '');
  const [destQuery, setDestQuery] = useState(destination?.address || '');

  const [originSuggestions, setOriginSuggestions] = useState<LocationPoint[]>([]);
  const [destSuggestions, setDestSuggestions] = useState<LocationPoint[]>([]);

  const [isLoadingOrigin, setIsLoadingOrigin] = useState(false);
  const [isLoadingDest, setIsLoadingDest] = useState(false);

  const [isOriginOpen, setIsOriginOpen] = useState(false);
  const [isDestOpen, setIsDestOpen] = useState(false);

  const originWrapperRef = useRef<HTMLDivElement>(null);
  const destWrapperRef = useRef<HTMLDivElement>(null);

  // Sync external origin/destination state changes
  useEffect(() => {
    setOriginQuery(origin?.address || '');
  }, [origin]);

  useEffect(() => {
    setDestQuery(destination?.address || '');
  }, [destination]);

  // Debounced search for Origin
  useEffect(() => {
    if (!originQuery || originQuery.length < 3 || originQuery === origin?.address) {
      setOriginSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingOrigin(true);
      const results = await searchAddresses(originQuery, googleApiKey);
      setOriginSuggestions(results);
      setIsLoadingOrigin(false);
      setIsOriginOpen(true);
    }, 350);

    return () => clearTimeout(timer);
  }, [originQuery, origin?.address, googleApiKey]);

  // Debounced search for Destination
  useEffect(() => {
    if (!destQuery || destQuery.length < 3 || destQuery === destination?.address) {
      setDestSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoadingDest(true);
      const results = await searchAddresses(destQuery, googleApiKey);
      setDestSuggestions(results);
      setIsDestOpen(false || results.length > 0);
    }, 350);

    return () => clearTimeout(timer);
  }, [destQuery, destination?.address, googleApiKey]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        originWrapperRef.current &&
        !originWrapperRef.current.contains(event.target as Node)
      ) {
        setIsOriginOpen(false);
      }
      if (
        destWrapperRef.current &&
        !destWrapperRef.current.contains(event.target as Node)
      ) {
        setIsDestOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="space-y-3">
      {/* Origin Input */}
      <div ref={originWrapperRef} className="relative">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50"></span>
          <span>Origem</span>
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-emerald-500 pointer-events-none">
            <MapPin className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={originQuery}
            onChange={(e) => {
              setOriginQuery(e.target.value);
              setIsOriginOpen(true);
            }}
            onFocus={() => {
              if (originSuggestions.length > 0) setIsOriginOpen(true);
            }}
            placeholder="Digite a cidade de partida (ex: São Paulo, SP)..."
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#162039] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
          />
          {isLoadingOrigin ? (
            <div className="absolute right-3.5 text-slate-400 animate-spin">
              <Loader2 className="w-4 h-4" />
            </div>
          ) : originQuery ? (
            <button
              type="button"
              onClick={() => {
                setOriginQuery('');
                onSelectOrigin(null);
              }}
              className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {/* Origin Autocomplete Suggestions Dropdown */}
        {isOriginOpen && originSuggestions.length > 0 && (
          <ul className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-[#151d33] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 backdrop-blur-md">
            {originSuggestions.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  onSelectOrigin(item);
                  setOriginQuery(item.address);
                  setIsOriginOpen(false);
                }}
                className="px-3.5 py-3 text-xs text-slate-800 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/60 cursor-pointer flex items-start gap-2.5 transition-colors"
              >
                <Navigation className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                <span className="line-clamp-2 font-medium">{item.address}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Swap Button */}
      <div className="flex justify-center -my-1">
        <button
          type="button"
          onClick={onSwap}
          className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-[#18233d] dark:hover:bg-[#202e52] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 shadow-md shadow-black/5 dark:shadow-black/30 transition-all hover:scale-110 active:scale-95"
          title="Inverter Origem e Destino"
          aria-label="Inverter Origem e Destino"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Destination Input */}
      <div ref={destWrapperRef} className="relative">
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-sm shadow-rose-500/50"></span>
          <span>Destino</span>
        </label>
        <div className="relative flex items-center">
          <div className="absolute left-3.5 text-rose-500 pointer-events-none">
            <MapPin className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={destQuery}
            onChange={(e) => {
              setDestQuery(e.target.value);
              setIsDestOpen(true);
            }}
            onFocus={() => {
              if (destSuggestions.length > 0) setIsDestOpen(true);
            }}
            placeholder="Digite a cidade de destino (ex: Rio de Janeiro, RJ)..."
            className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/70 dark:bg-[#162039] text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-medium focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all shadow-sm"
          />
          {isLoadingDest ? (
            <div className="absolute right-3.5 text-slate-400 animate-spin">
              <Loader2 className="w-4 h-4" />
            </div>
          ) : destQuery ? (
            <button
              type="button"
              onClick={() => {
                setDestQuery('');
                onSelectDestination(null);
              }}
              className="absolute right-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>

        {/* Destination Autocomplete Suggestions Dropdown */}
        {isDestOpen && destSuggestions.length > 0 && (
          <ul className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-[#151d33] border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80 backdrop-blur-md">
            {destSuggestions.map((item, idx) => (
              <li
                key={idx}
                onClick={() => {
                  onSelectDestination(item);
                  setDestQuery(item.address);
                  setIsDestOpen(false);
                }}
                className="px-3.5 py-3 text-xs text-slate-800 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-sky-950/60 cursor-pointer flex items-start gap-2.5 transition-colors"
              >
                <Navigation className="w-4 h-4 text-sky-500 mt-0.5 shrink-0" />
                <span className="line-clamp-2 font-medium">{item.address}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
