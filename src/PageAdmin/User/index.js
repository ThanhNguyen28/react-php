import React,{useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { deleteApi, getApi, putApi } from '../../Api/api'
import {useSelector,useDispatch} from 'react-redux'
import ItemUser from "./items"
import * as ACTIONS from "../../store/actions/index";
import Search from './search'
import {pageNumber} from "../../hooks/index"
import Page from '../../hooks/page'
const User = () => {
/* ================ USER ================ */
    const user= useSelector((state) => state.user);
    const dispatch = useDispatch();
/* ================================== PAGENUMBER ================================== */ 
    const pageNb= pageNumber(user,10); 
/* ================================== PAGE ================================== */ 
    const [currentPage,setCurrentPage] = useState(1); //trang hiện tại
    const data = Page(user,currentPage);
/* ================ LOADING USER ================ */
    useEffect(() => {
       getApi("user/index").then(function (response) {
        dispatch(ACTIONS.getUser(response.data))
      })
    },[dispatch]) /* Load lai khi thuc hien dispatch */
/* ================ LOADING USER ================ */
/* ================ UPDATE STATUS ================ */
    const handleUpdateStatus = (id,status) =>{
        status===1 ? status=0 :  status=1 // Câu điều kiện if
        putApi(`user/update/?id=${id}`,{status:status}).then(function (response) {
            // store/actions/index 
            dispatch(ACTIONS.updateStatusUser([{status:status},{id:id}]))
        }) 
    }
/* ================ UPDATE STATUS ================ */
/* ================ DELETE ================ */
    const handleDelete = (id) => {
        if(window.confirm("Bạn có chắc trắng muốn xóa ")){ 
            deleteApi(`user/delete/?id=${id}`).then(function (response) {
                dispatch(ACTIONS.deleteUser(id))
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
       dispatch(ACTIONS.oppositeUser())
    }
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */

    return (  
        <div className="container" style={styles.container}>
        <div className="row">
            <div className="col-12 col-sm-12">
               <h1 style={styles.title}>User</h1> 
            </div>
            <div>
                <Link to="/admin/user/create">
                  <button className="btn btn-outline-secondary">Create User</button>
                </Link>
            </div>
           <Search/>
           <table className="table table-hover" id="table">
                <thead>
                  <tr>
                    <th><i className="bi bi-arrow-down-up" onClick={()=>handleOpposite()} style={styles.opposite}></i>
                        STT
                    </th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Power</th>
                    <th>Status</th>
                    <th>Update|Delete</th>
                   </tr>
                </thead>
                <tbody>
                    <ItemUser // truyền tới : import ItemTheGroup from '../TheGroup/items'
                        handleDelete={handleDelete}
                        handleUpdateStatus={handleUpdateStatus}
                        data={data ? data : user} />
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

export default User;
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