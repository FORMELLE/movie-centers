"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Map, { Source, Layer, Popup, Marker } from "react-map-gl/mapbox";
import type { CircleLayer } from "react-map-gl/mapbox";
import type { FeatureCollection } from "geojson";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Home() {
  // State to track the selected point for popup display
  const [selectedPoint, setSelectedPoint] = useState<{
    longitude: number;
    latitude: number;
    title: string;
  } | null>(null);
  const [cursor, setCursor] = useState("auto");

  const geojson: FeatureCollection = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-122.4, 37.8],
        },
        properties: { title: "915 Front Street, San Francisco, California" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-74.006, 40.7128],
        },
        properties: { title: "New York City, NY" },
      },
      {
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [-87.6298, 41.8781],
        },
        properties: { title: "Chicago, IL" },
      },
    ],
  };

  const layerStyle: CircleLayer = {
    id: "point",
    type: "circle",
    paint: {
      "circle-radius": 15,
      "circle-color": "#007cbf",
    },
    // This enables interactivity with the layer
    interactive: true,
  };

  // Handle clicks on map features
  const onClick = (event) => {
    // Get clicked features
    const features = event.features;
    if (features && features.length > 0) {
      const clickedFeature = features[0];
      setSelectedPoint({
        longitude: clickedFeature.geometry.coordinates[0],
        latitude: clickedFeature.geometry.coordinates[1],
        title: clickedFeature.properties.title,
      });
    } else {
      // Close popup when clicking elsewhere
      setSelectedPoint(null);
    }
  };

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiaGVucmlsYW5nb2lzc2U3NSIsImEiOiJjbTd5cjQycTAwYThrMmlxc28xMXprMmFxIn0.TcsJitAK8l1P8Oh2UhmySA"
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 2,
      }}
      style={{ width: "100vw", height: "100vh", margin: "auto" }}
      mapStyle="mapbox://styles/mapbox/dark-v11"
      interactiveLayerIds={["point"]} // Specify which layers receive click events
      onClick={onClick}
      onMouseLeave={() => setCursor("auto")}
      onMouseEnter={() => setCursor("pointer")}
      cursor={cursor}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} />
      </Source>

      {/* Display popup when a point is selected */}
      {selectedPoint && (
        <Popup
          longitude={selectedPoint.longitude}
          latitude={selectedPoint.latitude}
          anchor="bottom"
          onClose={() => setSelectedPoint(null)}
          closeButton={true}
          className=""
        >
          <div className="p-2 text-gray-700">
            <h3 className="font-bold">{selectedPoint.title}</h3>
          </div>
        </Popup>
      )}
    </Map>
  );
}
