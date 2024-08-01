import { useState, useEffect } from 'react'
import { orderService } from "../services/order/"
import { stayService } from '../services/stay/'
import { formatDateRangeObject, capitalize } from "../services/util.service"
import { useDispatch, useSelector } from 'react-redux'
import { getActionUpdateOrder, loadOrders } from "../store/actions/order.action"
import { SOCKET_EVENT_ORDER_UPDATED } from '../services/socket.service'



export function UserTrips() {

    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)

    const dispatch = useDispatch()


    useEffect(() => {
        loadOrders({ guestId: loggedInUser._id })

        socketService.on(SOCKET_EVENT_ORDER_UPDATED, order => {
            console.log('GOT from socket', order)
            dispatch(getActionUpdateOrder(order))
        })

        return () => {
            socketService.off(SOCKET_EVENT_ORDER_UPDATED)
        }
    }, [])



    if (orders === null || orders === undefined || orders.length === 0) {
        return (
            <div className='loader-wrapper'>
                <div className="loader"></div>
            </div>
        )
    }

    // if (orders.length === 0) {
    //     return <div >no trips yet</div>
    // }


    return (
        <section className="user-trips">
            <h2>Trips</h2>
            <hr />
            <ul className="user-trips-list">
                {orders.map(order => {
                    return (
                        <li className="user-trip" key={order._id}>
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
                                <img src={order.stay.img} />
                                <section className="trip-top-info">
                                    <p>{order.stay.loc.city}</p>
                                    <p>Hosted by {order.host.fullname.split(" ")[0]}</p>
                                    <hr />
                                </section>
                                <section className="trip-main-info">
                                    <section>
                                        <p>{formatDateRangeObject(order.startDate, order.endDate).month}</p>
                                        <p>{formatDateRangeObject(order.startDate, order.endDate).dates}</p>
                                        <p>{order.startDate.slice(-4)}</p>
                                    </section>
                                    <section>
                                        <p>{order.stay.name}</p>
                                        <p>{order.stay.loc.city}</p>
                                        <p>{order.stay.loc.country}</p>
                                    </section>
                                </section>
                            </>
                        </li>
                    )
                })}
            </ul>
        </section>
    );
}
