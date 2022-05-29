import {useDispatch} from 'react-redux'
import { useState} from 'react'

import * as ACTIONS from '../../store/actions/index'
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
        dispatch(ACTIONS.searchProduct(formData));
        if(search===""){
            dispatch(ACTIONS.getProduct());
        }
    }
/* ========================== SUBMIT ========================== */ 
    const handleSubmit = (event) => {
        event.preventDefault(); // chặn chuyển trang
        if(keywords){
           var formData =new FormData();
           formData.append('keywords',keywords);
           dispatch(ACTIONS.searchProduct(formData));
           setKeywords('');
        }
    }
    return ( 
        <form onSubmit={(event)=>handleSubmit(event)}>
            <div className="input-group">
                <input type="text" className="form-control" onChange={(event)=>onChange(event)} placeholder="Search by name" />
                <div className="input-group-append">
                    <span className="input-group-text bg-transparent text-primary">
                        <i className="fa fa-search" />
                    </span>
                </div>
            </div>
        </form>
     );
}

export default Search;