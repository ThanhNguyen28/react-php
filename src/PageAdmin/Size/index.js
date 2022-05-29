import React,{useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import * as ACTIONS from "../../store/actions/index"
import ItemSize from "./items"
import Search from './search'
import ModelSize from './modal'
import {Pages} from '../../hooks/pages'

function Size() {
/* ================================== SIZE GET STORE ================================== */ 
    const size = useSelector((state) => state.size);
    const dispatch = useDispatch();
    
/* ================ GET PAGE ================ */
    const {data,page} = Pages(size);

/* ================ LOADING SIZE ================ */
    useEffect(() => {
        dispatch(ACTIONS.getSize());
    },[dispatch]) /* Loading lai khi thuc hien dispatch *
/* ================ LOADING SIZE ================ */

/* ================ DELETE ================ */
    const handleDelete = (id) => {
        if(window.confirm("Bạn có chắc trắng muốn xóa ")){ 
            dispatch(ACTIONS.deleteSize(id)); // store/actions/index
        }
    } 
/* ================ DELETE ================ */

/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
   const handleOpposite = () => {
    dispatch(ACTIONS.oppositeSize())
   }
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
return (  
<div className="container" style={styles.container}>
    <div className="row">
        <div className="col-12 col-sm-12">
            <h1 style={styles.title}>Size</h1> 
        </div>
        <div>
            <button className="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#modals">
                Create Size
            </button>
                <ModelSize />
            </div>
            <Search /> 
        <table className="table table-hover">
            <thead>
            <tr>
                <th><i className="bi bi-arrow-down-up" onClick={()=>handleOpposite()} style={styles.opposite} ></i>
                    ID
                </th>
                <th>Name</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
                <ItemSize 
                    handleDelete={handleDelete}
                    data={data ? data : size} />
            </tbody>
        </table>
         {page}
    </div>
</div>
);
}
export default Size;
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
