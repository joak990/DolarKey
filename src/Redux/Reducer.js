import { GET_DOLAR } from "./Types";

const initialState = {
    data: []
  };


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DOLAR: 
        return {
        ...state,
        data: action.payload
        } 
    
        default:
            return state
}}