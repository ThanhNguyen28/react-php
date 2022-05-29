import * as types from '../type/index'
import {findIndex} from '../../hooks/index'

const initialState =[]

const reducerCategory = (state = initialState, action) => {
 /* const type = action.type - dispatch({ type, data }) */
  const {type, payload} = action;  
  var temp=-1;
  switch (type) {
/* ========================= GET ALL ========================= */
    case types.FETCH_CATEGORY:  
      state=payload  
      return [...state] 
/* ========================= GET_BY ========================= */
    case types.GET_BY_CATEGORY:  
      state=payload  
      return [...state] 
/* ========================= ADD ========================= */
    case types.ADD_CATEGORY:
      state.push(payload);
      return [...state]
/* ========================= UPDATE STATUS ========================= */
    case types.UPDATE_STATUS_CATEGORY: 
       var id=action.payload[1].id
       temp=findIndex(state,id)
       if(temp!==-1){
        state[temp].status=action.payload[0].status;
       }
       return [...state]
/* ========================= UPDATE ========================= */
    case types.UPDATE_CATEGORY: 
      temp=findIndex(state,action.id)
      if(temp!==-1){
       state[temp].name=action.data.name;
      }
      return [...state]
/* ========================= DELETE ========================= */
    case types.DELETE_CATEGORY:     
      temp=findIndex(state,action.id)
      if(temp!==-1){
         state.splice(temp,1); //splice(start,number) number số phần tử sẽ bị lại bỏ tính tử vị trí chỉ mục start
      }
      return [...state]
/* ========================= OPPOSITE ========================= */
    case types.OPPOSITE_CATEGORY:     
      state.reverse(); // reverse() được dùng để đảo ngược thứ tự của các phần tử trong mảng.
      return [...state]
/* ============================= SEARCH CATEGORY ============================= */
    case types.SEARCH_CATEGORY: 
      state=payload  
      return [...state]
    default:
      return state
  }
}
export default reducerCategory;