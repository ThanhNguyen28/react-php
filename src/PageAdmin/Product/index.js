import React,{useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import * as ACTIONS from '../../store/actions/index'
import ItemProduct from '../Product/items'
import { Link } from 'react-router-dom'
import Search from './search'
import Size from './size'
import { Pages } from '../../hooks/pages'
import { deleteApi } from '../../Api/api'

function Product() {
/* ================================== PRODUCT GET STORE ================================== */ 
    const product= useSelector((state) => state.product);
    const dispatch = useDispatch();
    const [id,setId] = useState();
/* ================ GET PAGE ================ */
    const {data,page} = Pages(product);

/* ================================== LOADING PRODUCT ================================== */
    useEffect(() => {
        dispatch(ACTIONS.getProduct())
    },[dispatch]) 
    // thay đổi khi moi lan dispatch
/* ================================== LOADING PRODUCT ================================== */

/* ================ UPDATE STATUS ================ */
    const handleUpdateStatus = (id,status) =>{
        status===1 ? status=0 :  status=1 // Câu điều kiện if
        dispatch(ACTIONS.updateStatusProduct({status:status},id))// store/actions/index  
    }
/* ================ UPDATE STATUS ================ */

/* ================ DELETE ================ */
    const handleDelete = (id) => {
        if(window.confirm("Bạn có chắc trắng muốn xóa ")){ 
            dispatch(ACTIONS.deleteProduct(id))
            deleteApi(`product-size/delete/?id=${id}`);
        }
    } 
/* ================ DELETE ================ */

/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
    const handleOpposite = () => {
      dispatch(ACTIONS.oppositeProduct())
    }
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */

/* ================ SHOW SIZE ================ */
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
        {page}
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