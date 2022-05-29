import * as types from '../type/index'
import {findIndex} from '../../hooks/index'

const initialState =[]

 /* const type = action.type - dispatch({ type, data }) */
const reducerTrademark = (state = initialState, action) => {

  const {type, payload} = action;  
  var temp=-1;

  switch (type) {
/* ========================= GET ALL ========================= */
    case types.FETCH_TRADEMARK:  
      state=payload  
      return [...state] 
/* ========================= ADD ========================= */
    case types.ADD_TRADEMARK:
      state.unshift(payload);
      return [...state]
/* ========================= UPDATE STATUS ========================= */
    case types.UPDATE_STATUS_TRADEMARK: 
       temp=findIndex(state,action.id)
       if(temp!==-1){
        state[temp].status=payload.status;
       }
      return [...state]
/* ========================= UPDATE ========================= */
    case types.UPDATE_TRADEMARK: 
      temp=findIndex(state,action.id)
      if(temp!==-1){
       state[temp].name=action.data.name;
      }
     return [...state]
/* ========================= DELETE ========================= */
    case types.DELETE_TRADEMARK:     
      temp=findIndex(state,action.id)
      if(temp!==-1){
         state.splice(temp,1);   
      }
      return [...state]
/* ========================= DOWN ========================= */
    case types.OPPOSITE_TRADEMARK:     
      state.reverse(); 
      return [...state]
/* ============================= SEARCH TRADEMARK ============================= */
    case types.SEARCH_TRADEMARK:  
      state=payload  
      return [...state] 
    default:
      return state
      
  }
}
export default reducerTrademark;
/* 
unshift thêm vào cuối mảng
splice(start,number) number số phần tử sẽ bị lại bỏ tính tử vị trí chỉ mục start
...state : copy state
reverse() được dùng để đảo ngược thứ tự của các phần tử trong mảng.
*/