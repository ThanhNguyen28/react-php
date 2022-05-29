const ItemSize = (props)=>{
/* ============ Size truyền xuống thông qua props ============  */
    const {data,handleDelete} = props  
    
return (
    data && data.length > 0 ? // Câu điều kiện if
    data.map((item,index)=>{
    return(
        <tr key={index}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td> 
              <button className="btn btn-outline-dark" onClick={()=>handleDelete(item.id)}>
                <i className="bi bi-trash3"></i>
              </button>
            </td>            
        </tr>  
    )
    }):
        <tr>
            <td colSpan={3} style={{'textAlign':'center',"color":'red'}}>Not Date </td>
        </tr>
    );
}
export default ItemSize;
