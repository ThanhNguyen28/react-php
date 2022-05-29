import * as types from '../type/index'
import {findIndex} from '../../hooks/index'

const initialState =[]

 /* const type = action.type - dispatch({ type, data }) */

const reducerUser = (state = initialState, action) => {
  
  const {type,payload} = action;  

  var temp=-1;
  switch (type) {
/* ========================= GET ALL ========================= */
    case types.FETCH_USER:  
      state=payload 
      return [...state]  
/* ========================= ADD ========================= */
    case types.ADD_USER:
      state.push(payload);
      return [...state]
/* ========================= UPDATE STATUS ========================= */
    case types.UPDATE_STATUS_USER: 
       temp=findIndex(state,action.id)
       if(temp!==-1){
        state[temp].status=payload.status;
       }
       return [...state]
/* ========================= UPDATE ========================= */
    case types.UPDATE_USER: 
      temp=findIndex(state,action.id)
      if(temp!==-1){
       state[temp].name=action.data.name;
      }
      return [...state]
/* ========================= DELETE ========================= */
    case types.DELETE_USER:     
      temp=findIndex(state,action.id)
      if(temp!==-1){
         state.splice(temp,1);
      }
      return [...state]
/* ========================= OPPOSITE ========================= */
    case types.OPPOSITE_USER:     
      state.reverse(); 
      return [...state]
/* ============================= SEARCH USER ============================= */
    case types.SEARCH_USER:  
      state=payload  
      return [...state] 
    default:
      return state
      
  }
}
export default reducerUser
/*
unshift thêm vào cuối mảng
splice(start,number) number số phần tử sẽ bị lại bỏ tính tử vị trí chỉ mục start
...state : copy state
reverse() được dùng để đảo ngược thứ tự của các phần tử trong mảng.
*/