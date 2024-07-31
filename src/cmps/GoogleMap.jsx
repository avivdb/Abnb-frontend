import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { useLocation, useNavigate } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import StayPreviewMap from './StayPreviewMap';
import iconHouse from '../assets/img/icons/house.svg';
import iconTransparent from '../assets/img/icons/transparent.svg';
import axios from "axios";

const mapStyle = [
    // Your map style configuration here
];

export function GoogleMap({ stays, mapHeight, mapBorderRadius }) {
    const location = useLocation();
    const mapRef = useRef(null);
    const googleMapRef = useRef(null);
    const markersRef = useRef([]);
    const infoWindowRef = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchAllCoords = async () => {
            const updatedStays = await Promise.all(stays.map(async (stay) => {
                const address = stay.loc.address ? stay.loc.address : `${stay.loc.city}, ${stay.loc.country}`;
                const geocodeData = await fetchCoordsFromAddress(address);
                if (geocodeData) {
                    stay.loc.lat = geocodeData.lat;
                    stay.loc.lan = geocodeData.lng;
                }
                return stay;
            }));
            return updatedStays;
        };

        const initializeMap = async () => {
            const loader = new Loader({
                apiKey: "AIzaSyDVyEl9QJubnu5MQfBLuhU49rPOFKof1lU",
                version: "weekly",
                libraries: ["places"],
            });

            await loader.load();

            if (!googleMapRef.current) {
                googleMapRef.current = new window.google.maps.Map(mapRef.current, {
                    center: { lat: 32.109333, lng: 34.855499 }, // Default center
                    zoom: 9,
                    styles: mapStyle,
                });
            }

            const updatedStays = await fetchAllCoords();

            // Clear existing markers
            markersRef.current.forEach(marker => marker.setMap(null));
            markersRef.current = [];

            // Set new center and zoom based on the first stay
            if (updatedStays.length > 0) {
                const firstStay = updatedStays[0];
                googleMapRef.current.setCenter({ lat: firstStay.loc.lat, lng: firstStay.loc.lan });

                // Calculate zoom level to show only 10% of the markers
                const totalMarkers = updatedStays.length;
                const markersToShow = Math.ceil(totalMarkers * 1);
                const zoomLevel = calculateZoomLevel(markersToShow);
                googleMapRef.current.setZoom(zoomLevel);
            }

            // Add new markers
            updatedStays.forEach((stay, index) => {
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
                        contentElement.className = 'stay-preview-map'; // Add a custom class
                        const root = createRoot(contentElement); // create a root
                        root.render(<StayPreviewMap stay={stay} onClick={() => navigate(`/stay/${stay._id}`)} />);

                        if (!infoWindowRef.current) {
                            infoWindowRef.current = new window.google.maps.InfoWindow();
                        }

                        infoWindowRef.current.setContent(contentElement);
                        infoWindowRef.current.open(googleMapRef.current, marker);
                    });
                }

                markersRef.current.push(marker);
            });
        };

        initializeMap();
    }, [stays, location.pathname]);

    async function fetchCoordsFromAddress(address) {
        try {
            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: address,
                    key: "AIzaSyDVyEl9QJubnu5MQfBLuhU49rPOFKof1lU",
                }
            });
            if (response.data.status === 'OK') {
                return response.data.results[0].geometry.location;
            } else {
                console.error('Geocoding error:', response.data.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching geocoding data:', error);
            return null;
        }
    }

    function calculateZoomLevel(markersToShow) {
        // Adjust this function to set the desired zoom level based on the number of markers to show
        // For simplicity, we're returning a static value
        return 12; // Adjust this value as needed to control the zoom level
    }

    return (
        <div style={{ height: mapHeight, width: '100%', overflow: "none", borderRadius: mapBorderRadius }} ref={mapRef}></div>
    );
}
