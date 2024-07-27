import React, { useEffect, useState, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useLocation } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import StayPreviewMap from './StayPreviewMap';
import iconHouse from '../assets/img/icons/house.svg';
import iconTransparent from '../assets/img/icons/transparent.svg'

const mapStyle = [
    // Your map style configuration here
];

export function GoogleMap({ stays, mapHeight, mapBorderRadius }) {
    const location = useLocation();
    const initialCoords = stays[0] ? { lat: stays[0].loc.lat, lng: stays[0].loc.lng } : { lat: 32.109333, lng: 34.855499 };
    const [coords, setCoords] = useState(initialCoords);
    const mapRef = useRef(null);
    const googleMapRef = useRef(null);
    const markersRef = useRef([]);
    const zoom = 11;
    const infoWindowRef = useRef(null);

    useEffect(() => {
        setCoords(initialCoords);
    }, [stays]);

    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyBmTIFX2iCfPx5yMBY1_x3A9-5_eT7wQZE",
            version: "weekly",
            libraries: ["places"],
        });

        loader.load().then(() => {
            if (!googleMapRef.current) {
                googleMapRef.current = new window.google.maps.Map(mapRef.current, {
                    center: coords,
                    zoom: zoom,
                    styles: mapStyle,
                });
            } else {
                googleMapRef.current.setCenter(coords);
            }

            // Clear existing markers
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];

            // Add new markers
            stays.forEach((stay, index) => {
                const marker = new window.google.maps.Marker({
                    position: { lat: stay.loc.lat, lng: stay.loc.lan },
                    map: googleMapRef.current,
                    icon: location.pathname.startsWith('/stay/') && index === 0 ? {
                        url: iconHouse,
                    } : {
                        url: iconTransparent,
                    },
                    label: !location.pathname.startsWith('/stay') ? {
                        text: `₪${stay.price}`,
                        className: location.pathname.startsWith('/s/') ? 'price-marker' : 'location-marker'
                    } : null,
                });

                if (location.pathname.startsWith('/stay/') && index === 0) {
                    marker.addListener('click', () => {
                        if (!infoWindowRef.current) {
                            infoWindowRef.current = new window.google.maps.InfoWindow();
                        }

                        infoWindowRef.current.setContent('<div>Exact location provided after booking</div>');
                        infoWindowRef.current.open(googleMapRef.current, marker);
                    });
                }

                if (location.pathname.startsWith('/s/')) {
                    marker.addListener('click', () => {
                        const contentElement = document.createElement('div');
                        const root = createRoot(contentElement); // create a root
                        root.render(<StayPreviewMap stay={stay} />);

                        if (!infoWindowRef.current) {
                            infoWindowRef.current = new window.google.maps.InfoWindow();
                        }

                        infoWindowRef.current.setContent(contentElement);
                        infoWindowRef.current.open(googleMapRef.current, marker);
                    });
                }

                markersRef.current.push(marker);
            });
        }).catch(e => {
            console.error('Error loading Google Maps API:', e);
        });
    }, [coords, stays, zoom, location.pathname]);

    return (
        <div style={{ height: mapHeight, width: '100%', overflow: "none", borderRadius: mapBorderRadius }} ref={mapRef}></div>
    );
}
