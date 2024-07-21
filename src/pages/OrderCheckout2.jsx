import { useSearchParams } from "react-router-dom"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"
import { addOrder } from "../store/actions/order.action"
import { useEffect, useState } from "react"
import { orderService } from "../services/order"

export function OrderCheckout2() {
    const [searchParams] = useSearchParams()
    const [orderToEdit, setOrderToEdit] = useState(orderService.getEmptyOrder())
    

    useEffect(() => {
        const order = orderService.getOrderToEditFromSearchParams(searchParams);
        setOrderToEdit(order)
    }, [searchParams])


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
            <div>Checkout</div>
            <button onClick={onAddOrder}>Add Order</button>
        </div>
    )
}