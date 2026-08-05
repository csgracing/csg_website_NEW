"use client";

import "leaflet/dist/leaflet.css";
import "./LocationMap.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { getSiteConfig } from "@/lib/data";

// City St George's, University of London — Northampton Square, London EC1V 0HB
const position: [number, number] = [51.5277, -0.1024];

// CartoDB "dark_all" — free, no API key. Swap to `light_all` for the
// grey/light variant if dark ever reads too heavy against the white footer.
const TILE_URL = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

const MASCOT_ICON_URL = "/images/mascot-pin.svg";
const MASCOT_ICON_SIZE: [number, number] = [50, 62];

// Leaflet positions markers via inline `transform`, which fights any CSS
// animation/hover transform on that same element (the marker snaps to the
// map's corner mid-bounce). Wrapping the image in a divIcon shell keeps
// Leaflet's transform on the outer wrapper and leaves the inner
// `<img class="mascot-marker">` (animated in LocationMap.css) free to move.
const mascotIcon = L.divIcon({
  className: "",
  html: `<img src="${MASCOT_ICON_URL}" class="mascot-marker" width="${MASCOT_ICON_SIZE[0]}" height="${MASCOT_ICON_SIZE[1]}" alt="" />`,
  iconSize: MASCOT_ICON_SIZE,
  iconAnchor: [MASCOT_ICON_SIZE[0] / 2, MASCOT_ICON_SIZE[1]],
});

export function LocationMap() {
  const site = getSiteConfig();
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;

  return (
    <MapContainer
      center={position}
      zoom={15}
      // Footer embed, not a full map page — locked down except dragging.
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={true}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      // Replaced by MapEmbed's own compact "i" attribution control.
      attributionControl={false}
      className="csg-map h-full w-full"
    >
      <TileLayer url={TILE_URL} />
      {/* Clicking the pin opens Google Maps directly (via Leaflet's click
          event, not a nested <a>, which Leaflet's own handling can swallow). */}
      <Marker
        position={position}
        icon={mascotIcon}
        eventHandlers={{
          click: () => window.open(mapsUrl, "_blank", "noopener,noreferrer"),
        }}
      />
    </MapContainer>
  );
}
