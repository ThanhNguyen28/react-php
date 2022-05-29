import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import * as ACTIONS from "../../store/actions/index"
import { postApi } from '../../Api/api'
const ModelSize = () => {

  const dispatch = useDispatch();
  const [inputs, setInputs] = useState('');
 
/* lấy giá trị input đưa vào setInputs */
  const onChange = (event) => {
    setInputs(event.target.value);
  }
/* ================== Submit ================== */
  const handleSubmit = (event) => {
    event.preventDefault(); // chặn chuyển trang
    var data= {name:inputs}
    inputs &&
    postApi('size/create',data)
    dispatch(ACTIONS.createSize(data)) // store/actions/index
    setInputs('');
  }

return(
  <div className="modal fade" id="modals" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title text-center" id="staticBackdropLabel">Create The Group </h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
        <form onSubmit={(event)=>handleSubmit(event)} className="row g-3">
          <div className="col-md-12">
            <label className="form-label">Name</label>
            <input type="text" value={inputs || ""} className="form-control" onChange={(event)=>onChange(event)} required/>
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
export default ModelSize