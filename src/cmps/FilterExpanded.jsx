import { height } from "@fortawesome/free-brands-svg-icons/fa42Group";
import { StayFilter } from "./StayFilter";
import SearchIcon from '@mui/icons-material/Search';
export function FilterExpanded() {
    return (
        <section className="filter-expanded">

            <div className="where-field field">
                <h2>Where</h2>
                <StayFilter />
            </div>


            <div className="check-in-field field">
                <h2>Check in</h2>
                <h1>Add dates</h1>
            </div>


            <div className="check-out-field field">
                <h2> Check out</h2>
                <h1>Add dates</h1>
            </div>


            <div className="who-field field">
                <div className="grid">
                    <h2>Who</h2>
                    <h1>Add guests</h1>
                </div>
                <div className="search-icon-container">
                    <SearchIcon className="search-icon" />
                </div>
            </div>


        </section>
    )
}