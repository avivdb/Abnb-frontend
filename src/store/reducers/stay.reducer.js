import { stayService } from "../../services/stay";

export const SET_STAYS = 'SET_STAYS';
export const SET_STAY = 'SET_STAY';
export const REMOVE_STAY = 'REMOVE_STAY';
export const ADD_STAY = 'ADD_STAY';
export const UPDATE_STAY = 'UPDATE_STAY';
export const ADD_STAY_MSG = 'ADD_STAY_MSG';
export const SET_FILTER_BY = 'SET_FILTER_BY';

const initialState = {
    stays: [],
    filterBy: stayService.getDefaultFilter(),
};

export function stayReducer(state = initialState, action) {
    var newState = state;
    var stays;
    switch (action.type) {
        case SET_STAYS:
            newState = { ...state, stays: action.stays };
            break;
        case SET_STAY:
            newState = { ...state, stay: action.stay };
            break;
        case REMOVE_STAY:
            const lastRemovedStay = state.stays.find(stay => stay._id === action.stayId);
            stays = state.stays.filter(stay => stay._id !== action.stayId);
            newState = { ...state, stays, lastRemovedStay };
            break;
        case ADD_STAY:
            newState = { ...state, stays: [...state.stays, action.stay] };
            break;
        case UPDATE_STAY:
            stays = state.stays.map(stay => (stay._id === action.stay._id) ? action.stay : stay);
            newState = { ...state, stays };
            break;
        case ADD_STAY_MSG:
            newState = { ...state, stay: { ...state.stay, msgs: [...state.stay.msgs || [], action.msg] } };
            break;
        case SET_FILTER_BY:
            newState = {
                ...state,
                filterBy: { ...state.filterBy, ...action.filterBy },
            };
            break;
        default:
    }
    return newState;
}
