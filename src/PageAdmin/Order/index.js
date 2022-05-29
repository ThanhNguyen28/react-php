import React,{useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import * as ACTIONS from "../../store/actions/index"
import {pageNumber} from "../../hooks/index"
import { getApi } from '../../Api/api'
import ItemOrder from './items'
import ModalOrder from './modal'
import Page from '../../hooks/page'
function Order() {
/* ================================== THE GROUP GET STORE ================================== */ 
    const order= useSelector((state) => state.order);
    const dispatch = useDispatch();
    // var curDate = new Date();
    /* tin tức mỗi trang */
    const newsPerPage = 10; 
/* ================================== PAGENUMBER ================================== */ 
    const pageNb= pageNumber(order,newsPerPage); 
/* ================================== PAGE ================================== */ 
    const [currentPage,setCurrentPage] = useState(1); //trang hiện tại
    const data = Page(order,currentPage);
    const [status, setStatus] = useState(false);
    const handleStatusa = () =>{
       setStatus(true)
    }
/* ================ LOADING ORDER ================ */
    useEffect(() => {
        getApi("order/index").then((res)=>{
            dispatch(ACTIONS.getOrder(res.data));
        })
        status===true && setStatus(false)
    },[dispatch,status]) 
/* ================ LOADING ORDER ================ */
/* ================ UPDATE STATUS ================ */
   const [id, setId] = useState();
   const handleStatus = (id,status) =>{
     setId(id)
   }
/* ================ UPDATE STATUS ================ */
/* ================ CHANGE PAGE ================ */
    const handlePage = (i) => {
        setCurrentPage(i)
    }
    /* Lùi */
    const handlePrev = () => {
        currentPage > 1 &&
        setCurrentPage(currentPage-1)
    }
    /* Tới */
    const handleNext = () => {
        currentPage < pageNb.length &&
        setCurrentPage(currentPage+1)
    }
/* ================ CHANGE PAGE ================ */
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
   const handleOpposite = () => {
    dispatch(ACTIONS.oppositeOrder())
   }
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
//   const [getStatus, setGetStatus] = useState();
  const handleSelect = (event) => {
    let value = event.target.value;
     value > -1 ?
     getApi(`order/status/?id=${value}`).then((res)=>{
        dispatch(ACTIONS.getOrder(res.data));
    }):
    getApi("order/index").then((res)=>{
        dispatch(ACTIONS.getOrder(res.data));
    })
  }
  const handleSelectDate = (event) => {
    let value = event.target.value;
    getApi(`order/date/?id=${value}`).then((res)=>{
       dispatch(ACTIONS.getOrder(res.data));
    })
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
        <ModalOrder id={id} handleStatusa={handleStatusa}/>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <button className="btn btn-outline-dark" onClick={()=>handlePrev()}>Previous</button>
            {pageNb && pageNb.map((i,index)=>{
                return <li key={index} className="page-item">
                         <button className="btn btn-outline-dark" onClick={()=>handlePage(i)}>{i}</button>
                        </li>
                }) 
            }
            <button className="btn btn-outline-dark" onClick={()=>handleNext()}>Next</button>
          </ul>
        </nav>
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