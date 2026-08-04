"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

// City St George's, University of London — Northampton Square, London EC1V 0HB
const position: [number, number] = [51.5277, -0.1024];

const pinIcon = L.divIcon({
  className: "",
  html: `<svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 11 16 24 16 24s16-13 16-24C32 7.163 24.837 0 16 0z" fill="#c41414"/>
    <circle cx="16" cy="15" r="6" fill="#ffffff"/>
  </svg>`,
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -36],
});

export function LocationMap() {
  return (
    <MapContainer center={position} zoom={15} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={pinIcon}>
        <Popup>City St George&apos;s, University of London</Popup>
      </Marker>
    </MapContainer>
  );
}
