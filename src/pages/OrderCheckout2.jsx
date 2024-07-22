import { useParams, useSearchParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addOrder } from "../store/actions/order.action"
import { useEffect, useState } from "react"
import { orderService } from "../services/order"

export function OrderCheckout2() {
    const { stayId } = useParams()
    const [searchParams] = useSearchParams()
    const [orderToEdit, setOrderToEdit] = useState(orderService.getEmptyOrder())
    

    useEffect(() => {
        const order = orderService.getOrderToEditFromSearchParams(searchParams)
        setOrderToEdit({ ...order, stayId })
    }, [searchParams, stayId])

    async function onAddOrder() {
        if (!orderToEdit.startDate || !orderToEdit.endDate) return alert('All fields are required')

        try {
            await addOrder(orderToEdit)
            showSuccessMsg('Order added')
            setOrderToEdit(orderService.getEmptyOrder())
        } catch (err) {
            showErrorMsg('Cannot add order')
        }
    }

    return (

        <div>
            <h1>Checkout</h1>
            <h2>stayId: {orderToEdit.stayId}</h2>
            <h2> startDate: {orderToEdit.startDate}</h2>
            <h2>endDate: {orderToEdit.endDate}</h2>
            <h2>totalPrice: {orderToEdit.totalPrice}</h2>
            <button onClick={onAddOrder}>Add Order</button>
        </div>
    )
}