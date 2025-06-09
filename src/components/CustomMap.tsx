"use client"

import { useState, useCallback } from "react";
import Map, { Source, Layer, Popup, MapMouseEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

interface PointData {
  longitude: number;
  latitude: number;
  title: string;
  description?: string;
  imageUrl?: string;
  url?: string;
}

export default function CustomMap() {
  const [selectedPoint, setSelectedPoint] = useState<PointData | null>(null);
  const [cursor, setCursor] = useState("auto");
  const [mapLoaded, setMapLoaded] = useState(false); // 👈 track load state

  const pointLayerStyle = {
    id: 'points',
    type: 'circle' as const,
    source: 'points-source',
    'source-layer': 'GENERALfileWWFilmarchives-5acqbg',
    paint: {
      'circle-radius': 5,
      'circle-color': '#ffffff',
      'circle-stroke-width': 1,
      'circle-stroke-color': '#000000'
    }
  };

  const onClick = useCallback((event: MapMouseEvent) => {
    if (!event.features || event.features.length === 0) {
      setSelectedPoint(null);
      return;
    }

    const feature = event.features[0];
    if (feature.layer?.id === 'points') {
      const [longitude, latitude] = (feature.geometry as unknown as { coordinates: number[] }).coordinates;

      const title = feature.properties?.Title || feature.properties?.Name || 'Point d\'intérêt';
      const description = feature.properties?.Description || '';
      const imageUrl = feature.properties?.imageUrl || feature.properties?.image || '';
      const url = feature.properties?.URL;

      setSelectedPoint({ longitude, latitude, title, description, imageUrl, url });
    }
  }, []);

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
      onLoad={() => setMapLoaded(true)} // ✅ Wait for style to load
      onMouseEnter={() => setCursor("pointer")}
      onMouseLeave={() => setCursor("auto")}
      cursor={cursor}
      interactiveLayerIds={mapLoaded ? ["points"] : []} // ✅ Only after load
      onClick={mapLoaded ? onClick : undefined} // ✅ Only after load
    >
      <Source
        id="points-source"
        type="vector"
        url="mapbox://henrilangoisse75.8u43i1qi"
      >
        <Layer {...pointLayerStyle} />
      </Source>

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
          <div className="popup-content" style={{ color: 'white', backgroundColor: '#111', padding: '10px', borderRadius: '6px' }}>
            <h3 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
              {selectedPoint.title}
            </h3>

            {selectedPoint.description && (
              <p style={{ fontSize: '14px', marginBottom: '10px', lineHeight: '1.4' }}>
                {selectedPoint.description}
              </p>
            )}

            {selectedPoint.url && (
              <a href={selectedPoint.url} target="_blank" rel="noopener noreferrer"
                 style={{ fontSize: '14px', display: 'block', color: 'white', textDecoration: 'underline' }}>
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