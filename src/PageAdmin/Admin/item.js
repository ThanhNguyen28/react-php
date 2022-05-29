import React from "react";
import { formatPrice } from "../../hooks";
function Item(props) {
    const {data} = props
return (
    data && data.length > 0 ? // Câu điều kiện if
    data.pop() &&
    data.map((item,index)=>{
    return(
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.date}</td>
            <td>{formatPrice.format(item.total_money)}</td>
        </tr>)
        }):
        <tr>
            <td colSpan={4} style={{'textAlign':'center',"color":'red'}}>Not Date </td>
        </tr>
);
}

export default React.memo(Item);