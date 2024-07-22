import { useState, useEffect } from 'react'
import { orderService } from "../services/order/order.service.local"

export function UserOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const fetchedOrders = await orderService.query();
                setOrders(fetchedOrders);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        fetchOrders();
    }, []);

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
                            <td>
                                <button>Approve</button>
                                <button>Decline</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
