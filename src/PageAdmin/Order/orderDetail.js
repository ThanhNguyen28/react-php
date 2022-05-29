import React,{ useEffect, useState} from "react";
import { useParams } from "react-router";
import { getApi } from "../../Api/api";
import { formatPrice } from "../../hooks";
function OrderDetail() {
    const {id} = useParams();
    const [customer,setCustomer] = useState();
    const [orderDetail,setOrderDetail] = useState();
    const [order,setOrder] = useState();
    useEffect(() => {
        getApi(`order/?id=${id}`).then((res)=>{
          setOrder(res);
        })
    },[id]) 

    useEffect(() => {
       getApi(`customer/?id=${id}`).then((res) => {
        setCustomer(res);
       })
    }, [id]);
    useEffect(() => {
        getApi(`order-detail/?id=${id}`).then((res) => {
            setOrderDetail(res);
        })
    }, [id]);
   
return ( 
<div className="container" style={styles.container}>
  <div className="row">
      <div className="col-12 col-sm-12">
        <h1 style={styles.title}>Order Detail</h1> 
      </div>

    <div className="col-12 col-sm-12">
        <table className="table table-borderless">
        <thead>
        <tr>
          <th className="col-4">Name : </th>
          <th className="col-8">{customer && customer.name}</th>
        </tr>
        <tr>
          <th className="col-4">Phone : </th>
          <th className="col-8">{customer && customer.phone}</th>
        </tr>
        <tr>
          <th className="col-4">E-mail : </th>
          <th className="col-8">{customer && customer.email}</th>
        </tr>
        <tr>
          <th className="col-4">Address : </th>
          <th className="col-8">{customer && customer.address}</th>
        </tr>
        </thead>
        </table>
    </div>
    
  <table className="table table-bordered border-primary">
  <thead>
    <tr>
      <th scope="col">STT</th>
      <th scope="col">Product</th>
      <th scope="col">Times</th>
      <th scope="col">Size</th>
      <th scope="col">Quantity</th>
      <th scope="col">Price</th>
      <th scope="col">Total</th>
    </tr>
  </thead>
  <tbody>
      {orderDetail && orderDetail.length > 0 &&
       orderDetail.map((item,index)=>{
        return (
        <tr key={index}>
            <td>{index+1}</td>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{item.note}</td>
            <td>{item.quantity}</td>
            <td>{formatPrice.format(item.price)}</td>
            <td>{formatPrice.format(item.quantity*item.price)}</td>
        </tr>)
       })
      }  
      <tr>
        <th colSpan={6} style={styles.colSpan}><h5>Total Money : </h5></th>
        <th><h5>{order && formatPrice.format(order.total_money)}</h5></th>
        
      </tr>  
  </tbody>
  </table>
  </div>
</div>    
);
}

export default React.memo(OrderDetail);
const styles={
    container:{
        fontFamily:"Times New Roman",
        fontSize:"18px"
    },
    title:{
        textAlign:"center",
        color:"red",
        padding:"20px"
    },
    colSpan:{
        textAlign:'center',
        color:'red',
    }
}
