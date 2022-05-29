import { combineReducers } from 'redux'
import reducerTrademark from "./trademark"
import reducerProduct from "./product"
import reducerSize from "./size"
import reducerCategory from "./category"
import reducerUser from "./user"
import reducerCart from "./cart"
import reducerOrder from './order'
const rootReducer = combineReducers({
  trademark: reducerTrademark,
  product:reducerProduct,
  size:reducerSize,
  category:reducerCategory,
  user:reducerUser,
  cart:reducerCart,
  order:reducerOrder
})
export default rootReducer;
/*
Thông thường, ứng dụng sẽ có nhiều reducer nên bạn phải gộp tất cả reducer lại để bỏ vào trong store. 
sử dụng hàm combineReducer của redux để hợp nhất tất cả reducer thành 1 reducer là rootReducer
*/