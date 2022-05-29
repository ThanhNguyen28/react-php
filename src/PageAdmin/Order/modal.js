import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { putApi } from '../../Api/api';
const ModalOrder = (props) => {
  const {id,handleStatusa} = props
  const [status, setStatus] = useState();
  var navigate = useNavigate();
 /* ======================== Select ======================== */
  const handleSelect = (event) => {
    let value = event.target.value;
    setStatus(value);
  }
 /* ======================== Submit ======================== */
  const handleSubmit = (event) => {
    event.preventDefault(); // chặn chuyển trang
    putApi(`order/update/?id=${id}`,{status:status}).then((res)=>{
      res.status===200 &&
      alert("Lưu Thành Công");
      navigate("/admin/order", { replace: true });
   })
  }
  return(
  <div className="modal fade" id="modals" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title text-center" id="staticBackdropLabel">Change Status</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div className="modal-body">
          <form onSubmit={(event)=>handleSubmit(event)} className="row g-3">
            <div className="col-md-12">
              <label className="form-label">Status</label>
                <select className="form-control" name='status' onChange={(event)=>handleSelect(event)}>
                  <option value="0">Đặt hàng</option>
                  <option value="1">Vận chuyển</option>
                  <option value="2">Thanh toán</option>
                  <option value="3">Đơn hàng bị hủy</option>
                </select>
            </div>
            <div className="col-12"  style={{'textAlign':'center'}}>     
              <button type="submit" onClick={()=>handleStatusa()} className="btn btn-outline-danger">Save</button>     
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
export default React.memo(ModalOrder)