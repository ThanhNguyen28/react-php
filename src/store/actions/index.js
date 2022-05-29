// import { getApi } from "../../Api/api";
import * as Types from "../type/index"

// dispatch la 1 ham
/* ============================================ PRODUCT ============================================ */
export const getProduct = (data) => {
    return (dispatch) => { dispatch({ type: Types.FETCH_PRODUCT,payload: data}) }
};
export const createProduct = (data) => {
    return (dispatch) => { dispatch({ type: Types.ADD_PRODUCT, payload:data}) }
};
export const updateProduct = (data,id) => {
    return (dispatch) => { dispatch({ type: Types.UPDATE_PRODUCT, data,id}) }
};
export const updateStatusProduct = (payload) => {
    return (dispatch) => { dispatch({ type: Types.UPDATE_STATUS_PRODUCT, payload}) }
};
export const deleteProduct= (id) => {
    return (dispatch) => { dispatch({ type: Types.DELETE_PRODUCT, id}) }
};
export const searchProduct = (data) => {
    return (dispatch) => { dispatch({ type: Types.SEARCH_PRODUCT, payload:data}) }
};
export const oppositeProduct = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_PRODUCT}) }
};
export const getPrice = (price) => {
    return (dispatch) => { dispatch({ type: Types.PRICE_PRODUCT,payload:price}) }
};

/* ============================================ PRODUCT ============================================ */

/* ============================================ TRADEMARK ============================================ */
export const getTrademark = (data) => {
    return (dispatch) => { dispatch({ type: Types.FETCH_TRADEMARK,payload: data}) }
};
export const createTrademark = (data) => {
    return (dispatch) => { dispatch({ type: Types.ADD_TRADEMARK, payload:data}) }
};
export const updateTrademark = (data,id) => {
    return (dispatch) => { dispatch({ type: Types.UPDATE_TRADEMARK, data,id}) }
};
export const updateStatusTrademark = (payload) => {
    return (dispatch) => { dispatch({ type: Types.UPDATE_STATUS_TRADEMARK, payload}) }
};
export const deleteTrademark = (id) => {
    return (dispatch) => { dispatch({ type: Types.DELETE_TRADEMARK, id}) }
};
export const searchTrademark = (data) => {
    return (dispatch) => { dispatch({ type: Types.SEARCH_TRADEMARK, payload:data}) }
};
export const oppositeTrademark = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_TRADEMARK}) }
};

/* ============================================ TRADEMARK ============================================ */

/* ============================================ USER ============================================ */

export const getUser = (data) => {
    return (dispatch) => { dispatch({ type: Types.FETCH_USER,payload: data}) }
};
export const createUser = (data) => {
    return (dispatch) => { dispatch({ type: Types.ADD_USER, payload:data}) }
};
export const updateUser = (data,id) => {
    return (dispatch) => { dispatch({ type: Types.UPDATE_USER, data,id}) }
};
export const updateStatusUser = (payload) => {
    return (dispatch) => { dispatch({ type: Types.UPDATE_STATUS_USER, payload}) }
};
export const deleteUser = (id) => {
    return (dispatch) => { dispatch({ type: Types.DELETE_USER, id}) }
};
export const searchUser = (data) => {
    return (dispatch) => { dispatch({ type: Types.SEARCH_USER, payload:data}) }
};
export const oppositeUser = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_USER}) }
};

/* ============================================ USER ============================================ */



/* ============================================ CATEGORY ============================================ */

export const getCategory = (data) => {
    return (dispatch) => { dispatch({ type: Types.FETCH_CATEGORY,payload: data}) }
};
export const createCategory = (data) => {
    return (dispatch) => { dispatch({ type: Types.ADD_CATEGORY, payload:data}) }
};
export const updateCategory = (data,id) => {
    return (dispatch) => { dispatch({ type: Types.UPDATE_CATEGORY, data,id}) }
};
export const updateStatusCategory = (payload) => {
    return (dispatch) => { dispatch({ type: Types.UPDATE_STATUS_CATEGORY, payload}) }
};
export const deleteCategory = (id) => {
    return (dispatch) => { dispatch({ type: Types.DELETE_CATEGORY, id}) }
};
export const getByCategory = (data) => {
    return (dispatch) => { dispatch({ type: Types.GET_BY_CATEGORY, payload:data}) }
};
export const searchCategory = (data) => {
    return (dispatch) => { dispatch({ type: Types.SEARCH_CATEGORY, payload:data}) }
};
export const oppositeCategory = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_CATEGORY}) }
};

/* ============================================ CATEGORY ============================================ */

/* ============================================ SIZE ============================================ */

export const getSize = (data) => {
    return (dispatch) => { dispatch({ type: Types.FETCH_SIZE,payload: data}) }
};
export const createSize= (data) => {
    return (dispatch) => { dispatch({ type: Types.ADD_SIZE, payload:data}) }
};

export const deleteSize = (id) => {
    return (dispatch) => { dispatch({ type: Types.DELETE_SIZE, id}) }
};
export const searchSize = (data) => {
    return (dispatch) => { dispatch({ type: Types.SEARCH_SIZE, payload:data}) }
};
export const oppositeSize = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_SIZE}) }
};

/* ============================================ SIZE ============================================ */

/* ============================================ CART ============================================ */

export const addCart = (product,quantity,size) => {
    return (dispatch) => { dispatch({ type: Types.ADD_CART, product, quantity,size }) }
}

export const deleteCart=(product)=>{
    return (dispatch) => { dispatch({ type: Types.DELETE_CART, product }) }
}

export const updateCart=(product,quantity)=>{
    return (dispatch) => { dispatch({ type: Types.UPDATE_CART, product, quantity }) }
}

export const updateCartSize=(product,size)=>{
    return (dispatch) => { dispatch({ type: Types.UPDATE_CART_SIZE, product, size }) }
}

/* ============================================ CART ============================================ */
/* ============================================ ORDER ============================================ */

export const getOrder = (data) => {
    return (dispatch) => { dispatch({ type: Types.FETCH_ORDER,payload: data}) }
};
export const oppositeOrder = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_ORDER}) }
};

/* ============================================ ORDER ============================================ */

// export const getSeachMovies = (keywords) => async dispatch => {
//   try {    
//     const result = await axios.get(
//       `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&include_adult=false&query=${keywords}` 
//     )
//     dispatch({type: Types.GET_SEARCH_MOVIES, payload: result.data.results})
//   } catch (error) {
//     console.log("Get search movies error: ", error);
//   }
// }
/*
Các Action: Khi ta định nghĩa các action, ta khai báo các tên của hành động trong ứng dụng. 
Lấy ví dụ ta có 1 state là counter và cần 2 phương thức để tăng và giảm giá trị của counter. 
Lúc này ta định nghĩa 2 action có tên là 'tăng' và 'giảm' và chỉ vậy thôi
 */
