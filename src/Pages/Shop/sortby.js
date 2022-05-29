import { useSelector, useDispatch } from "react-redux"
import {useEffect} from 'react'
import * as ACTIONS from "../../store/actions/index"
import { getApi } from '../../Api/api'
function SortBy() {
    const trademark= useSelector((state) => state.trademark);
    const dispatch = useDispatch();

/* ======================== Loading trademark lần đầu return ======================== */
    useEffect(() => {
        getApi("trademark/index").then(function (response) {
          dispatch(ACTIONS.getTrademark(response.data))
        })
      },[dispatch])
    // get By Trademark
    const handleSelectTrademark = (event) => {
        var id = event.target.value;
        id > 0 &&
        getApi(`product/all-product-category/?id=${id}`).then((res)=>{
            dispatch(ACTIONS.getProduct(res.data)) 
        });
    }
    // get Price
    const handleSelectPrice = (event) => {
        var price = event.target.value;
        price > 0 &&
        getApi(`product/product-price/?id=${price}`).then((res)=>{
            dispatch(ACTIONS.getProduct(res.data)) 
        });
    }
    return ( 
        <>
        <div className="dropdown ml-4">
            <select className="form-control" name='trademark_id' onChange={(event)=>handleSelectTrademark(event)}>
                <option value="0">Trademark</option>
                { trademark && 
                  trademark.map((item,index)=>{
                  return (<option key={index} value={item.id}>{item.name}</option>)
                 })
                }
            </select>
        </div>
        <div className="dropdown ml-4">
         <select className="form-control" name='price' onChange={(event)=>handleSelectPrice(event)}>
             <option value="0">Price</option>
             <option value="1">Dưới 1 Triệu</option>
             <option value="2">1 Triệu - 4 Triệu</option>
             <option value="3">4 Triệu - 8 Triệu</option>
             <option value="4">8 Triệu - 12 Triệu</option>
             <option value="5">Trên 12 Triệu</option>
         </select>
        </div>
        </>
     );
}

export default SortBy;
/**/