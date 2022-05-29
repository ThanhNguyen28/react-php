import { useState } from "react";
import { postApi } from "../../Api/api";
import Item from "./item";
import { formatPrice } from "../../hooks";
function Admin() {
    const [begin, setBegin] = useState();
    const [end, setEnd] = useState();
    const [total, setTotal] = useState();
    const [orders, setOrders] = useState();
    const handleSelectBegin = (event) => {
        setBegin(event.target.value)
    }
    const handleSelectEnd = (event) => {
        setEnd(event.target.value)
    }
    const handleStatistics = () => {
        postApi(`order/statistics`,{begin:begin,end:end}).then((res)=>{
            res.forEach(item => {
                setTotal(item.total);
            });
            setOrders(res);
        })
    }
return ( 
<div className="container" style={styles.container}> 
 <div className="row" style={styles.row}>
   <div style={styles.statistics}>
     <button className="btn btn-outline-dark" onClick={()=>handleStatistics()}>Statistics</button>
   </div>
   <div className="col-md-4">
        <label className="form-label">Begin : </label>
        <input type="date" onChange={(event)=>handleSelectBegin(event)} />
    </div>
    <div className="col-md-4">
        <label className="form-label">End : </label>
        <input type="date" onChange={(event)=>handleSelectEnd(event)} />
    </div>
    <table className="table table-hover">
      <thead>
        <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Date</th>  
            <th>Total Money</th>
        </tr>
      </thead>
      <tbody>
        <Item data={orders} />
        {total &&
        <tr>
            <td colSpan={3} style={{'textAlign':'center',"color":'red'}}>Total</td>
            <td >{formatPrice.format(total)}</td>
        </tr>
        }
      </tbody>
    </table>
 </div>
</div>
);
}

export default Admin;
const styles={
    container:{
        fontFamily:"Times New Roman",
        fontSize:"18px"
    },
    row:{
     with:"50%",
     margin:"auto"
    },
    statistics:{
        margin:"10px"
    }
}