import { Card, CardMedia } from "@mui/material";
import image0 from '../assets/img/icons/asset 0.jpeg';
import image1 from '../assets/img/icons/asset 1.webp';
import image2 from '../assets/img/icons/asset 2.webp';
import image3 from '../assets/img/icons/asset 3.webp';
import image4 from '../assets/img/icons/asset 4.webp';
import image5 from '../assets/img/icons/asset 5.webp';


export function WhereModal() {
    return (
        <section className="where-modal">
            <div className="Recent-search">
                <h1>Recent searches</h1>
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
