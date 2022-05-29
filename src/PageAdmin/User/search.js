import { useState } from "react";
import {useDispatch} from "react-redux"
import * as ACTIONS from "../../store/actions/index"

function Search() {
/* ========================== KEY ========================== */
    const [keywords, setKeywords] = useState('');
/* ========================== DISPATCH ========================== */
    const dispatch = useDispatch();
/* ========================== CHANGE INPUT ========================== */  
    const onChange = (event) => {
        var search = event.target.value;
        setKeywords(search);
        var formData =new FormData();
        formData.append('keywords',search);
        dispatch(ACTIONS.searchUser(formData));
        if(search===''){
            dispatch(ACTIONS.getUser())
        }
    }
/* ========================== SUBMIT ========================== */ 
    const handleSubmit = (event) => {
        event.preventDefault(); // chặn chuyển trang
        if(keywords){
            var formData =new FormData();
            formData.append('keywords',keywords)
            dispatch(ACTIONS.searchUser(formData));
            setKeywords('');
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
    },
    search:{
        borderRadius:"5px",
    }
}