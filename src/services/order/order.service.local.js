import { storageService } from '../async-storage.service'
import { stayService } from '../stay'
// import { userService } from '../user'
import { saveToStorage, loadFromStorage } from '../util.service'

const STORAGE_KEY = 'stay_order_db'
_createOrders()

export const orderService = {
	query,
	getById,
	save,
	remove,
	getEmptyOrder,
	getOrderToEditFromSearchParams,
	setSearchParamsFromOrder,

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

async function save(order) {
	if (!order.stay || !order.stay._id) {
        throw new Error('Order must have a valid stay');
    }

	const stay = await stayService.getById(order.stay._id)
	let savedOrder

	if (order._id) {
		const orderToSave = {
			...order,
			// _id: order._id,
			hostId: stay.host._id,
			guest: order.guest || {
				_id: 'g106',
				fullname: 'Adi Sabban',
			},
			// totalPrice: order.totalPrice,
			// startDate: order.startDate,
			// endDate: order.endDate,
			// guests: order.guests || 2,
			stay: {
				_id: stay._id,
				name: stay.name,
				price: stay.price,
			},
			msgs: order.msgs || [], // host - guest chat
			status: order.status || 'pending', // approved / rejected
		}
		savedOrder = await storageService.put(STORAGE_KEY, orderToSave)
	} else {
		const orderToSave = {
			...order, 
			hostId: stay.host._id,
			guest: order.guest,
			// guest: { //user or mini user???
			// 	_id: userService.getLoggedinUser()._id,
			// 	fullname: userService.getLoggedinUser().fullname,
			// },
			guest: order.guest || {
				_id: 'g106',
				fullname: 'Adi Sabban',
			},
			// totalPrice: order.totalPrice,
			// startDate: order.startDate || stay.defaultCheckin.slice(0, 10),
			// endDate: order.endDate || stay.defaultCheckout.slice(0, 10),
			// guests: order.guests || 1,
			// guestCounts: {
			// 	adults: order.guestCounts?.adults || 1,
			// 	children: order.guestCounts?.children || 0,
			// 	infants: order.guestCounts?.infants || 0,
			// 	pets: order.guestCounts?.pets || 0
			// },
			stay: {
				// mini-stay
				_id: stay._id,
				name: stay.name,
				price: stay.price,
			},
			msgs: [], // host - guest chat
			status: 'pending', // approved / rejected
		}
		savedOrder = await storageService.post(STORAGE_KEY, orderToSave)
	}
	console.log('order- service:', savedOrder)
	return savedOrder
}

function getEmptyOrder() {
	return {
		totalPrice: 0,
		guestCounts: {
			adults: 1,
			children: 0,
			infants: 0,
			pets: 0
		},
		guests: 1
	}
}


function getOrderToEditFromSearchParams(searchParams) {
	const orderToEdit = {
		startDate: searchParams.get('startDate') || '',
		endDate: searchParams.get('endDate') || '',
		totalPrice: +searchParams.get('totalPrice') || 0,
		guests: +searchParams.get('guests') || 1,
		guestCounts: {
			adults: +searchParams.get('adults') || 1,
			children: +searchParams.get('children') || 0,
			infants: +searchParams.get('infants') || 0,
			pets: +searchParams.get('pets') || 0,
		}
	}
	return orderToEdit
}

function setSearchParamsFromOrder(orderToEdit) {
	const searchParams = new URLSearchParams()

	searchParams.set('startDate', orderToEdit.startDate)
	searchParams.set('endDate', orderToEdit.endDate)
	searchParams.set('totalPrice', orderToEdit.totalPrice.toString())
	searchParams.set('guests', orderToEdit.guests.toString())

	searchParams.set('adults', orderToEdit.guestCounts.adults.toString())
	searchParams.set('children', orderToEdit.guestCounts.children.toString())
	searchParams.set('infants', orderToEdit.guestCounts.infants.toString())
	searchParams.set('pets', orderToEdit.guestCounts.pets.toString())

	return searchParams
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
				totalPrice: 2767,
				startDate: '2025-09-10',
				endDate: '2025-09-22',
				guests: 3,
				guestCounts: {
					adults: 2,
					children: 1,
					infants: 0,
					pets: 0
				},
				stay: {
					// mini-stay
					_id: 's105',
					name: 'Seaside Cottage in Santorini',
					price: 180.0,
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
				totalPrice: 1407,
				startDate: '2025-10-15',
				endDate: '2025-10-17',
				guests: 3,
				guestCounts: {
					adults: 2,
					children: 1,
					infants: 0,
					pets: 0
				},
				stay: {
					// mini-stay
					_id: 's106',
					name: 'Mountain Chalet in Aspen ',
					price: 400.0,
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
				totalPrice: 3407,
				startDate: '2025-08-21',
				endDate: '2025-08-29',
				guests: 3,
				guestCounts: {
					adults: 2,
					children: 1,
					infants: 0,
					pets: 0
				},
				stay: {
					// mini-stay
					_id: 's107',
					name: 'Secluded Beachfront Villa in Takaka',
					price: 350.0,
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
				totalPrice: 4807,
				startDate: '2025-08-11',
				endDate: '2025-09-18',
				guests: 3,
				guestCounts: {
					adults: 2,
					children: 1,
					infants: 0,
					pets: 0
				},
				stay: {
					// mini-stay
					_id: 's108',
					name: 'Luxury Penthouse in Tel Aviv',
					price: 600.0,
				},
				msgs: [], // host - guest chat
				status: 'pending', // approved / rejected
			},
		]
	}

	saveToStorage(STORAGE_KEY, orders)
}
