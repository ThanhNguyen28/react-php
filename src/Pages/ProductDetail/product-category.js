import { useState ,useEffect} from "react";
import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import {getApi,url} from '../../Api/api';
import {formatPrice} from "../../hooks";
function ProductCategory(props) {

    const dispatch = useDispatch();
    const id=props
    const [products,setProducts] = useState([])
/* ============================ LOADING PRODUCT CATEGORY ============================ */
    useEffect(()=>{
      id.id > 0 &&
      getApi(`product/product-category/?id=${id.id}`).then((res)=>{
          setProducts(res.data);
      })
    },[id.id])
/* ============================ ADD CART ============================ */
    const onAddToCart=(product)=>{
      dispatch.addCart(product,1);
    }
  return (   
    <div className="row">
      <div className="text-center mb-4">
        <h2 className="section-title px-5"><span className="px-2">Shoes By Brand </span></h2>
      </div>
      <div className="col">
      <div className="row px-xl-5 pb-3">
          {  products && products.length>0 &&
             products.map((item,index)=>{
        return(
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1" key={index}>
              <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                  <img src={url+item.picture} height="300px" width="300px" alt={item.picture} />
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                  <h6 className="text-truncate mb-3">{item.name}</h6>
                  <div className="d-flex justify-content-center">
                    <h6>{formatPrice.format(item.price)}</h6><h6 className="text-muted ml-2"><del></del></h6>
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
            </div>)
        })     
        }
      </div>
    </div>
  </div>
  );
}

export default ProductCategory;