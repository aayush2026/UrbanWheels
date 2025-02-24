'use client';

import { useEffect, useRef } from 'react';
import MapsService from '@/lib/services/maps';

interface LocationInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export default function LocationInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
  onKeyDown
}: LocationInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    MapsService.initialize().then(() => {
      if (inputRef.current && window.google?.maps) {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          types: ['address'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (place.formatted_address) {
            onChange(place.formatted_address);
          }
        });
      }
    });
  }, [onChange]);

  return (
    <div>
      <label htmlFor={id} className="block text-md font-medium text-gray-700 dark:text-white">
        {label}
      </label>
      <input
        ref={inputRef}
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={`mt-1 block w-full p-2 rounded-sm shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm 
          ${error ? 'border-red-300 text-red-900 placeholder-red-300 dark:border-red-400 dark:text-red-400 dark:placeholder-red-400' : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400'}`}
      />
    </div>
  );
}