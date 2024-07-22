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

// async function save({ order, stay }) {
async function save(order) {
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
		startDate: order.startDate || stay.defaultCheckin.slice(0, 10),
		endDate: order.endDate || stay.defaultCheckout.slice(0, 10),
		guests: order.guests || 1,
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

	const addedOrder = await storageService.post(STORAGE_KEY, orderToAdd)
	return addedOrder
}

function getEmptyOrder() {
    return { 
        // startDate: '', 
        // endDate: '', 
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


// function getOrderToEditFromSearchParams(searchParams) {
//     const defaultOrderToEdit = getEmptyOrder()
//     const orderToEdit = {}
//     for (const field in defaultOrderToEdit) {
//         orderToEdit[field] = searchParams.get(field) || ''
//     }
//     return orderToEdit
// }

// function getOrderToEditFromSearchParams(searchParams) {
//     const defaultOrderToEdit = getEmptyOrder()
//     const orderToEdit = { ...defaultOrderToEdit }
//     for (const field in defaultOrderToEdit) {
//         orderToEdit[field] = searchParams.get(field) || defaultOrderToEdit[field]
//     }
//     return orderToEdit
// }

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
				hostId: { _id: 'u102', fullname: "bob", imgUrl: "..." },
				guest: {
					_id: 'u101',
					fullname: 'User 1',
				},
				totalPrice: 160,
				startDate: '2025/10/15',
				endDate: '2025/10/17',
				guests: 3,
				guestCounts: {
					adults: 2,
					children: 1,
					infants: 0,
                    pets: 0
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
