import { Link } from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux';
import { useEffect,useState } from 'react';
import Menu from "./menu";

import * as ACTIONS from "../../../store/actions"
import { postApi ,getApi} from "../../../Api/api"
function Header() {
  
  const cart= useSelector((state) => state.cart);
  const [carts, setCarts] = useState([]);
  const dispatch = useDispatch();

  const [key, setKey] = useState('');
/* ======================= LOAD CART ======================= */
  useEffect(() => {
    setCarts(cart)
  }, [cart]);
/* ========================== CHANGE INPUT ========================== */  
    const onChange = (event) => {
        var search = event.target.value;
        setKey(search);
        var formData =new FormData();
        formData.append('key',search)
        postApi('product/search',formData).then((res)=>{
            dispatch(ACTIONS.searchProduct(res.data));
        })
        if(search===''){
            getApi("product/index").then((res)=>{
                dispatch(ACTIONS.getProduct(res.data))
            })
        }
    }
    const handleSumit = (event) => {
      event.preventDefault();
      if(key){
      var formData =new FormData();
        formData.append('key',key)
        postApi('product/search',formData).then((res)=>{
            dispatch(ACTIONS.searchProduct(res.data));
        })
        
        if(key===''){
            getApi("product/index").then((res)=>{
                dispatch(ACTIONS.getProduct(res.data))
            })
        }
      }
      
    }
    return (  
        <div className="container">
        <div className="row align-items-center py-3 px-xl-5">
            <div className="col-lg-3 d-none d-lg-block">
              <Link to="/" className="text-decoration-none">
                 Shopper
              </Link>
            </div>
            <div className="col-lg-6 col-6 text-left">
              <form onSubmit={(event)=>handleSumit(event)}>
                <div className="input-group">
                  <input type="text" className="form-control" onChange={(event)=>onChange(event)} placeholder="Search" />
                  <div className="input-group-append">
                    <span className="input-group-text bg-transparent text-primary">
                      <i className="fa fa-search" />
                    </span>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-3 col-6 text-right">
              {/* <Link to="/" className="btn border">
                <i className="fas fa-heart text-primary" />
                <span className="badge">0</span>
              </Link> */}
              <Link to="/home/cart" className="btn border">
                <i className="fas fa-shopping-cart text-primary" />
                <span>{carts.length}</span>
              </Link>
            </div>
        </div>
        <Menu/>
      </div>
    );
}

export default Header;