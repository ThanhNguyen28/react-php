import * as types from '../type/index';
var findIndex=(cart,product)=>{
    var index=-1;
    if(cart.length > 0){
        for(let i=0;i<cart.length;i++){
            if(cart[i].product.id===product.id){
                index=i;
                break;
            }
        }
    }
    return index;
}
var data=JSON.parse(localStorage.getItem('CART'));
var initialState= data ? data : [];
var reducerCart =(state=initialState,action)=>{
    var {product,quantity,size}=action;
    var index=-1;
    switch (action.type) {
        case types.ADD_CART:
            index=findIndex(state,product);
            if(index!==-1){
                state[index].quantity+=quantity;
            }else{
                state.push({
                    product,
                    quantity,
                    size
                });
            }          
            localStorage.setItem('CART',JSON.stringify(state));
            return [...state]
        case types.DELETE_CART:
                index=findIndex(state,product);
                if(index!==-1){
                    state.splice(index,1);
                }       
                localStorage.setItem('CART',JSON.stringify(state));
                return [...state] 
        case types.UPDATE_CART:    
               index=findIndex(state,product);              
                if(index!==-1){
                    state[index].quantity=quantity;
                }                              
               localStorage.setItem('CART',JSON.stringify(state));
               return [...state] 
        case types.UPDATE_CART_SIZE:    
               index=findIndex(state,product);              
                if(index!==-1){
                    state[index].size=size;
                }                              
               localStorage.setItem('CART',JSON.stringify(state));
               return [...state] 
        case types.DELETE_CART_ALL: 
               let arr=[]
               state = arr
               return [...state];
        default:
            return state;
    }   
};
export default reducerCart;