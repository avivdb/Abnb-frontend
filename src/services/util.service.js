export function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

export function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


export function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

export function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func(...args) }, timeout)
    }
}

export function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function getRandomDate() {
    const dates = ["Jan 21-25", "May 7-12", "Sep 2-6", "Jul 22-29", "Aug 10-15", "Oct 15-21", "Feb 1-7", "Jun 14-23", "Nov 22-25", "Mar 24-30", "Jul 10-17", "Jul 28-30"]
    return dates[getRandomIntInclusive(0, dates.length)]
}

export function getRandomDistance() {
    const randomNumber = getRandomIntInclusive(1000, 9000)
    return [randomNumber.toLocaleString()]
}

export function getMonthName(month) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[month]

}

export function getGuestsTitle(filterToEdit) {
    const { adult = 0, children = 0, infant = 0, pet = 0 } = filterToEdit.guest || {};
    const numGuest = adult + children;

    const guestStr = numGuest === 1 ? 'guest' : 'guests';
    const infantStr = infant === 1 ? 'infant' : 'infants';
    const petStr = pet === 1 ? 'pet' : 'pets';

    let title = numGuest > 0 ? `${numGuest} ${guestStr}` : 'Add guests';
    if (infant > 0) {
        title += `, ${infant} ${infantStr}`;
    }
    if (pet > 0) {
        title += `, ${pet} ${petStr}`;
    }

    return title || 'Add guests';
}


export function getParams(obj) {
    const params = new URLSearchParams(
        Object.keys(obj).reduce((acc, key) => {
            const value = obj[key];
            if (typeof value === 'object' && value !== null) {
                Object.keys(value).forEach(subKey => {
                    acc[subKey] = value[subKey] || '';
                });
            } else if (value instanceof Date) {
                acc[key] = value.toDateString() || '';
            } else {
                acc[key] = value || '';
            }
            return acc;
        }, {})
    ).toString();

    return params;

}