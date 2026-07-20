import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function ServiceMap({ latitude, longitude, title }) {

  return (

    <MapContainer
      center={[latitude, longitude]}
      zoom={15}
      style={{ height: "350px", width: "100%" }}
    >

      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[latitude, longitude]}>

        <Popup>
          {title}
        </Popup>

      </Marker>

    </MapContainer>

  );

}

export default ServiceMap;