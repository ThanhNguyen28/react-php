import {useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import * as ACTIONS from "../../store/actions/index"
import Product from './product'
import Search from './search'
import SortBy from './sortby'
import { Pages } from '../../hooks/pages'

function Shop() {
/* ================================== PRODUCT GET STORE ================================== */ 
    const product= useSelector((state) => state.product);
    const dispatch = useDispatch();
  
/* ================ GET PAGE ================ */
    const {data,page} = Pages(product);
/* ============================== LOAD PRODUCT ============================== */
   useEffect(() => {
       dispatch(ACTIONS.getProduct())
    },[dispatch])

  return (
  <div className="container" style={styles.container}>
    <div className="row">
        {/* <Sidebar/> */}
      <div className="col" style={styles.col}>
        <div className="row px-xl-5 pb-3">
          <div className="col-12 pb-1">
            <div className="d-flex align-items-center justify-content-between mb-4">
              <Search/>
              <SortBy/>
            </div>
          </div>
          <Product product={data ? data : product}/>
        </div>
      </div>
      {page}
    </div>
  </div>
  );
}

export default Shop;
const styles={
  container:{
    fontFamily:"Times New Roman",
    fontSize: "20px",
  },
  col:{
    marginTop: "10px"
  },
}