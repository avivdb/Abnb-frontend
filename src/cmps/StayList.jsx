import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { loadStays } from '../store/actions/stay.actions';
import StayPreview from './StayPreview';

export function StayList() {
    const dispatch = useDispatch()
    const stays = useSelector(state => state.stayModule.stays)
    const filterBy = useSelector(state => state.stayModule.filterBy)
    const [page, setPage] = useState(0)

    useEffect(() => {
        loadStays(filterBy, page)
    }, [filterBy, page])

    const fetchMoreData = () => {
        setPage(prevPage => prevPage + 1)
    }

    // Remove duplicates based on _id
    const uniqueStays = [...new Map(stays.map(stay => [stay._id, stay])).values()]

    return (
        <InfiniteScroll
            dataLength={uniqueStays.length}
            next={fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
                <p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>
            }
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

