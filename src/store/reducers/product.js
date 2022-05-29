import * as types from '../type/index';
const initialState =[]

var findIndex=(datas,id)=>{
  var tam=-1;
  datas.forEach((data,index) => {
    if(data.id===id){
        tam=index;
    }
  });
  return tam;
}
// const type = action.type  dispatch({ type, data })

const reducerProduct = (state = initialState, action) => {

  const {type, payload} = action;  
  var temp=-1;

  switch (type) {
/* ========================= GET ALL : FETCH ========================= */
    case types.FETCH_PRODUCT:  
      state=payload       // dan payload vao state
      return [...state]  // ...state : copy state
/* ========================= ADD ========================= */
    case types.ADD_PRODUCT:
      state.push(payload);
      return [...state]
/* ========================= UPDATE_STATUS ========================= */
    case types.UPDATE_STATUS_PRODUCT: 
       var id=action.payload[1].id
       temp=findIndex(state,id)
       if(temp!==-1){
        state[temp].status=action.payload[0].status;
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
/* ========================= DOWN ========================= */
    case types.OPPOSITE_PRODUCT:     
      state.reverse(); // reverse() được dùng để đảo ngược thứ tự của các phần tử trong mảng.
      return [...state]
    default:
      return state
      
  }
}
export default reducerProduct;