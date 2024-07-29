import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addStayMsg, setFilterBy } from '../store/actions/stay.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { StayList } from '../cmps/StayList'

export function StayIndex() {

    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            // showSuccessMsg('Stay removed')
        } catch (err) {
            // showErrorMsg('Cannot remove stay')
        }
    }

    return (
        <section className="stay-index">
            <StayList
                stays={stays}
                onRemoveStay={onRemoveStay} />
        </section>
    )
}