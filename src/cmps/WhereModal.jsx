import { Card, CardMedia } from "@mui/material";
import { Autocomplete } from '@react-google-maps/api';
import image0 from '../assets/img/icons/asset 0.jpeg';
import image1 from '../assets/img/icons/asset 1.webp';
import image2 from '../assets/img/icons/asset 2.webp';
import image3 from '../assets/img/icons/asset 3.webp';
import image4 from '../assets/img/icons/asset 4.webp';
import image5 from '../assets/img/icons/asset 5.webp';
import { useEffect, useRef } from "react";


export function WhereModal({ filterToEdit, setFilterToEdit }) {

    const inputRef = useRef(null);

    useEffect(() => {
        if (window.google) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ['(cities)'],  // Restrict suggestions to cities only
            });

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.formatted_address) {
                    setFilterToEdit({ ...filterToEdit, txt: place.formatted_address });
                }
            });
        }
    }, []);




    return (
        <section className="where-modal">

            <div className="Recent-search">
                <h1>Recent searches</h1>
                <input
                    ref={inputRef}
                    placeholder="Search destinations"
                    className="location-filter"
                    value={filterToEdit.txt}
                    onChange={(e) => setFilterToEdit({ ...filterToEdit, txt: e.target.value })}
                />
            </div>

            <div className="search-by-region">
                <h1>Search by region</h1>
                <div className="regions">
                    <Card className="card">
                        <CardMedia
                            component="img"
                            image={image0}
                        />
                        I'm flexsible
                    </Card>

                    <Card className="card">
                        <CardMedia
                            component="img"
                            image={image1}
                        />
                        Europe
                    </Card>

                    <Card className="card">
                        <CardMedia
                            component="img"
                            image={image2}
                        />
                        Italy
                    </Card>

                    <Card className="card">
                        <CardMedia
                            component="img"
                            image={image3}
                        />
                        United States
                    </Card>

                    <Card className="card">
                        <CardMedia
                            component="img"
                            image={image4}
                        />
                        Greece
                    </Card>

                    <Card className="card">
                        <CardMedia
                            component="img"
                            image={image5}
                        />
                        South America
                    </Card>


                </div>




            </div>

        </section >
    )
}
