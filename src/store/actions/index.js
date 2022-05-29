import { getApi, postApi, putApi, deleteApi } from "../../Api/api";
import * as Types from "../type/index"

/* ============================================ PRODUCT ============================================ */

/* get all product */
export const getProduct = () => {
    return (dispatch) => {
        getApi("product/index").then((result) =>{
          return dispatch({ type: Types.FETCH_PRODUCT, payload: result })
        })
    }
};
/* create product */
export const createProduct = (data) => {
    return (dispatch) => { dispatch({ type: Types.ADD_PRODUCT, payload: data }) }
};
/* update product */
export const updateProduct = (data,id) => {
    return (dispatch) => {
        putApi(`product/update/?id=${id}`,data)
        return dispatch({ type: Types.UPDATE_PRODUCT, data, id })
    }
};
/* update status product */
export const updateStatusProduct = (data,id) => {
    return (dispatch) => {
        putApi(`product/update/?id=${id}`,data)
        return dispatch({ type: Types.UPDATE_STATUS_PRODUCT,payload: data, id })
    }
};
/* delete product */
export const deleteProduct= (id) => {
    return (dispatch) => {
        deleteApi(`product/delete/?id=${id}`)
        return dispatch({ type: Types.DELETE_PRODUCT, id })
    }
};
/* search product */
export const searchProduct = (keywords) => {
    return (dispatch) => {
        postApi('product/search',keywords).then((result) =>{
            return dispatch({ type: Types.SEARCH_PRODUCT, payload: result })
        })
    }
};
/* opposite product */
export const oppositeProduct = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_PRODUCT }) }
};
/* get price product */
export const getPrice = (price) => {
    return (dispatch) => {
        postApi(`product/product-price/?id=${price}`).then((result) =>{
          return dispatch({ type: Types.PRICE_PRODUCT, payload: result })
        })
    }
};
/* get product category */
export const getProductCategory= (id) => {
    return (dispatch) => {
        getApi(`product/all-product-category/?id=${id}`).then((result)=>{
            return dispatch({ type: Types.CATEGORY_PRODUCT, payload: result })
        })
    }
};

/* ============================================ PRODUCT ============================================ */

/* ============================================ TRADEMARK ============================================ */

/* get all trademark */
export const getTrademark = () => {
    return (dispatch) => {
        getApi("trademark/index").then((result) =>{
          return dispatch({ type: Types.FETCH_TRADEMARK, payload: result})
        })
    }
};
/* create trademark */
export const createTrademark = (data) => {
    return (dispatch) => {
        postApi("trademark/create",data).then((result)=>{
            let id = Number(result)
            return dispatch({ type: Types.ADD_TRADEMARK, payload: {id:id,name:data.name,status:1}})
        })
    }
};
/* update trademark */
export const updateTrademark = (data,id) => {
    return (dispatch) => {
        putApi(`trademark/update/?id=${id}`,data)
        return dispatch({ type: Types.UPDATE_TRADEMARK, data, id })
    }
};
/* update status trademark */
export const updateStatusTrademark = (data,id) => {
    return (dispatch) => {
        putApi(`trademark/update/?id=${id}`,data)
        return dispatch({ type: Types.UPDATE_STATUS_TRADEMARK, payload: data, id })
    }
};
/* delete trademark */
export const deleteTrademark = (id) => {
    return (dispatch) => {
        deleteApi(`trademark/delete/?id=${id}`)
        return dispatch({ type: Types.DELETE_TRADEMARK, id })
    }
};
/* search trademark */
export const searchTrademark = (keywords) => {
    return (dispatch) => {
        postApi('trademark/search',keywords).then((result) =>{
          return dispatch({ type: Types.SEARCH_TRADEMARK, payload: result })
        })
    }
};
/* opposite trademark */
export const oppositeTrademark = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_TRADEMARK}) }
};

/* ============================================ TRADEMARK ============================================ */

/* ============================================ USER ============================================ */

/* get all user */
export const getUser = () => {
    return (dispatch) => {
        getApi("user/index").then((result) =>{
          return dispatch({ type: Types.FETCH_USER, payload: result })
        })
    }
};
/* create user */
export const createUser = (data) => {
    return (dispatch) => {
        postApi("user/create",data)
        return dispatch({ type: Types.ADD_USER, payload: data })
    }
};
/* update user */
export const updateUser = (data,id) => {
    return (dispatch) => {
        putApi(`user/update/?id=${id}`,data)
        return dispatch({ type: Types.UPDATE_USER, data, id })
    }
};
/* update status user */
export const updateStatusUser = (data,id) => {
    return (dispatch) => {
        putApi(`user/update/?id=${id}`,data)
        return dispatch({ type: Types.UPDATE_STATUS_USER, payload: data, id  })
    }
};
/* delete user */
export const deleteUser = (id) => {
    return (dispatch) => {
        deleteApi(`user/delete/?id=${id}`)
        return dispatch({ type: Types.DELETE_USER, id })
    }
};
/* search user */
export const searchUser = (keywords) => {
    return (dispatch) => {
        postApi('user/search',keywords).then((result) =>{
            return dispatch({ type: Types.SEARCH_USER, payload: result}) 
        })
    }
};
/* opposite user */
export const oppositeUser = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_USER }) }
};

/* ============================================ USER ============================================ */

/* ============================================ SIZE ============================================ */

/* get all size */
export const getSize = () => {
    return (dispatch) => {
        getApi("size/index").then((result) =>{
          return dispatch({ type: Types.FETCH_SIZE, payload: result })
        })
    }
};
/* create size */
export const createSize= (data) => {
    return (dispatch) => {
        postApi("size/create", data).then((result)=>{
            let id = Number(result)
            return dispatch({ type: Types.ADD_SIZE, payload: {id:id,name:data.name} })
        })
    }
};
/* delete size */
export const deleteSize = (id) => {
    return (dispatch) => {
        deleteApi(`size/delete/?id=${id}`)
        return dispatch({ type: Types.DELETE_SIZE, id })   
    }
};
/* search size */
export const searchSize = (keywords) => {
    return (dispatch) => {
        postApi("size/search", keywords).then((result) =>{
          return dispatch({ type: Types.SEARCH_SIZE, payload: result}) 
        })
    }
};
/* opposite size */
export const oppositeSize = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_SIZE }) }
};

/* ============================================ SIZE ============================================ */

/* ============================================ CART ============================================ */

export const addCart = (product,quantity,size) => {
    return (dispatch) => { dispatch({ type: Types.ADD_CART, product, quantity, size }) }
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

export const deleteCartAll = () => {
    return (dispatch) => { dispatch({type: Types.DELETE_CART_ALL }) }
}

/* ============================================ CART ============================================ */
/* ============================================ ORDER ============================================ */

/* get all order */
export const getOrder = () => {
    return (dispatch) => {
        getApi("order/index").then((result) =>{
          return dispatch({ type: Types.FETCH_ORDER, payload: result })
        })
    }
};
/* create size */
export const createOrder= (data) => {
    return (dispatch) => {
        dispatch({ type: Types.ADD_ORDER, payload: data })  
    }
};
/* get order status */
export const getOrderStatus = (value) => {
    return (dispatch) => {
        getApi(`order/status/?id=${value}`).then((result) => {
          return dispatch({ type: Types.FETCH_ORDER, payload: result })
        })
    }
};
/* get order date */
export const getOrderDate = (value) => {
    return (dispatch) => {
        getApi(`order/date/?id=${value}`).then((result) => {
          return dispatch({ type: Types.FETCH_ORDER, payload: result })
        })
    }
};
/* opposite order */
export const oppositeOrder = () => {
    return (dispatch) => { dispatch({ type: Types.OPPOSITE_ORDER }) }
};

/* ============================================ ORDER ============================================ */

/*
 * Các Action: Khi ta định nghĩa các action, ta khai báo các tên của hành động trong ứng dụng. 
 * dispatch la 1 ham
 */
