import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import { postApi, putApi } from '../../Api/api';
import * as ACTIONS from "../../store/actions/index";

const ModalTrademark = (props) => {

  const id = props.id;
  const name = props.name;

  const dispatch = useDispatch();

  const [inputs, setInputs] = useState('');
 
  /* lấy giá trị input đưa vào setInputs */

  const onChange = (event) => {
    setInputs(event.target.value);
  }
  
  /* Submit */

  const handleSubmit = (event) => {
    event.preventDefault(); // chặn chuyển trang
    var data = {name:inputs,status:0}
    if(id===0){
      postApi('trademark/create',data).then(()=> {
        dispatch(ACTIONS.createTrademark(data)) // store/actions/index 
    })
    }else{
      console.log(data);
      putApi(`trademark/update/?id=${id}`,{name:inputs}).then(function (response) {
      dispatch(ACTIONS.updateTrademark({name:inputs},id)) // store/actions/index 
      })
    }    
    setInputs('');
  }

    return(
        id === 0 ?
        <div className="modal fade" id="modals" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="staticBackdropLabel">Create Trademark</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
            <form onSubmit={(event)=>handleSubmit(event)} className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name" value={inputs} onChange={(event)=>onChange(event)} required/>
              </div>
              <div className="col-12"  style={{'textAlign':'center'}}>     
                <button type="submit" className="btn btn-outline-danger">Save</button>     
              </div>
              </form> 
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>:
        <div className="modal fade" id="modals" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-center" id="staticBackdropLabel">Update Trademark </h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
              </div>
              <div className="modal-body">
              <form onSubmit={(event)=>handleSubmit(event)} className="row g-3">
              <div className="col-md-12">
                <label className="form-label">Trademark : {name}</label>
                <input type="text" className="form-control" name="name" value={inputs} onChange={(event)=>onChange(event)} required/>
              </div>
              <div className="col-12"  style={{'textAlign':'center'}}>     
                <button type="submit" className="btn btn-outline-danger">Save</button>     
              </div>
                </form> 
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>    
    )
}
export default ModalTrademark