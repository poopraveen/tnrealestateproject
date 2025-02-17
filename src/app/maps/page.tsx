'use client'
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polygon } from '@react-google-maps/api';

interface Coordinates {
  lat: number;
  lng: number;
}

const RealEstateMap: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<Coordinates | null>(null);

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  const center: Coordinates = {
    lat: 40.748817, // Default center (e.g., New York City)
    lng: -73.985428,
  };

  const polygonPaths = [
    { lat: 40.748817, lng: -73.985428 },
    { lat: 40.748817, lng: -73.975428 },
    { lat: 40.738817, lng: -73.975428 },
    { lat: 40.738817, lng: -73.985428 },
  ];

  // Handling click event to place marker
  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setSelectedLocation({
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      });
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-center text-black dark:text-white mb-4">Real Estate Map with Polygon</h2>
      <LoadScript googleMapsApiKey="AIzaSyCIBE5F8bunnELDs9K-WmHqpv237Sk0X8w">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          onClick={handleMapClick}
        >
          {selectedLocation && (
            <Marker
              position={selectedLocation}
              clickable
              title="Selected Plot"
            />
          )}

          {/* Define the polygon shape */}
          <Polygon
            paths={polygonPaths}
            options={{
              fillColor: 'lightblue',
              fillOpacity: 0.3,
              strokeColor: 'blue',
              strokeOpacity: 1,
              strokeWeight: 2,
            }}
          />
        </GoogleMap>
      </LoadScript>
      {selectedLocation && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
          <p className="text-lg font-medium text-black dark:text-white">Plot coordinates:</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Latitude: {selectedLocation.lat}</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">Longitude: {selectedLocation.lng}</p>
        </div>
      )}
    </div>
  );
};

export default RealEstateMap;
