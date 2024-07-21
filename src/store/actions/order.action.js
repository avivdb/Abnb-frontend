import { orderService } from '../../services/order'

import { store } from '../store'
import { ADD_ORDER, REMOVE_ORDER, SET_ORDERS } from '../reducers/order.reducer'

export async function loadOrders() {
	try {
		const orders = await orderService.query()
		store.dispatch({ type: SET_ORDERS, orders })
	} catch (err) {
		console.log('OrderActions: err in loadOrders', err)
		throw err
	}
}

export async function addOrder({ order, stay}) {
	try {
		const addedOrder = await orderService.add({ order, stay })
		store.dispatch({ type: ADD_ORDER, order })
	} catch (err) {
		console.log('OrderActions: err in addOrder', err)
		throw err
	}
}

export async function removeOrder(orderId) {
	try {
		await orderService.remove(orderId)
		store.dispatch({ type: REMOVE_ORDER, orderId })
	} catch (err) {
		console.log('OrderActions: err in removeOrder', err)
		throw err
	}
}

