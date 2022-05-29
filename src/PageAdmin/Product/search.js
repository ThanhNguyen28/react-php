import { useState } from "react";
import {useDispatch} from 'react-redux'
import { postApi ,getApi} from '../../Api/api'
import * as ACTIONS from "../../store/actions/index"
function Search() {
/* ========================== KEY ========================== */
    const [key, setKey] = useState('');
/* ========================== DISPATCH ========================== */
    const dispatch = useDispatch();
/* ========================== CHANGE INPUT ========================== */  
    const onChange = (event) => {
        var search = event.target.value;
        setKey(search);
        var formData =new FormData();
        formData.append('key',search)
         postApi('product/search',formData).then((res)=>{
             dispatch(ACTIONS.searchProduct(res.data));
         })
        if(search===""){
            getApi("product/index").then((res)=>{
                dispatch(ACTIONS.getProduct(res.data))
            })
        }
    }
/* ========================== SUBMIT ========================== */ 
    const handleSubmit = (event) => {
        event.preventDefault(); // chặn chuyển trang
        if(key){
        var formData =new FormData();
        formData.append('key',key)
         postApi('product/search',formData).then((res)=>{
             dispatch(ACTIONS.searchProduct(res.data));
         })
        setKey('');
        }
    }
    return ( 
    <form onSubmit={(event)=>handleSubmit(event)} className="row g-3" style={styles.form}>
        <div className="col-auto">
          <input type="text" className="form-control" onChange={(event)=>onChange(event)} placeholder="Search" style={styles.search}/>
        </div>
        <div className="col-auto">
            <button type="submit" className="btn btn-outline-primary mb-3">
              <i className="bi bi-search"></i>
            </button>
        </div>
    </form>
    );
}

export default Search;
const styles={
    form:{
      position: "relative",
      fontFamily:"Times New Roman",
      margin: "auto",
      float:"center",
      with:"50%"
    },
    search:{
        borderRadius:"5px",
    }
}
