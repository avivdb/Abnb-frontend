import { useState, useEffect } from 'react'

import { orderService } from "../services/order/order.service.local"
import { updateOrder } from '../store/actions/order.action'

export function UserOrders() {
    const [orders, setOrders] = useState([])

    useEffect(() => {

        fetchOrders()
    }, [])

    async function fetchOrders() {
        try {
            const fetchedOrders = await orderService.query()
            setOrders(fetchedOrders)
        } catch (error) {
            console.error('Error fetching orders:', error)
        }
    }

    async function handleStatusChange(order, newStatus) {
        try {
            const updatedOrder = { ...order, status: newStatus }
            await updateOrder(updatedOrder)
            setOrders(prevOrders => prevOrders.map(o => o._id === order._id ? updatedOrder : o))
        } catch (error) {
            console.error('Error updating order status:', error)
        }
    }

    return (
        <div className="user-orders">
            <h2>Incoming orders</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Guest Name</th>
                        <th>Check in</th>
                        <th>Check out</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Updat Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.guest.fullname}</td>
                            <td>{order.startDate}</td>
                            <td>{order.endDate}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.status}</td>
                            <td>
                                <button onClick={() => handleStatusChange(order, 'approved')}>Approve</button>
                                <button onClick={() => handleStatusChange(order, 'declined')}>Decline</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
