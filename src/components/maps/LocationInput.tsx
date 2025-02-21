'use client';

import { useEffect, useRef } from 'react';
import MapsService from '@/lib/services/maps';

interface LocationInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function LocationInput({
  id,
  label,
  value,
  onChange,
  placeholder
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
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        ref={inputRef}
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
} 