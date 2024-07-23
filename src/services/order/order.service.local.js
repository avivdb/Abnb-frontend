import { storageService } from '../async-storage.service'
import { stayService } from '../stay'
// import { userService } from '../user'
import { saveToStorage, loadFromStorage } from '../util.service'

const STORAGE_KEY = 'stay_order_db'
_createOrders()

export const orderService = {
	query,
	getById,
	add,
	remove,
	getEmptyOrder,
	getOrderToEditFromSearchParams,

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

// async function add({ order, stay }) {
async function add (order) {
	const stay = await stayService.getById(order.stayId)
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

function getEmptyOrder() {
	return { startDate: '', endDate: '', totalPrice: 0 }
	// return { stayId:'', startDate: '', endDate: '', totalPrice: 0 }
}


function getOrderToEditFromSearchParams(searchParams) {
    const defaultOrderToEdit = getEmptyOrder()
    const orderToEdit = {}
    for (const field in defaultOrderToEdit) {
        orderToEdit[field] = searchParams.get(field) || ''
    }
    return orderToEdit
}


function _createOrders() {
	let orders
	if (loadFromStorage(STORAGE_KEY)) orders = loadFromStorage(STORAGE_KEY)
	else {
		orders = [
			{
				_id: 'o1225',
				hostId: { _id: 'u101', fullname: "Jessy Pinkman", imgUrl: "..." },
				guest: {
					_id: 'u101',
					fullname: 'Walter White',
				},
				totalPrice: 160,
				startDate: '2025-09-10',
				endDate: '2025-09-22',
				guests: {
					adults: 2,
					kids: 2,
				},
				stay: {
					// mini-stay
					_id: 'h101',
					name: 'Small Indian Treehouse',
					price: 80.0,
				},
				msgs: [], // host - guest chat
				status: 'pending', // approved / rejected
			},
			{
				_id: 'o1226',
				hostId: { _id: 'u102', fullname: "Hank Shrader", imgUrl: "..." },
				guest: {
					_id: 'u102',
					fullname: 'Skyler White',
				},
				totalPrice: 970,
				startDate: '2025-10-15',
				endDate: '2025-10-17',
				guests: {
					adults: 1,
					kids: 2,
				},
				stay: {
					// mini-stay
					_id: 'h102',
					name: 'Miami beach house ',
					price: 100.0,
				},
				msgs: [], // host - guest chat
				status: 'pending', // approved / rejected
			},
			{
				_id: 'o1227',
				hostId: { _id: 'u103', fullname: "Skyler White", imgUrl: "..." },
				guest: {
					_id: 'u103',
					fullname: 'Hank Shrader',
				},
				totalPrice: 160,
				startDate: '2025-08-21',
				endDate: '2025-08-29',
				guests: {
					adults: 1,
					kids: 2,
				},
				stay: {
					// mini-stay
					_id: 'h103',
					name: 'French Ski cabbin',
					price: 140.0,
				},
				msgs: [], // host - guest chat
				status: 'pending', // approved / rejected
			},
			{
				_id: 'o1228',
				hostId: { _id: 'u104', fullname: "Walter white", imgUrl: "..." },
				guest: {
					_id: 'u104',
					fullname: 'Jessy Pinkman',
				},
				totalPrice: 160,
				startDate: '2025-08-11',
				endDate: '2025-09-18',
				guests: {
					adults: 1,
					kids: 2,
				},
				stay: {
					// mini-stay
					_id: 'h104',
					name: 'New York loft',
					price: 80.0,
				},
				msgs: [], // host - guest chat
				status: 'pending', // approved / rejected
			},
		]
	}

	saveToStorage(STORAGE_KEY, orders)
}
