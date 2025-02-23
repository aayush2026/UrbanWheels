'use client';

import { useEffect, useRef, useState } from 'react';
import MapsService from '@/lib/services/maps';

interface MapProps {
  pickup: string;
  destination: string;
  onRouteCalculated?: (distance: string, duration: string) => void;
  highlightedRoute?: {
    distance: string;
    duration: string;
  };
}

export default function Map({ pickup, destination, onRouteCalculated, highlightedRoute }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    MapsService.initialize().then(() => {
      if (mapRef.current && window.google?.maps) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 2,
        });
        
        setMap(map);
        setDirectionsService(new google.maps.DirectionsService());
        setDirectionsRenderer(new google.maps.DirectionsRenderer({ map }));
      }
    });
  }, []);

  useEffect(() => {
    if (pickup && destination && directionsService && directionsRenderer) {
      directionsService.route(
        {
          origin: pickup,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === 'OK' && result) {
            directionsRenderer.setOptions({
              polylineOptions: {
                strokeColor: highlightedRoute ? '#4F46E5' : '#3B82F6',
                strokeWeight: highlightedRoute ? 6 : 4,
              }
            });
            directionsRenderer.setDirections(result);
            
            const route = result.routes[0];
            if (route && route.legs[0] && onRouteCalculated) {
              onRouteCalculated(
                route.legs[0].distance?.text || '',
                route.legs[0].duration?.text || ''
              );
            }
          }
        }
      );
    }
  }, [pickup, destination, directionsService, directionsRenderer, onRouteCalculated, highlightedRoute]);

  return (
    <div ref={mapRef} className="w-full h-[400px] rounded-lg shadow-lg" />
  );
} 