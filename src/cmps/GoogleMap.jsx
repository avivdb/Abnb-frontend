import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

function AnyReactComponent({ text, lat, lng, onClick, element }) {
    return (

        <div style={{ fontSize: "2em" }}
            onClick={() => onClick({ lat, lng })}>
            {text}
            {element}
        </div>
    )
}
const mapStyle = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "lightness": "-5"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#a7ce95"
            },
            {
                "lightness": "45"
            }
        ]
    },
    {
        "featureType": "poi.school",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#be9b7b"
            },
            {
                "lightness": "70"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#5d4b46"
            },
            {
                "lightness": "60"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": "23"
            },
            {
                "lightness": "10"
            },
            {
                "gamma": "0.8"
            },
            {
                "hue": "#b000ff"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a2daf2"
            }
        ]
    }
]

export function GoogleMap({ stay }) {
    const initialCoords = stay ? { lat: stay.loc.lat, lng: stay.loc.lng } : { lat: 32.109333, lng: 34.855499 };
    const [coords, setCoords] = useState(initialCoords)
    const zoom = 11
    console.log(stay)

    // function onHandleClick(coords) {
    //     setCoords(coords)
    // }

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBmTIFX2iCfPx5yMBY1_x3A9-5_eT7wQZE" }}
                center={coords}
                defaultZoom={zoom}
                options={{ styles: mapStyle }}
            >
                <AnyReactComponent {...coords}
                    element={
                        <div className="map-marker-wrapper">
                            <div className="map-marker">
                                <span className="fa solid house"></span>
                            </div>
                        </div>} >

                </AnyReactComponent >
            </GoogleMapReact>


        </div>
    );
}


