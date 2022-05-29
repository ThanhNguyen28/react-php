import * as types from '../type/index';
import {findIndex} from '../../hooks/index';

const initialState =[]

/* const type = action.type  dispatch({ type, data }) */
const reducerProduct = (state = initialState, action) => {

  const {type, payload} = action;  
  var temp=-1;

  switch (type) {
/* ========================= GET ALL : FETCH ========================= */
    case types.FETCH_PRODUCT:  
      state=payload     
      return [...state]  
/* ========================= ADD ========================= */
    case types.ADD_PRODUCT:
      state.push(payload);
      return [...state]
/* ========================= UPDATE_STATUS ========================= */
    case types.UPDATE_STATUS_PRODUCT: 
       temp=findIndex(state,action.id)
       if(temp!==-1){
        state[temp].status=payload.status;
       }
      return [...state]
/* ========================= UPDATE ========================= */
      case types.UPDATE_PRODUCT:
      temp=findIndex(state,action.id)
      if(temp!==-1){
       state[temp].name=action.data.name;
      }
     return [...state]
/* ========================= DELETE ========================= */
    case types.DELETE_PRODUCT:     
      temp=findIndex(state,action.id)
      if(temp!==-1){
         state.splice(temp,1);
      }
      return [...state]
/* ========================= SEARCH ========================= */
    case types.SEARCH_PRODUCT: 
      state=payload  
      return [...state]
/* ========================= CATEGORY_PRODUCT ========================= */
    case types.CATEGORY_PRODUCT:
      return [...payload] 
/* ========================= PRICE_PRODUCT ========================= */
    case types.PRICE_PRODUCT: 
      return [...payload]
/* ========================= OPPOSITE ========================= */
    case types.OPPOSITE_PRODUCT:     
      state.reverse(); 
      return [...state]
    default:
      return state
      
  }
}
export default reducerProduct;
/* 
...state : copy state
reverse() được dùng để đảo ngược thứ tự của các phần tử trong mảng.
*/