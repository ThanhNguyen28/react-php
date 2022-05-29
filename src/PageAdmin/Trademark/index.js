import React,{useEffect,useState} from 'react'
import { deleteApi, getApi, putApi } from '../../Api/api'
import {useSelector,useDispatch} from 'react-redux'

import ItemTrademark from './items'
import * as ACTIONS from "../../store/actions/index"
import ModalTrademark from './modal'
import Search from './search'
import {pageNumber} from "../../hooks/index"
import Page from '../../hooks/page'

const Trademark = () => {
/* ================================== TRADEMARK GET STORE ================================== */ 
    const trademark= useSelector((state) => state.trademark);
    const dispatch = useDispatch();
/* ================================== GET ID,NAME ================================== */ 
    const [id, setID] = useState();
    const [name, setName] = useState();
/* ================================== PAGENUMBER ================================== */ 
    const pageNb= pageNumber(trademark,10); 
/* ================================== PAGE ================================== */ 
    const [currentPage,setCurrentPage] = useState(1); //trang hiện tại
    const data = Page(trademark,currentPage);
/* ================ LOADING THE GROUP ================ */
    useEffect(() => {
       getApi("trademark/index").then(function (response) {
        dispatch(ACTIONS.getTrademark(response.data))
      })
    },[dispatch]) /* Load lai khi thuc hien dispatch */
/* ================ LOADING THE GROUP ================ */
/* ================ UPDATE STATUS ================ */
    const handleUpdateStatus = (id,status) =>{
        status===1 ? status=0 :  status=1 // Câu điều kiện if
        putApi(`trademark/update/?id=${id}`,{status:status}).then(function (response) {
            // store/actions/index 
            dispatch(ACTIONS.updateStatusTrademark([{status:status},{id:id}]))
        }) 
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
            deleteApi(`trademark/delete/?id=${id}`).then(function (response) {
                dispatch(ACTIONS.deleteTrademark(id))
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
                    STT
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