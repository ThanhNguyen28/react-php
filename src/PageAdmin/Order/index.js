import React,{useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import * as ACTIONS from '../../store/actions/index'
import ItemOrder from './items'
import ModalOrder from './modal'
import { Pages } from '../../hooks/pages'

function Order() {
/* ============== THE GROUP GET STORE ============== */ 
    const order= useSelector((state) => state.order);
    const dispatch = useDispatch();

/* ================ GET PAGE ================ */
    const {data,page} = Pages(order);

    const [status, setStatus] = useState(false);

    const handleStatusSize = () =>{
       setStatus(true)
    }
/* ================ LOADING ORDER ================ */
    useEffect(() => {
        dispatch(ACTIONS.getOrder());
        status===true && setStatus(false)
    },[dispatch,status]) 
/* ================ LOADING ORDER ================ */

/* ================ UPDATE STATUS ================ */
   const [id, setId] = useState();
   const handleStatus = (id) =>{
     setId(id)
   }
/* ================ UPDATE STATUS ================ */

/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
   const handleOpposite = () => {
    dispatch(ACTIONS.oppositeOrder())
   }
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
  /* get select */
  const handleSelect = (event) => {
    let value = event.target.value;
    value > -1 ?
    dispatch(ACTIONS.getOrderStatus(value))
    :
    dispatch(ACTIONS.getOrder())
  }
  /* get select */
  const handleSelectDate = (event) => {
    let value = event.target.value;
    dispatch(ACTIONS.getOrderDate(value));
  }
  
return (  
<div className="container" style={styles.container}>
    <div className="row">
        <div className="col-12 col-sm-12">
            <h1 style={styles.title}>Order</h1> 
        </div>
        <div className="col-4 col-sm-2">
            <select className="form-control" name='status' onChange={(event)=>handleSelect(event)}>
                <option value="-1">Lọc đơn hàng</option>
                <option value="0">Đặt hàng</option>
                <option value="1">Vận chuyển</option>
                <option value="2">Thanh toán</option>
                <option value="3">Đơn hàng bị hủy</option>
            </select>
        </div>
        <div className="col-md-4">
            <label className="form-label">Ngày : </label>
            <input type="date" onChange={(event)=>handleSelectDate(event)} />
        </div>
        <table className="table table-hover" id="table">
            <thead>
              <tr>
                <th><i className="bi bi-arrow-down-up" onClick={()=>handleOpposite()} style={styles.opposite} ></i>
                    ID
                </th>
                <th>Customer</th>
                <th>Total Money</th>
                <th>Date</th>
                <th>Status</th>
                <th>Show</th>
              </tr>
            </thead>
            <tbody>
              <ItemOrder
                handleStatus={handleStatus}
                data={data ? data : order} />
            </tbody>
        </table>
        <ModalOrder id={id} handleStatusSize={handleStatusSize}/>
        {page}
    </div>
</div>
);
}
export default Order;
const styles={
    container:{
        fontFamily:"Times New Roman",
        fontSize:"18px"
    },
    opposite:{
        marginRight:"10px"
    },
    title:{
        textAlign:"center",
        color:"red",
        padding:"20px"
    }
}