import {useDispatch} from 'react-redux'
import { useState} from 'react'

import * as ACTIONS from '../../store/actions/index'
import { postApi ,getApi} from '../../Api/api'
function Search() {
    const dispatch = useDispatch();
    const [key, setKey] = useState('');
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
/* ========================== SUBMIT ========================== */ 
    const handleSubmit = (event) => {
        event.preventDefault(); // chặn chuyển trang
        var formData =new FormData();
        formData.append('key',key)
         postApi('product/search',formData).then((res)=>{
             dispatch(ACTIONS.searchProduct(res.data));
         })
        setKey('');
        if(key===''){
            getApi("product/index").then((res)=>{
                dispatch(ACTIONS.getProduct(res.data))
            })
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