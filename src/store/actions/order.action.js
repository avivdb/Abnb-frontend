import { orderService } from '../../services/order'

import { store } from '../store'
import { ADD_ORDER, SET_ORDERS } from '../reducers/order.reducer'
// import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS } from '../reducers/order.reducer'

export async function loadOrders() {
	try {
		const orders = await orderService.query()
		store.dispatch({ type: SET_ORDERS, orders })
	} catch (err) {
		console.log('OrderActions: err in loadOrders', err)
		throw err
	}
}

// export async function saveOrder({ order, stay}) {
export async function addOrder(order) {
	try {
		const savedOrder = await orderService.save(order)
		store.dispatch({ type: ADD_ORDER, savedOrder })
	} catch (err) {
		console.log('OrderActions: err in saveOrder', err)
		throw err
	}
}

// export async function removeOrder(orderId) {
// 	try {
// 		await orderService.remove(orderId)
// 		store.dispatch({ type: REMOVE_ORDER, orderId })
// 	} catch (err) {
// 		console.log('OrderActions: err in removeOrder', err)
// 		throw err
// 	}
// }

