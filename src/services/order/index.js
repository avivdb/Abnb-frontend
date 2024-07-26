const { DEV, VITE_LOCAL } = import.meta.env

import { orderService as local } from './order.service.local'
import { orderService as remote } from './order.service.remote'

function getEmptyOrder() {
	return {
		totalPrice: 0,
		guestCounts: {
			adults: 1,
			children: 0,
			infants: 0,
			pets: 0
		},
		capacity: 1
	}
}


function getOrderToEditFromSearchParams(searchParams) {
	const orderToEdit = {
		startDate: searchParams.get('startDate') || '',
		endDate: searchParams.get('endDate') || '',
		totalPrice: +searchParams.get('totalPrice') || 0,
		capacity: +searchParams.get('capacity') || 1,
		guestCounts: {
			adults: +searchParams.get('adults') || 1,
			children: +searchParams.get('children') || 0,
			infants: +searchParams.get('infants') || 0,
			pets: +searchParams.get('pets') || 0,
		}
	}
	return orderToEdit
}

export const service = VITE_LOCAL === 'true' ? local : remote
export const orderService = { getEmptyOrder, getOrderToEditFromSearchParams, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.orderService = orderService
