const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { stayService as local } from './stay.service.local'
import { stayService as remote } from './stay.service.remote'

function getEmptyStay() {
    return {
            name: "",
            type: "",
            imgUrls: [],
            price: 0,
            summary: "",
            capacity: 0,
            amenities: [],
            labels: [],
            host: {
                _id: "",
                fullname: "",
                imgUrl: ""
            },
            loc: {
                country: "",
                countryCode: "",
                city: "",
                address: "",
                lat: 0,
                lan: 0
            }
    }
}

function getDefaultFilter() {
    return {
        txt: '',
        checkIn: '',
        checkOut: '',
        guest: { adult: 0, chidren: 0, infant: 0, pet: 0, capacity: 0 },
        label: '',

    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const stayService = { getEmptyStay, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.stayService = stayService
