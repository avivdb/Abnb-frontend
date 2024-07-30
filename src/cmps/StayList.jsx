import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { loadStays } from '../store/actions/stay.actions';
import StayPreview from './StayPreview';

export function StayList() {
    const stays = useSelector(state => state.stayModule.stays)
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const [page, setPage] = useState(0)

    useEffect(() => {
        loadStays(filterBy, page, true)
    }, [filterBy, page])

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1)
    }

    const uniqueStays = [...new Map(stays.map(stay => [stay._id, stay])).values()]

    if (stays === null || stays === undefined || stays.length === 0) {
        return <div className="loader"></div>
    }

    return (
        <InfiniteScroll
            dataLength={uniqueStays.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
        >
            <div className="stay-list">
                {uniqueStays.map(stay => (
                    <div key={stay._id} className="stay-item">
                        <StayPreview stay={stay} />
                    </div>
                ))}
            </div>
        </InfiniteScroll>
    )
}

