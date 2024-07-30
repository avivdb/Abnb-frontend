import { storageService } from '../async-storage.service'
import { stayService } from '../stay'
import { userService } from '../user'
// import { userService } from '../user'
import { saveToStorage, loadFromStorage } from '../util.service'

const STORAGE_KEY = 'stay_order_db'
_createOrders()

export const orderService = {
	query,
	getById,
	save,
	remove,
	// getEmptyOrder,
	// getOrderToEditFromSearchParams,
	// setSearchParamsFromOrder,

}

// async function query() {
// 	return await storageService.query(STORAGE_KEY)
// }
async function query(filterBy = {}) {
    const orders = await storageService.query(STORAGE_KEY)
    if (filterBy.guestId) {
        return orders.filter(order => order.guest._id === filterBy.guestId)
    }
    if (filterBy.hostId) {
        return orders.filter(order => order.host._id === filterBy.hostId)
    }
    return orders
}

async function getById(orderId) {
	return await storageService.get(STORAGE_KEY, orderId)
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
			_id: order._id,
			status: order.status 
		}
		savedOrder = await storageService.put(STORAGE_KEY, orderToSave)
	} else {
		const orderToSave = {
			host: {
				_id: stay.host._id,
				fullname: stay.host.fullname,
				pictureUrl: stay.host.pictureUrl,
				years: stay.host.years
			},
			guest: { //user or mini user???
				_id: userService.getLoggedinUser()._id,
				fullname: userService.getLoggedinUser().fullname,
			},
			totalPrice: order.totalPrice,
			startDate: order.startDate || stay.defaultCheckin.slice(0, 10),
			endDate: order.endDate || stay.defaultCheckout.slice(0, 10),
			capacity: order.capacity || 1,
			guestCounts: {
				adults: order.guestCounts?.adults || 1,
				children: order.guestCounts?.children || 0,
				infants: order.guestCounts?.infants || 0,
				pets: order.guestCounts?.pets || 0
			},
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

// function getEmptyOrder() {
// 	return {
// 		totalPrice: 0,
// 		guestCounts: {
// 			adults: 1,
// 			children: 0,
// 			infants: 0,
// 			pets: 0
// 		},
// 		capacity: 1
// 	}
// }


// function getOrderToEditFromSearchParams(searchParams) {
// 	const orderToEdit = {
// 		startDate: searchParams.get('startDate') || '',
// 		endDate: searchParams.get('endDate') || '',
// 		totalPrice: +searchParams.get('totalPrice') || 0,
// 		capacity: +searchParams.get('capacity') || 1,
// 		guestCounts: {
// 			adults: +searchParams.get('adults') || 1,
// 			children: +searchParams.get('children') || 0,
// 			infants: +searchParams.get('infants') || 0,
// 			pets: +searchParams.get('pets') || 0,
// 		}
// 	}
// 	return orderToEdit
// }

// function setSearchParamsFromOrder(orderToEdit) {
// 	const searchParams = new URLSearchParams()

// 	searchParams.set('startDate', orderToEdit.startDate)
// 	searchParams.set('endDate', orderToEdit.endDate)
// 	searchParams.set('totalPrice', orderToEdit.totalPrice.toString())
// 	searchParams.set('capacity', orderToEdit.capacity.toString())

// 	searchParams.set('adults', orderToEdit.guestCounts.adults.toString())
// 	searchParams.set('children', orderToEdit.guestCounts.children.toString())
// 	searchParams.set('infants', orderToEdit.guestCounts.infants.toString())
// 	searchParams.set('pets', orderToEdit.guestCounts.pets.toString())

// 	return searchParams
// }

function _createOrders() {
	let orders
	if (loadFromStorage(STORAGE_KEY)) orders = loadFromStorage(STORAGE_KEY)
	else {
		orders = [
			{
				_id: 'o1225',
				host: { _id: 'u101', fullname: "Jessy Pinkman", pictureUrl: "...", years: 3 },
				guest: {
					_id: 'u101',
					fullname: 'Walter White',
				},
				totalPrice: 2767,
				startDate: '12-09-2024',
				endDate: '15-09-2024',
				capacity: 3,
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
				host: { _id: 'u102', fullname: "Hank Shrader", pictureUrl: "...", years: 2},
				guest: {
					_id: 'u102',
					fullname: 'Skyler White',
				},
				totalPrice: 1407,
				startDate: '10-08-2024',
				endDate: '17-09-2024',
				capacity: 3,
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
				host: { _id: 'u103', fullname: "Skyler White", pictureUrl: "...", years: 5},
				guest: {
					_id: 'u103',
					fullname: 'Hank Shrader',
				},
				totalPrice: 3407,
				startDate: '21-08-2024',
				endDate: '29-08-2024',
				capacity: 3,
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
				host: { _id: 'u104', fullname: "Walter white", pictureUrl: "...", years: 4 },
				guest: {
					_id: 'u104',
					fullname: 'Jessy Pinkman',
				},
				totalPrice: 4807,
				startDate: '11-08-2024',
				endDate: '18-09-2024',
				capacity: 3,
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
