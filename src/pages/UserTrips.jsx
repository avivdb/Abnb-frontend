import { useState, useEffect } from 'react'
import { orderService } from "../services/order/"
import { stayService } from '../services/stay/'
import { formatDateRangeObject, capitalize } from "../services/util.service"


export function UserTrips() {
    const [orders, setOrders] = useState([])
    const [stays, setStays] = useState({})

    useEffect(() => {
        async function fetchOrders() {
            try {
                const fetchedOrders = await orderService.query()

                const stayPromises = fetchedOrders.map(order => stayService.getById(order.stay._id))
                const fetchedStays = await Promise.all(stayPromises)

                const staysLookup = fetchedStays.reduce((acc, stay) => {
                    acc[stay._id] = stay
                    return acc
                }, {})

                setOrders(fetchedOrders)
                setStays(staysLookup)
            } catch (error) {
                console.error('Error fetching orders or stays:', error)
            }
        }

        fetchOrders()
    }, [])


    if (stays === null || stays === undefined || stays.length === 0 ||
        orders === null || orders === undefined || orders.length === 0) {
        return <div className="loader"></div>
    }


    return (
        <section className="user-trips">
            <h2>Trips</h2>
            <ul className="user-trips-list">
                {orders.map(order => {
                    const stay = stays[order.stay._id]
                    return (
                        <li className="user-trip" key={order._id}>
                            {stay ? (
                                <>
                                    <div
                                        className="trip-order-status"
                                        style={{
                                            backgroundColor: order.status === 'approved'
                                                ? '#c8e6c9'
                                                : order.status === 'declined'
                                                    ? '#ef9a9a'
                                                    : '#fff'
                                        }}>
                                        {capitalize(order.status)}</div>
                                    <img src={stay.imgUrls[0]} alt={stay.name} />
                                    <section className="trip-top-info">
                                        <p>{stay.loc.city}</p>
                                        <p>{stay.type} hosted by {stay.host.fullname.split(" ")[0]}</p>
                                        <hr />
                                    </section>
                                    <section className="trip-main-info">
                                        <section>
                                            <p>{formatDateRangeObject(order.startDate, order.endDate).month}</p>
                                            <p>{formatDateRangeObject(order.startDate, order.endDate).dates}</p>
                                            <p>{order.startDate.slice(-4)}</p>
                                        </section>
                                        <section>
                                            <p>{stay.loc.address}</p>
                                            <p>{stay.loc.city}</p>
                                            <p>{stay.loc.country}</p>
                                        </section>
                                    </section>
                                </>
                            ) : (
                                <p>Trip information not available</p>
                            )}
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}
