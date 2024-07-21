import { storageService } from '../async-storage.service'
import { userService } from '../user'
import { saveToStorage, loadFromStorage } from '../util.service'

const STORAGE_KEY = 'stay_order_db'
_createOrders()

export const orderService = {
	query,
	getById,
	add,
	remove,
}

function query() {
	return storageService.query(STORAGE_KEY)
}

function getById(orderId) {
	return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
	await storageService.remove(STORAGE_KEY, orderId)
}

async function add({ order, stay }) {
	const orderToAdd = {
		hostId: stay.host._id,
		// guest: { //user or mini user???
		// 	_id: userService.getLoggedinUser()._id,
		// 	fullname: userService.getLoggedinUser().fullname,
		// },
		guest: {
			_id: 'g106',
			fullname: 'Adi Sabban',
		},
		totalPrice: order.totalPrice,
		startDate: order.startDate,
		endDate: order.endDate,
		// guests: order.guests,
		guests: 3,
		stay: {
			// mini-stay
			_id: stay._id,
			name: stay.name,
			price: stay.price,
		},
		msgs: [], // host - guest chat
		status: 'pending', // approved / rejected
	}

	const addedOrder = await storageService.post(STORAGE_KEY, orderToAdd)
	return addedOrder
}


function _createOrders() {
	let orders
	if (loadFromStorage(STORAGE_KEY)) orders = loadFromStorage(STORAGE_KEY)
	else {
		orders = [
			{
				_id: 'o1225',
				hostId: { _id: 'u102', fullname: "bob", imgUrl: "..." },
				guest: {
					_id: 'u101',
					fullname: 'User 1',
				},
				totalPrice: 160,
				startDate: '2025/10/15',
				endDate: '2025/10/17',
				guests: {
					adults: 1,
					kids: 2,
				},
				stay: {
					// mini-stay
					_id: 'h102',
					name: 'House Of Uncle My',
					price: 80.0,
				},
				msgs: [], // host - guest chat
				status: 'pending', // approved / rejected
			},
		]
	}

	saveToStorage(STORAGE_KEY, orders)
}
