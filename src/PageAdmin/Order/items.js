import { formatPrice } from "../../hooks";
import {Link } from "react-router-dom";
import React from "react";
const ItemOrder= (props)=>{
/* ============================= Order truyền xuống thông qua props =============================  */
    const {data,handleStatus} = props  
return (
    data && data.length > 0 ? // Câu điều kiện if
    data.map((item,index)=>{
    return(
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{formatPrice.format(item.total_money)}</td>
            <td>{item.date}</td>
            <td>{item.status===0 && // Câu điều kiện if
                <button className='btn btn-outline-warning' onClick={()=>handleStatus(item.id)}
                    data-bs-toggle="modal" data-bs-target="#modals">Đặt Hàng</button>
                }
                {item.status===1 &&
                <button className='btn btn-outline-info' onClick={()=>handleStatus(item.id)}
                    data-bs-toggle="modal" data-bs-target="#modals">Vận Chuyển</button>
                }
                {item.status===2 &&
                <button className='btn btn-outline-dark' onClick={()=>handleStatus(item.id)}
                    data-bs-toggle="modal" data-bs-target="#modals">Thanh Toán</button>
                }
                {item.status===3 &&
                <button className='btn btn-outline-danger' onClick={()=>handleStatus(item.id)}
                    data-bs-toggle="modal" data-bs-target="#modals">Đơn Hàng Bị Hủy</button>
                }
            </td> 
            <td><Link to={`/admin/order-detail/${item.id}`}>
                <button className="btn btn-outline-dark">Show</button></Link> 
            </td>      
        </tr>)
        }):
        <tr>
            <td colSpan={6} style={{'textAlign':'center',"color":'red'}}>Not Date </td>
        </tr>
    );
}
export default ItemOrder;