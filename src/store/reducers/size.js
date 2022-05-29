import * as types from '../type/index'
import {findIndex} from '../../hooks/index'

const initialState =[]

 /* const type = action.type - dispatch({ type, data }) */

const reducerSize = (state = initialState, action) => {

  const {type, payload} = action;  
  var temp=-1;
  
  switch (type) {
/* ============================= GET ALL : FETCH ============================= */
    case types.FETCH_SIZE:  
      state=payload  
      return [...state] 
/* ============================= SEARCH THEGROUP ============================= */
    case types.SEARCH_SIZE:  
      state=payload  
      return [...state] 
/* ============================= ADD ============================= */
    case types.ADD_SIZE:
      state.unshift(payload);
      return [...state]
/* ========================= DELETE ========================= */
    case types.DELETE_SIZE:     
      temp=findIndex(state,action.id)
      if(temp!==-1){
         state.splice(temp,1); 
      }
      return [...state]
/* ========================= OPPOSITE ========================= */
    case types.OPPOSITE_SIZE:     
      state.reverse(); 
      return [...state]
    default:
      return state
  }
}
export default reducerSize;
/* 
unshift thêm vào cuối mảng
splice(start,number) number số phần tử sẽ bị lại bỏ tính tử vị trí chỉ mục start
...state : copy state
reverse() được dùng để đảo ngược thứ tự của các phần tử trong mảng.
*/