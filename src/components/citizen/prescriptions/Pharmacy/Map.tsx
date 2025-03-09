"use client";

import type React from "react";

import L, { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

// Import Leaflet CSS in a client component
import "leaflet/dist/leaflet.css";
import { CitizenPharmacy } from "@/models/Citizen";

interface PharmacyMapProps {
    availablePharmacies: CitizenPharmacy[];
    selectedPharmacy: CitizenPharmacy | undefined;
    setSelectedPharmacy: (pharmacy: CitizenPharmacy) => void;
}

interface LocationMarkerProps {
    pharmacy: CitizenPharmacy;
    onSelect: (pharmacy: CitizenPharmacy) => void;
}

interface MapCenterUpdaterProps {
    selectedPharmacy: CitizenPharmacy | null;
}

// Component to update map center when selected pharmacy changes
const MapCenterUpdater: React.FC<MapCenterUpdaterProps> = ({
    selectedPharmacy,
}) => {
    const map = useMap();

    useEffect(() => {
        if (selectedPharmacy && selectedPharmacy.latitude && selectedPharmacy.longitude) {
            map.setView(
                [selectedPharmacy.latitude, selectedPharmacy.longitude],
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
    const { latitude, longitude } = pharmacy;
    const map = useMap();

    // Create custom icon
    const pinIcon = L.icon({
        iconUrl: "/pinIcon.png",
        iconAnchor: [18, 40],
        iconSize: [36, 36],
    });

    const handleClick = () => {
        onSelect(pharmacy);
        map.setView([latitude, longitude], map.getZoom(), { animate: true });
    };

    return latitude && longitude ? (
        <Marker
            position={[latitude, longitude]}
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
                    ? [selectedPharmacy.latitude, selectedPharmacy.longitude]
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
