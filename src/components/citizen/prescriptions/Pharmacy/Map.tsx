"use client";

import type React from "react";

import { Pharmacy } from "@/components/models/Pharmacy";
import L, { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

// Import Leaflet CSS in a client component
import "leaflet/dist/leaflet.css";

interface PharmacyMapProps {
    availablePharmacies: Pharmacy[];
    selectedPharmacy: Pharmacy | undefined;
    setSelectedPharmacy: (pharmacy: Pharmacy) => void;
}

interface LocationMarkerProps {
    pharmacy: Pharmacy;
    onSelect: (pharmacy: Pharmacy) => void;
}

interface MapCenterUpdaterProps {
    selectedPharmacy: Pharmacy | null;
}

// Component to update map center when selected pharmacy changes
const MapCenterUpdater: React.FC<MapCenterUpdaterProps> = ({
    selectedPharmacy,
}) => {
    const map = useMap();

    useEffect(() => {
        if (selectedPharmacy && selectedPharmacy.lat && selectedPharmacy.lng) {
            map.setView(
                [selectedPharmacy.lat, selectedPharmacy.lng],
                map.getZoom(),
                { animate: true }
            );
        }
    }, [selectedPharmacy, map]);

    return null; // This component only controls the map, nothing renders
};

// Component for individual pharmacy markers
const LocationMarker: React.FC<LocationMarkerProps> = ({
    pharmacy,
    onSelect,
}) => {
    const { lat, lng } = pharmacy;
    const map = useMap();

    // Create custom icon
    const pinIcon = L.icon({
        iconUrl: "/pinIcon.png",
        iconAnchor: [18, 40],
        iconSize: [36, 36],
    });

    const handleClick = () => {
        onSelect(pharmacy);
        map.setView([lat, lng], map.getZoom(), { animate: true });
    };

    return lat && lng ? (
        <Marker
            position={[lat, lng]}
            icon={pinIcon}
            eventHandlers={{ click: handleClick }}
        />
    ) : null;
};

export function PharmacyMap({
    availablePharmacies,
    selectedPharmacy,
    setSelectedPharmacy,
}: PharmacyMapProps) {
    // Default center if no pharmacy is selected
    const defaultCenter: LatLngTuple = [43.204666, 27.910543];

    return (
        <MapContainer
            className="w-full h-full"
            center={
                selectedPharmacy
                    ? [selectedPharmacy.lat, selectedPharmacy.lng]
                    : defaultCenter
            }
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {selectedPharmacy && (
                <MapCenterUpdater selectedPharmacy={selectedPharmacy} />
            )}

            {availablePharmacies.map((pharmacy) => (
                <LocationMarker
                    key={pharmacy.id}
                    pharmacy={pharmacy}
                    onSelect={setSelectedPharmacy}
                />
            ))}
        </MapContainer>
    );
}
