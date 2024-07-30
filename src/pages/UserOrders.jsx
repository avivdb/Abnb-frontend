import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getActionAddOrder, updateOrder } from '../store/actions/order.action'
import { formatDateRange, capitalize } from "../services/util.service"
import { SOCKET_EVENT_ORDER_ADDED, socketService } from '../services/socket.service'

export function UserOrders() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const [orders, setOrders] = useState([])
    const [stays, setStays] = useState({})
    // const [isLoading, setIsLoading] = useState(true)

    const dispatch = useDispatch()

    useEffect(() => {
        fetchOrders()

        socketService.on(SOCKET_EVENT_ORDER_ADDED, order => {
			console.log('GOT from socket', order)
			dispatch(getActionAddOrder(order))
		})
        return () => {
            socketService.off(SOCKET_EVENT_ORDER_ADDED)
        }
    }, [])

    async function fetchOrders() {
        try {
            // const fetchedOrders = await orderService.query()
            const filterBy = { hostId: loggedInUser._id }
            const fetchedOrders = await orderService.query(filterBy)


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

    async function handleStatusChange(order, newStatus) {
        try {
            const updatedOrder = { ...order, status: newStatus }

            await updateOrder(updatedOrder)

            setOrders(prevOrders =>
                prevOrders.map(o => o._id === order._id ? { ...o, status: newStatus } : o)
            )
        } catch (error) {
            console.error('Error updating order status:', error)
        } 
    }

    if (stays === null || stays === undefined ||
        orders === null || orders === undefined) {
        return <div className="loader"></div>
    }

    if (orders.length === 0 || stays.length === 0 ) {
        return <div >no orders yet</div>
    }

    return (
        <section className="user-orders">
            <h2>Incoming orders</h2>
            <ul className="user-orders-list">
                {orders.map(order => {
                    const stay = stays[order.stay._id];
                    return (
                        <li className="user-order" key={order._id}>
                            {stay ? (
                                <>
                                    <img src={stay.imgUrls[0]} alt={stay.name} />

                                    <section>
                                        <p>{stay.name}</p>
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
                            ) : (
                                <p>Order information not available</p>
                            )}
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


