"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";

const MapBox = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [mapReference, setMapReference] = useState();
  const [lng, setLng] = useState<number>(-70.9);
  const [lat, setLat] = useState<number>(42.35);
  const [zoom, setZoom] = useState<number>(9);

  const handleLocation = useCallback(() => {
    console.log("onclick");
    navigator.geolocation.getCurrentPosition((position) => {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      setLng(longitude);
      setLat(latitude);

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          essential: true,
        });
      }
    });
  }, []);

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiY3Jpc3NyZWQiLCJhIjoiY2t3NW0zdHp6MThhMDMycGQ5dmJhbnMwaiJ9.u4b91qH2GlJtVUdHwLr7rQ";
    if (mapContainer.current && !mapRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [lng, lat],
        zoom: zoom,
      });

      //   setMapReference(map);

      // map.addControl(
      //   new MapboxGeocoder({
      //     accessToken: mapboxgl.accessToken,
      //     mapboxgl: mapboxgl,
      //   })
      // );
      map.addControl(new mapboxgl.FullscreenControl());
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(
        new MapboxDirections({ accessToken: mapboxgl.accessToken }),
        "top-left"
      );
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [lat, lng, zoom]); // Dependencias vacías para que se ejecute solo una vez al montar el componente

  return (
    <div className="relative h-[85vh]">
      <div id="map" ref={mapContainer} className="h-[100%] w-full"></div>

      <button
        onClick={handleLocation}
        className="absolute top-[3%] right-[5%] px-3 py-2 rounded-2xl bg-blue-800 text-white hover:bg-slate-900 transition-colors"
      >
        Mi Ubicación
      </button>
    </div>
  );
};

export default MapBox;
