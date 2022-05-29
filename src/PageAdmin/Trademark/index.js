import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import ItemTrademark from './items'
import * as ACTIONS from "../../store/actions/index"
import ModalTrademark from './modal'
import Search from './search'
import { Pages } from '../../hooks/pages'

const Trademark = () => {
/* ================================== TRADEMARK GET STORE ================================== */ 
    const trademark= useSelector((state) => state.trademark);
    const dispatch = useDispatch();

/* ================================== GET ID,NAME ================================== */ 
    const [id, setID] = useState();
    const [name, setName] = useState();

/* ================ GET PAGE ================ */
    const {data,page} = Pages(trademark);

/* ================ LOADING THE GROUP ================ */
    useEffect(() => {
        dispatch(ACTIONS.getTrademark())
    },[dispatch]) 
    /* Load lai khi thuc hien dispatch */
/* ================ LOADING THE GROUP ================ */

/* ================ UPDATE STATUS ================ */
    const handleUpdateStatus = (id,status) =>{
        status===1 ? status=0 :  status=1 // Câu điều kiện if
        dispatch(ACTIONS.updateStatusTrademark({status:status},id)) 
    }
/* ================ UPDATE STATUS ================ */

/* ================ CREATE ================ */
    const handleCreate = () => {
        setID(0)
    }
/* ================ CREATE ================ */

/* ================ UPDATE ================ */
     const handleUpdate = (id,name) => {
        setID(id)
        setName(name)
    }
 /* ================ UPDATE ================ */

/* ================ DELETE ================ */
    const handleDelete = (id) => {
        if(window.confirm("Bạn có chắc trắng muốn xóa ")){ 
            dispatch(ACTIONS.deleteTrademark(id))
        }
    } 
/* ================ DELETE ================ */

/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
   const handleOpposite = () => {
     dispatch(ACTIONS.oppositeTrademark())
    }
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
return (  
<div className="container" style={styles.container}>
   <div className="row">
        <div className="col-12 col-sm-12">
            <h1 style={styles.title}>Trademark</h1> 
        </div>
        <div>
        <button className="btn btn-outline-secondary" 
                onClick={()=>handleCreate()} data-bs-toggle="modal" data-bs-target="#modals">
                Create Trademark
        </button>
        </div>
        <ModalTrademark id={id} name={name} />
        <Search/>
        <table className="table table-hover" id="table">
            <thead>
            <tr>
                 <th><i className="bi bi-arrow-down-up" onClick={()=>handleOpposite()} style={styles.opposite} ></i>
                    ID
                 </th>
                 <th>Name</th>
                 <th>Status</th>
                 <th>Update|Delete</th>
            </tr>
            </thead>
            <tbody>
                <ItemTrademark 
                    handleDelete={handleDelete}
                    handleUpdateStatus={handleUpdateStatus}
                    handleUpdate={handleUpdate}
                    data={ data ? data : trademark} />
            </tbody>
        </table>
        {page}
    </div>
</div>
);
}

export default Trademark;
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