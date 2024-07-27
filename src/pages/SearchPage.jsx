import { useSelector } from "react-redux"
import { StayList } from "../cmps/StayList"
import { useEffect } from "react"
import { loadStays, setFilterBy } from '../store/actions/stay.actions'
import { GoogleMap } from "../cmps/GoogleMap"

export function SearchPage() {
    const stays = useSelector(storeState => storeState.stayModule.stays)
    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    return (
        <section className="search-page">
            <StayList stays={stays} />
            <GoogleMap stays={stays} mapBorderRadius={0} mapHeight={"100vh"} />
        </section>
    )
}