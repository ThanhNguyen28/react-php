import React,{useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import * as ACTIONS from "../../store/actions/index"
import ItemSize from "./items"
import {pageNumber} from "../../hooks/index"
import { deleteApi, getApi } from '../../Api/api'
import Search from './search'
import ModelSize from './modal'
import Page from '../../hooks/page'
function Size() {
/* ================================== THE GROUP GET STORE ================================== */ 
    const size= useSelector((state) => state.size);
    const dispatch = useDispatch();
/* ================================== PAGENUMBER ================================== */ 
    const pageNb= pageNumber(size,10); 
/* ================================== PAGE ================================== */ 
    const [currentPage,setCurrentPage] = useState(1); //trang hiện tại
    const data = Page(size,currentPage);
/* ================ LOADING THE GROUP ================ */
    useEffect(() => {
        getApi("size/index").then((res)=>{
            dispatch(ACTIONS.getSize(res.data));
        })
    },[dispatch]) /* Load lai khi thuc hien dispatch *
/* ================ LOADING THE GROUP ================ */
/* ================ DELETE ================ */
    const handleDelete = (id) => {
        if(window.confirm("Bạn có chắc trắng muốn xóa ")){ 
            deleteApi(`size/delete/?id=${id}`).then((res)=>{
                dispatch(ACTIONS.deleteSize(id)); // store/actions/index
            })
        }
    } 
/* ================ DELETE ================ */

/* ================ CHANGE PAGE ================ */
    const handlePage = (i) => {
        setCurrentPage(i)
    }
/* ================ Lùi ================ */
    const handlePrev = () => {
        currentPage > 1 &&
        setCurrentPage(currentPage-1)
    }
/* ================ tời ================ */
    const handleNext = () => {
        currentPage < pageNb.length &&
        setCurrentPage(currentPage+1)
    }
/* ================ CHANGE PAGE ================ */
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
   const handleOpposite = () => {
    dispatch(ACTIONS.oppositeSize())
   }
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
return (  
<div className="container" style={styles.container}>
    <div className="row">
        <div className="col-12 col-sm-12">
            <h1 style={styles.title}>The Group</h1> 
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
                    STT
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
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
            <button className="btn btn-outline-dark" onClick={()=>handlePrev()}>Previous</button>
            {pageNb && pageNb.map((i,index)=>{
            return <li key={index} className="page-item">
                    <button className="btn btn-outline-dark" onClick={()=>handlePage(i)}>{i}</button>
                    </li>
            }) 
            }
            <button className="btn btn-outline-dark" onClick={()=>handleNext()}>Next</button>
            </ul>
        </nav>
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
