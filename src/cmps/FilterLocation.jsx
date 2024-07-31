import React, { useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

export function FilterLocation({ filterToEdit, setFilterToEdit }) {
    const inputRef = useRef(null);

    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyDVyEl9QJubnu5MQfBLuhU49rPOFKof1lU", // Replace with your actual Google API key
            version: "weekly",
            libraries: ["places"],
        });

        loader.load().then(() => {
            const input = inputRef.current;

            if (input) {
                // Initialize AutocompleteService instead of Autocomplete to prevent default dropdown
                const autocompleteService = new google.maps.places.AutocompleteService();

                // Fetch predictions manually when needed
                input.addEventListener('input', () => {
                    if (input.value) {
                        autocompleteService.getPlacePredictions({ input: input.value }, (predictions, status) => {
                            if (status === google.maps.places.PlacesServiceStatus.OK) {
                                console.log("Predictions: ", predictions);
                                // Handle predictions as needed
                            }
                        });
                    }
                });
            }
        });
    }, []);

    function handleChange(ev) {
        const value = ev.target.value;
        setFilterToEdit({ ...filterToEdit, txt: value });
    }

    return (
        <form autoComplete='off'>
            <input
                ref={inputRef}
                id="location-input"
                name="txt"
                placeholder="Search destinations"
                value={filterToEdit.txt}
                onChange={handleChange}
                className="location-filter"
                autoComplete="off"
            />
        </form>
    );
}
