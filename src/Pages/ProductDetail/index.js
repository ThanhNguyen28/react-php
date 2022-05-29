import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {getApi,url} from '../../Api/api'
import ProductCategory from './product-category';
import {useDispatch} from 'react-redux'
import * as ACTIONS from '../../store/actions/index'

import {formatPrice} from '../../hooks'
function ProductDetail() {

    const { id } = useParams();
    const [product,setProduct]=useState({})
    const [quantity,setQuantity]=useState(1)
    const dispatch = useDispatch();
    const [arraySize,setArraySize]=useState();
    const [size,setSize]=useState(0);
/* ======================================== PRODUCT DETAIL ======================================== */ 
    useEffect(()=>{
      getApi(`product/product-detail/?id=${id}`).then((res)=>{
        setProduct(res);
      })
    },[id])
/* ======================================== GIẢM ======================================== */
    const handleReduction = () =>{
      quantity!==0 &&
      setQuantity(quantity-1)
    }
/* ======================================== TĂNG ======================================== */
 
    const handleIncrease = () =>{
      quantity < 10 &&
      setQuantity(quantity+1)
    }
/* ======================================== ADD CART ======================================== */

    const onAddToCart=(product)=>{
      size===0 ? alert("Bạn Chưa Chọn Size") :
      dispatch(ACTIONS.addCart(product,quantity,size));
    }
/* ======================================== ADD CART ======================================== */
/* ======================================== LOADING SIZE ======================================== */
    useEffect(() => {
        getApi(`product-size/?id=${id}`).then((res) =>{
          setArraySize(res)
          })
    }, [id]);
/* ======================================== CHOOSE SIZE ======================================== */  
   const handleSize = (size) => {
    setSize(size);
   }

    return (  
    <div className="container" style={styles.container}>
        <div className="row">
          <div className="col-lg-5">
            <div id="product-carousel" className="carousel slide" data-ride="carousel">
              <div className="carousel-inner border">
                <div className="carousel-item active">
                  <img className="w-100 h-100" src={url+product.picture} alt={product.picture} />
                </div>
                 {/* <div className="carousel-item">
                  <img className="w-100 h-100" src="img/product-2.jpg" alt="product-2" />
                </div>  */}
              </div>
              <a className="carousel-control-prev" href="#product-carousel" data-slide="prev">
                <i className="fa fa-2x fa-angle-left text-dark" />
              </a>
              <a className="carousel-control-next" href="#product-carousel" data-slide="next">
                <i className="fa fa-2x fa-angle-right text-dark" />
              </a>
            </div>
          </div>
          <div className="col-lg-7 pb-5">
            <h3 className="font-weight-semi-bold">{product.name}</h3>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                {/* <small className="fas fa-star" />
                <small className="fas fa-star-half-alt" /> */}
              </div>
              {/* <small className="pt-1">{(50 Reviews)}</small> */}
            </div>
            {product.discount > 0 ? 
            <h3 className="font-weight-semi-bold mb-4">{formatPrice.format(product.discount)}</h3>
              :<h3 className="font-weight-semi-bold mb-4">{formatPrice.format(product.price)}</h3>} 
              {product.discount > 0 &&
              <h3 className="text-muted ml-2"><del>{formatPrice.format(product.price)}</del></h3>} 
              
            <p className="mb-4">
            - Vận chuyển toàn quốc [ Kiểm Tra Hàng Trước Khi Thanh Toán ]<br/>

            - 100% Ảnh chụp trực tiếp tại cửu hàng <br/>

            - Đổi Trả 7 Ngày Không Kể Lí Do <br/>

            - Liên Hệ : 090 797 5485<br/>
            </p>
            <div className="d-flex mb-3">
              <p className="text-dark font-weight-medium mb-0 mr-3">Sizes:</p>
              {arraySize && arraySize.map((item,index)=>{
                return  (<button type="button" key={index} style={styles.button} 
                onClick={()=>handleSize(item.size)} 
                className="btn btn-outline-primary">{item.size}</button>)
              })
              }
            </div>
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3" style={{width: '130px',margin:'10px'}}>
                <div className="input-group-btn" style={styles.div}>
                  <button className="btn btn-primary btn-minus" onClick={()=>handleReduction()}>
                    <i className="fa fa-minus" />
                  </button>
                </div>
                <input type="text" disabled className="form-control bg-secondary text-center" value={quantity} style={styles.div}/>
                <div className="input-group-btn" style={styles.div}>
                  <button className="btn btn-primary btn-plus" onClick={()=>handleIncrease()}>
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
              <button className="btn btn-primary px-3" onClick={()=>onAddToCart(product)}><i className="fa fa-shopping-cart mr-1" /> Add To Cart</button>
            </div>
          </div>
        </div>
        <div className="row px-xl-5">
          <div className="col">
            <div className="nav nav-tabs justify-content-center border-secondary mb-4">
              <Link className="nav-item nav-link active" data-toggle="tab" to="#tab-pane-1">Mô tả</Link>
              {/* <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-2">Information</a>
              <a className="nav-item nav-link" data-toggle="tab" href="#tab-pane-3">Reviews (0)</a> */}
            </div>
            <div className="tab-content">
              <div className="tab-pane fade show active" id="tab-pane-1">
                <h4 className="mb-3">{product.name}</h4>
                <div dangerouslySetInnerHTML={{ __html: product.detail }} />
              </div>
              {/* 1 */}
            </div>
          </div>
        </div>
        <ProductCategory id={product.trademark_id}/>
      </div>
    
    );
}

export default ProductDetail;
const styles={
  container:{
    fontFamily:"Times New Roman",
    fontSize:"18px",
    marginTop:"5px"
},
  div:{
    margin:'1px'
  },
  image: { borderRadius:"10px" },
  button : {marginTop: "10px",marginLeft:"5px"},
}
 