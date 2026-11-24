import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "./HotelMap.css";

function HotelMap({ latitude, longitude, title }) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  const isValidLocation =
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    lat >= -90 &&
    lat <= 90 &&
    lng >= -180 &&
    lng <= 180;

  if (!isValidLocation) {
    return <p>Invalid hotel location coordinates.</p>;
  }

  const position = [lat, lng];

  return (
    <div className="hotel-map">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        className="hotel-map-container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <CircleMarker
          center={position}
          radius={10}
          pathOptions={{
            color: "#245bc5",
            fillColor: "#245bc5",
            fillOpacity: 0.8,
          }}
        >
          <Popup>{title}</Popup>
        </CircleMarker>
      </MapContainer>
    </div>
  );
}

export default HotelMap;
