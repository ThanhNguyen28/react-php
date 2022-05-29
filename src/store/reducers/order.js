import * as types from '../type/index';

const initialState =[]

// const type = action.type  dispatch({ type, data })
const reducerOrder = (state = initialState, action) => {
  
  const {type, payload} = action;  
  
  switch (type) {
/* ========================= GET ALL : FETCH ========================= */
    case types.FETCH_ORDER:  
      state=payload   
      return [...state] 
    case types.ADD_ORDER:  
      state.push(payload);  
      return [...state] 
    case types.OPPOSITE_ORDER:     
      state.reverse(); 
      return [...state]
    default:
      return state
      
  }
}
export default reducerOrder;
/**
 * reverse() được dùng để đảo ngược thứ tự của các phần tử trong mảng.
 */