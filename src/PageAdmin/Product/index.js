import React,{useEffect,useState} from 'react'

import {useSelector,useDispatch} from 'react-redux'
import * as ACTIONS from "../../store/actions/index"
import ItemProduct from '../Product/items'
import { deleteApi, getApi, putApi } from '../../Api/api'
import { Link } from 'react-router-dom'
import Search from './search'
import {pageNumber} from "../../hooks/index"
import Size from './size'
import Page from '../../hooks/page'
function Product() {
/* ================================== PRODUCT GET STORE ================================== */ 
    const product= useSelector((state) => state.product);
    const dispatch = useDispatch();

/* ================================== PAGENUMBER ================================== */ 
    const pageNb= pageNumber(product,10); 

/* ================================== PAGE ================================== */ 
    const [currentPage,setCurrentPage] = useState(1); //trang hiện tại
    const data = Page(product,currentPage);

/* ================================== LOADING PRODUCT ================================== */
    useEffect(() => {
        getApi("product/index").then((res)=>{
            dispatch(ACTIONS.getProduct(res.data))
        })
    },[dispatch]) // thay đổi khi moi lan dispatch
/* ================================== LOADING PRODUCT ================================== */
/* ================ UPDATE STATUS ================ */
    const handleUpdateStatus = (id,status) =>{
        status===1 ? status=0 :  status=1 // Câu điều kiện if
        putApi(`product/update/?id=${id}`,{status:status}).then(function (response) {
            dispatch(ACTIONS.updateStatusProduct([{status:status},{id:id}]))// store/actions/index 
        }) 
    }
/* ================ UPDATE STATUS ================ */
/* ================ DELETE ================ */
    const handleDelete = (id) => {
        if(window.confirm("Bạn có chắc trắng muốn xóa ")){ 
            deleteApi(`product/delete/?id=${id}`).then(function (response) {
                dispatch(ACTIONS.deleteProduct(id))
              })
        }
    } 
/* ================ DELETE ================ */
/* ================ CHANGE PAGE ================ */
    const handlePage = (i) => {
       setCurrentPage(i)
    }
/* ===================== Lùi ===================== */
    const handlePrev = () => {
        currentPage > 1 &&
        setCurrentPage(currentPage-1)
    }
/* ===================== Tời ===================== */
    const handleNext = () => {
        currentPage < pageNb.length &&
        setCurrentPage(currentPage+1)
    }
/* ================ CHANGE PAGE ================ */

/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
    const handleOpposite = () => {
      dispatch(ACTIONS.oppositeProduct())
    }
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */

/* ================ SHOW SIZE ================ */
    const [id,setId] = useState();
    const handleSize = (id) => {
       setId(id);
    }
/* ================ SHOW SIZE ================ */
return (  
<div className="container" style={styles.container}>
    <div className="row">
        <div className="col-12 col-sm-12">
            <h1 style={styles.title}>Product</h1> 
        </div>
        <div>
            <Link to="/admin/product/create">
                <button className="btn btn-outline-secondary">Create Product</button>
            </Link>
        </div>
        <Search/>
        <table className="table table-hover">
            <thead>
                <tr>
                <th> <i className="bi bi-arrow-down-up"
                            onClick={()=>handleOpposite()} style={styles.opposite} ></i>
                        STT
                </th>
                <th>Name</th>
                <th>Picture</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Quantity</th>
                <th>Size</th>
                <th>Status</th>
                <th>Update|Delete</th>
                </tr>
                </thead>
            <tbody>
                    <ItemProduct 
                        handleDelete={handleDelete}
                        handleUpdateStatus={handleUpdateStatus}
                        handleSize={handleSize}
                        data={data ? data : product}/>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
            <button className="btn btn-outline-dark" onClick={()=>handlePrev()}>Previous</button>
            {pageNb && pageNb.map((i,index)=>{
                return <li key={index} className="page-item">
                        <button className="btn btn-outline-dark" onClick={()=>handlePage(i)}>{i}</button>
                        </li>}) 
            }
            <button className="btn btn-outline-dark" onClick={()=>handleNext()}>Next</button>
            </ul>
        </nav>
        <Size id={id} />
    </div>
</div>
);
}
export default Product;
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