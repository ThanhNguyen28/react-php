import {useEffect, useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import * as ACTIONS from "../../store/actions/index"
import Product from './product'
import { getApi } from '../../Api/api'
import {pageNumber} from "../../hooks/index"
import Page from '../../hooks/page'
function TrademarkID() {
/* ================================== PRODUCT GET STORE ================================== */ 
    const product= useSelector((state) => state.product);
    const dispatch = useDispatch();
    const {id} = useParams();
/* ================================== PAGENUMBER ================================== */ 
    const newsPerPage = 12; //tin tức mỗi trang
    const pageNb= pageNumber(product,newsPerPage); 
/* ================================== PAGE ================================== */ 
    const [currentPage,setCurrentPage] = useState(1); //trang hiện tại
    const data = Page(product,currentPage)
/* ============================== LOAD PRODUCT ============================== */
   useEffect(() => {
    id > 0 &&
    getApi(`product/all-product-category/?id=${id}`).then((res)=>{
        dispatch(ACTIONS.getProduct(res.data)) 
    });
    },[dispatch,id])

/* ================ CHANGE PAGE ================ */
    const handlePage = (i) => {
        setCurrentPage(i)
    }
        // lùi
    const handlePrev = () => {
        currentPage > 1 &&
        setCurrentPage(currentPage-1)
    }
    // tời
    const handleNext = () => {
        currentPage < pageNb.length &&
        setCurrentPage(currentPage+1)
    }
/* ================ CHANGE PAGE ================ */
    return ( 
<div className="container" style={styles.container}>
    <div className="row">
      <div className="col" style={styles.col}>
        <div className="row px-xl-5 pb-3">
          <Product product={data ? data : product}/>
        </div>
      </div>
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

export default TrademarkID;
const styles={
    container:{
      fontFamily:"Times New Roman",
      fontSize: "20px",
    },
    col:{
      marginTop: "10px"
    },
  }