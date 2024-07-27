import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateOrder, loadOrders } from '../store/actions/order.action';

export function UserOrders() {

    const orders = useSelector(storeState => storeState.orderModule.orders)
    const [isLoading, setIsLoading] = useState(true);
    // const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

    useEffect(() => {

        fetchOrders();
    }, [])

    async function fetchOrders() {
        try {
            console.log('isLoading', isLoading)
            await loadOrders()
            setIsLoading(false)
        } catch (err) {
            console.log('err', err)
            setIsLoading(false)
        }
        finally {
            // console.log('isLoading', isLoading)

        }
    }

    async function handleStatusChange(order, newStatus) {
        try {
            const updatedOrder = { ...order, status: newStatus };
            await updateOrder(updatedOrder);
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    }

    if (isLoading) {
        return <div>Loading...</div>;
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
                        <th>Update Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders && orders.length > 0 ? (
                        orders.map((order, index) => (
                            <tr key={order._id || index}>
                                <td>{index + 1}</td>
                                <td>{order.guest?.fullname || 'N/A'}</td>
                                <td>{order.startDate || 'N/A'}</td>
                                <td>{order.endDate || 'N/A'}</td>
                                <td>{order.totalPrice || 'N/A'}</td>
                                <td>{order.status || 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleStatusChange(order, 'approved')}>Approve</button>
                                    <button onClick={() => handleStatusChange(order, 'declined')}>Decline</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No orders available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
