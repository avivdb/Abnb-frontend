import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { loadStays, addStay, updateStay, removeStay, addStayMsg } from '../store/actions/stay.actions'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { StayList } from '../cmps/StayList'
import { FilterLabel } from '../cmps/FilterLabel'

export function StayIndex() {

    const filterBy = useSelector(storeState => storeState.stayModule.filterBy)
    const stays = useSelector(storeState => storeState.stayModule.stays)

    useEffect(() => {
        loadStays(filterBy)
    }, [filterBy])

    async function onRemoveStay(stayId) {
        try {
            await removeStay(stayId)
            showSuccessMsg('Stay removed')
        } catch (err) {
            showErrorMsg('Cannot remove stay')
        }
    }

    return (
        <main className="stay-index">
            <FilterLabel className="" />
            <StayList
                stays={stays}
                onRemoveStay={onRemoveStay} />
        </main>
    )
}