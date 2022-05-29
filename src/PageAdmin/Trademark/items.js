const ItemTrademark = (props)=>{

    const {data,handleDelete,handleUpdate,handleUpdateStatus} = props

    return (
        data && data.length > 0 ? //cau dk
        data.map((item,index)=>{
            return(
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.status===1 ?
                    <button className='btn btn-outline-warning' onClick={()=>handleUpdateStatus(item.id,item.status)}>Lock</button> : 
                    <button className='btn btn-outline-info' onClick={()=>handleUpdateStatus(item.id,item.status)}>Open</button>}
                </td>
                <td>
                  <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#modals" onClick={()=>handleUpdate(item.id,item.name)}>
                    <i className="bi bi-pencil-square"></i>
                  </button> |
                  <button className="btn btn-outline-dark" onClick={()=>handleDelete(item.id)}>
                        <i className="bi bi-trash3"></i>
                  </button>
                </td>             
            </tr>  
            )
            }):
            <tr>
                <td colSpan={4} style={{'textAlign':'center',"color":'red'}}>Not Date</td>
            </tr>
    );
}
export default ItemTrademark;
