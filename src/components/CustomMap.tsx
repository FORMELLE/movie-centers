
"use client"

import { useState, useCallback } from "react";
import Map, { Source, Layer, Popup, MapMouseEvent } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

// Interface pour les propriétés des points de données
interface PointData {
  longitude: number;
  latitude: number;
  title: string;
  description?: string;
  imageUrl?: string;
  url?: string;
}

export default function CustomMap() {
  // State pour suivre le point sélectionné pour l'affichage du popup
  const [selectedPoint, setSelectedPoint] = useState<PointData | null>(null);
  const [cursor, setCursor] = useState("auto");

  // Définition de la couche de points - CORRIGÉE
  const pointLayerStyle = {
    id: 'points',
    type: 'circle' as const,
    source: 'points-source',
    'source-layer': 'GENERALfileWWFilmarchives-5acqbg', // ✅ Propriété entre guillemets
    paint: {
      'circle-radius': 5,
      'circle-color': '#f2cb07',
      'circle-stroke-width': 1,
      'circle-stroke-color': '#111111'
    }
  };
  
  // Fonction pour gérer le clic sur la carte
  const onClick = useCallback((event: MapMouseEvent) => {
    // S'assurer que nous avons des features cliquées
    if (!event.features || event.features.length === 0) {
      setSelectedPoint(null);
      return;
    }
    
    console.log("Features au clic:", event.features);
    // Récupérer les données du point cliqué
    const feature = event.features[0];
    if (feature.layer?.id === 'points') {
      const [longitude, latitude] = (feature.geometry as unknown as { coordinates: number[]}).coordinates;
      
      // Récupérer les propriétés du point
      // Ajustez les noms des propriétés selon votre structure de données
      const title = feature.properties?.Title || feature.properties?.Name || 'Point d\'intérêt';
      const description = feature.properties?.Description || '';
      const imageUrl = feature.properties?.imageUrl || feature.properties?.image || '';
      const url = feature.properties?.URL
      
      setSelectedPoint({
        longitude,
        latitude,
        title,
        description,
        imageUrl,
        url
      });
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
      // mapStyle="mapbox://styles/henrilangoisse75/cm9fpdomf00k401sbfk20h05k"
      // mapStyle="mapbox://styles/mapbox/dark-v11"
      interactiveLayerIds={["points"]} // ID de notre couche personnalisée
      onClick={onClick}
      onMouseEnter={() => setCursor("pointer")}
      onMouseLeave={() => setCursor("auto")}
      cursor={cursor}
    >
      {/* Source de données utilisant votre tileset Mapbox */}
      <Source
        id="points-source"
        type="vector"
        url="mapbox://henrilangoisse75.8u43i1qi" // Remplacez par l'URL de votre tileset
      >
        {/* Couche de points utilisant la source ci-dessus - CORRIGÉE */}
        <Layer {...pointLayerStyle} />
      </Source>
      
      {/* Popup pour afficher les informations du point */}
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
          <div className="popup-content" style={{color: 'black'}}>
            <h3 style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>
              {selectedPoint.title}
            </h3>
            
            {selectedPoint.description && (
              <p style={{ fontSize: '14px', marginBottom: '10px', lineHeight: '1.4' }}>
                {selectedPoint.description}
              </p>
            )}   
            
            {selectedPoint.url && (
              <a href={ selectedPoint.url } style={{ fontSize: '14px', marginBottom: '10px', lineHeight: '1.4', color: 'blue'}}>
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
  )
}