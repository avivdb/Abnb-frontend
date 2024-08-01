import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActionAddOrder, updateOrder } from '../store/actions/order.action'
import { formatDateRange, capitalize } from "../services/util.service"
import { SOCKET_EVENT_ORDER_ADDED, socketService } from '../services/socket.service'
import { loadOrders } from "../store/actions/order.action"
import { loadStay } from "../store/actions/stay.actions"


export function UserOrders() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)

    const dispatch = useDispatch()


    useEffect(() => {
        loadOrders({ hostId: loggedInUser._id })

        socketService.on(SOCKET_EVENT_ORDER_ADDED, order => {
            console.log('GOT from socket', order)
            dispatch(getActionAddOrder(order))
        })

        return () => {
            socketService.off(SOCKET_EVENT_ORDER_ADDED)
        }
    }, [])


    async function handleStatusChange(order, newStatus) {
        try {
            const updatedOrder = { ...order, status: newStatus }
            await updateOrder(updatedOrder)
        } catch (error) {
            console.error('Error updating order status:', error)
        }
    }

    if (orders === null || orders === undefined || orders.length === 0) {
        return (
            <div className='loader-wrapper'>
                <div className="loader"></div>
            </div>
        )
    }

    // if (orders.length === 0) {
    //     return <div >no orders yet</div>
    // }

    return (
        <section className="user-orders">
            <h2>Incoming orders</h2>
            <hr />
            <ul className="user-orders-list">
                {orders.map(order => {
                    // const stay = stays[order.stay._id];
                    return (
                        <li className="user-order" key={order._id}>
                            {/* {stay ? ( */}
                            <>
                                <img src={order.stay.img} />

                                <section>
                                    <p>{order.stay.name}</p>
                                    <p>{order.capacity} guests</p>
                                </section>

                                <section>
                                    <p>{formatDateRange(order.startDate, order.endDate)}</p>
                                    <p>{order.startDate.slice(-4)}</p>
                                </section>

                                <p>₪{order.totalPrice}</p>

                                {order.status !== "pending" && <p>{order.status}</p>}

                                {order.status === "pending" &&
                                    <section className="order-btns-container">
                                        <button onClick={() => handleStatusChange(order, 'approved')}>Approve</button>
                                        <button onClick={() => handleStatusChange(order, 'declined')}>Decline</button>
                                    </section>
                                }
                            </>
                            {/* ) : (
                                <p>Order information not available</p>
                            )} */}
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

// const orders = useSelector(storeState => storeState.orderModule.orders)
//     const [isLoading, setIsLoading] = useState(true);
//     // const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

//     useEffect(() => {

//         fetchOrders();
//     }, [])

//     async function fetchOrders() {
//         try {
//             console.log('isLoading', isLoading)
//             await loadOrders()
//             setIsLoading(false)
//         } catch (err) {
//             console.log('err', err)
//             setIsLoading(false)
//         }
//         finally {
//             // console.log('isLoading', isLoading)

//         }
//     }


