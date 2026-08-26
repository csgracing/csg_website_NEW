"use client";

import "leaflet/dist/leaflet.css";
import "./LocationMap.css";
import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { getSiteConfig } from "@/lib/data";

const position: [number, number] = [51.5277, -0.1024];

const TILE_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}";

const MASCOT_ICON_URL = "/images/mascot-pin.svg";
const MASCOT_ICON_SIZE: [number, number] = [50, 62];

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
      zoomControl={false}
      scrollWheelZoom={false}
      dragging={true}
      doubleClickZoom={false}
      touchZoom={false}
      boxZoom={false}
      keyboard={false}
      attributionControl={false}
      className="csg-map h-full w-full"
    >
      <TileLayer url={TILE_URL} />
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
