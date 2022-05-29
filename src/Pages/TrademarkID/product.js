import { Link } from "react-router-dom"
import {useDispatch} from 'react-redux'
import {url} from '../../Api/api'
import * as ACTIONS from '../../store/actions/index'
import {formatPrice} from "../../hooks"
function Product(props) {
    const dispatch = useDispatch()
/* =============================== ADD CART =============================== */
    const onAddToCart = (product) => {
      dispatch(ACTIONS.addCart(product,1,35))
    }
/* =============================== Format Price =============================== */

    return ( 
        props.product &&
        props.product.map((item,index) => {
        return (
          <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={index}>
          <div className="card product-item border-0 mb-4">
            <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
              <img src={url+item.picture} height="300px" width="300px" alt={item.picture} />
            </div>
            <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
              <h6 className="text-truncate mb-3">{item.name}</h6>
              <div className="d-flex justify-content-center">
              {item.discount > 0 ? 
              <h6>{formatPrice.format(item.discount)}</h6> 
              : <h6>{formatPrice.format(item.price)}</h6>} 
              {item.discount > 0 &&
              <h6 className="text-muted ml-2"><del>{formatPrice.format(item.price)}</del></h6>} 
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between bg-light border">
              <Link to={`/product-detail/${item.id}`} className="btn btn-sm text-dark p-0">
                  <i className="fas fa-eye text-primary mr-1" />View Detail
              </Link>
              <button className="btn btn-sm text-dark p-0" onClick={()=>onAddToCart(item)}>
                  <i className="fas fa-shopping-cart text-primary mr-1" />Add To Cart
              </button>
            </div>
          </div>
        </div>
        )}
        )
     );
}

export default Product;