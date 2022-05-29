import { Link } from "react-router-dom"
const url = "http://localhost:8080/shoe/backend/upload/"
const ItemProduct = (props)=>{
    const {data,handleDelete,handleUpdateStatus,handleSize} = props

return (
data && data.length > 0 ? //cau dk
data.map((item,index)=>{
return(
<tr key={index}>
    <td>{index+1}</td>
    <td>{item.name}</td>
    <td><img src={url+item.picture} height="100px" width="90px" style={{"borderRadius":"5px"}} alt="img"/></td>
    <td>{item.price}</td>
    <td>{item.discount} </td>
    <td>{item.quantity}</td>
    <td> 
    <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#modals"
        onClick={()=>handleSize(item.id)}>Show</button>
    </td>
    <td>{item.status===1 ?
        <button className='btn btn-outline-warning' onClick={()=>handleUpdateStatus(item.id,item.status)}>Lock</button> : 
        <button className='btn btn-outline-info' onClick={()=>handleUpdateStatus(item.id,item.status)}>Open</button>}
    </td>
    <td><Link to={`/admin/product/update/${item.id}`}>
        <button className="btn btn-outline-dark">
            <i className="bi bi-pencil-square"></i>
        </button>
        </Link>
        |
        <button className="btn btn-outline-dark" onClick={()=>handleDelete(item.id)}>
            <i className="bi bi-trash3"></i>
        </button> 
    </td>
</tr>  
)
}):
<tr>
    <td colSpan={8} style={{'textAlign':'center',"color":"red"}}>Not Date </td>
</tr>
);
}
export default ItemProduct;
// const styles = {
//     image: { maxWidth: "200px", maxHeight: "200px",borderRadius:"5px" }
//   };
