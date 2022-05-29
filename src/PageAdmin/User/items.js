import { Link } from "react-router-dom";

function ItemUser(props) {
    const {data,handleDelete,handleUpdateStatus}= props
    // const data = props.data
    // const handleDelete = props.handleDelete
    // const handleUpdateStatus = props.handleUpdateStatus
    const url = "/admin/user/update/"
    return (
        data && data.length > 0 ? // Câu điều kiện if
        data.map((item,index)=>{
            return(
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.power ===1 ? "Admin" : // Câu điều kiện if
                    item.power ===2 ? "Quản lý sản phẩm" :
                    item.power ===3 && "Quản lý đơn hàng"}
                </td>
                <td>{item.status===1 ? // Câu điều kiện if
                    <button className='btn btn-outline-warning' 
                        onClick={()=>handleUpdateStatus(item.id,item.status)}>Lock</button> : 
                    <button className='btn btn-outline-info'
                        onClick={()=>handleUpdateStatus(item.id,item.status)}>Open</button>}
                </td>
                <td><Link to={url+item.id}>
                    <button className="btn btn-outline-dark">
                        <i className="bi bi-pencil-square"></i>
                    </button> 
                    </Link>|
                    <button className="btn btn-outline-dark" onClick={()=>handleDelete(item.id)}>
                        <i className="bi bi-trash3"></i>
                    </button> 
                </td>    
            </tr>  
        )
        }): <tr><td colSpan={9} style={{'textAlign':'center',"color":'red'}}>Not Date </td></tr>
     );
}

export default ItemUser;