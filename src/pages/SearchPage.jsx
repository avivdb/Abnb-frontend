import { useSelector } from "react-redux"
import { StayList } from "../cmps/StayList"
import { useEffect } from "react"
import { loadStays, setFilterBy } from '../store/actions/stay.actions'
import { GoogleMap } from "../cmps/GoogleMap"
import { useMediaQuery } from "@mui/material"

export function SearchPage() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        loadStays(filterBy, 0, true)
    }, [filterBy])

    return (
        <section className="search-page">
            <section className="search-page-list">
                <StayList stays={stays} />
            </section>
            {!isSmallScreen &&
                <section className="search-page-map">
                    <GoogleMap stays={stays} mapBorderRadius={0} mapHeight={"100vh"} />
                </section>
            }
        </section>
    )
}