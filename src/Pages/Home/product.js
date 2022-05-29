import {useEffect, useState} from 'react'
import { getApi} from '../../Api/api'
import Items from './items'

function Product() {

  const [productNew,setProductNew]=useState()
  
  useEffect(() => {
    getApi("product/product-new").then((res)=>{
      setProductNew(res);
    })
  }, [])
return (
  <div className="container-fluid pt-5">
    <div className="text-center mb-4">
      <h2 className="section-title px-5">
        <span className="px-2">News Shoes</span>
      </h2>
    </div>
    <div className="row px-xl-5 pb-3">
      <Items  productNew={productNew} />
    </div>
  </div>
);
}
export default Product;