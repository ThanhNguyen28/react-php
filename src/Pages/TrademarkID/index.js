import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import * as ACTIONS from "../../store/actions/index"
import Product from './product'
import { Pages } from '../../hooks/pages'
function TrademarkID() {
/* ================================== PRODUCT GET STORE ================================== */ 
    const product= useSelector((state) => state.product);
    const dispatch = useDispatch();
    const {id} = useParams();
/* ================ GET PAGE ================ */
    const {data,page} = Pages(product);
/* ============================== LOAD PRODUCT ============================== */
   useEffect(() => {
    id > 0 &&
      dispatch(ACTIONS.getProductCategory(id)) 
    },[dispatch,id])

    return ( 
<div className="container" style={styles.container}>
    <div className="row">
      <div className="col" style={styles.col}>
        <div className="row px-xl-5 pb-3">
          <Product product={data ? data : product}/>
        </div>
      </div>
    {page}
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