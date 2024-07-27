import React, { useState, useEffect } from 'react'
import { stayService } from "../services/stay"
import StayPreview from "../cmps/StayPreview"

export function UserWishlist() {
    const [wishlist, setWishlist] = useState([])

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const fetchedStays = await stayService.query()
                const filteredWishlist = fetchedStays.filter(stay => stay.isWishlist)
                setWishlist(filteredWishlist)
            } catch (error) {
                console.error('Error loading wishlist:', error)
            }
        }

        fetchWishlist()
    }, [])

    return (
        <section className="user-wishlist">
            <h1>Wishlist</h1>
            <ul>
                {wishlist.map((stay) => (
                    <li key={stay._id}>
                        <StayPreview stay={stay} />
                    </li>
                ))}
            </ul>
        </section>
    )
}



