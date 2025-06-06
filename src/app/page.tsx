import Sidebar from '../components/Sidebar';
import Map from '../components/CustomMap';
import "mapbox-gl/dist/mapbox-gl.css";

import { getPostBySlug, getSortedPostsData } from '../lib/posts';

export default async function Home() {
  const allPostsData = getSortedPostsData();
  const firstPost = await getPostBySlug(allPostsData.pop().slug)

  return (
<Map
  mapboxAccessToken="pk.eyJ1IjoiaGVucmlsYW5nb2lzc2U3NSIsImEiOiJjbWJra2J3ZmcwdHRrMmxxd3F4bWNtcmV0In0.TqRpYLdRVIdThFbCP4eWHA"
  initialViewState={{
    longitude: -100,
    latitude: 40,
    zoom: 2,
  }}
  style={{ width: "100vw", height: "100vh", margin: "auto" }}
  mapStyle="mapbox://styles/henrilangoisse75/cm7yrjpgi00tn01scf1d40e4n"
  interactiveLayerIds={["points"]}
  onClick={onClick}
  onMouseEnter={() => setCursor("pointer")}
  onMouseLeave={() => setCursor("auto")}
  cursor={cursor}
>
  {/* Source de données */}
  <Source
    id="points-source"
    type="vector"
    url="mapbox://henrilangoisse75.8u43i1qi"
  >
    <Layer
      {...pointLayerStyle}
      source-layer="GENERALfileWWFilmarchives-5acqbg"
    />
  </Source>

  {/* Popup pour le point sélectionné */}
  {selectedPoint && (
    <Popup
      longitude={selectedPoint.longitude}
      latitude={selectedPoint.latitude}
      anchor="bottom"
      onClose={() => setSelectedPoint(null)}
      closeButton={true}
      closeOnClick={false}
      className="map-popup"
    >
      <div className="popup-content" style={{ color: 'black' }}>
        <h3 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
          {selectedPoint.title}
        </h3>

        {selectedPoint.description && (
          <p style={{ fontSize: '14px', marginBottom: '10px', lineHeight: '1.4' }}>
            {selectedPoint.description}
          </p>
        )}

        {selectedPoint.url && (
          <a
            href={selectedPoint.url}
            style={{ fontSize: '14px', marginBottom: '10px', lineHeight: '1.4', color: 'blue' }}
          >
            {selectedPoint.url}
          </a>
        )}

        {selectedPoint.imageUrl && (
          <div style={{ marginTop: '10px', borderRadius: '4px', overflow: 'hidden' }}>
            <img
              src={selectedPoint.imageUrl}
              alt={selectedPoint.title}
              style={{
                width: "100%",
                maxHeight: "150px",
                objectFit: "cover",
                display: "block"
              }}
            />
          </div>
        )}
      </div>
    </Popup>
  )}
</Map>

  );
}