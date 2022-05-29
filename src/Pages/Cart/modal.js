import {useState,useEffect} from 'react';
import { getApi } from '../../Api/api';
// import {useDispatch} from 'react-redux'
// import * as ACTIONS from '../../store/actions/index';
function Modal(props) {
  const id = props.id
  const handleChangeSize = props.handleChangeSize
  const [arraySize,setArraySize]=useState();
  const [size, setSize] = useState();
//   const dispatch = useDispatch();
  useEffect(() => {
    getApi(`product-size/?id=${id}`).then((res) =>{
      setArraySize(res.data)
    })
  }, [id]);

  const getSize = (event) => {
    setSize(event.target.value)
  }

return ( 
<div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Change Size</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="col-md-6">
            <label className="form-label">Size</label>
            <select className="form-control" name="category_id" onChange={(event)=>getSize(event)}>
                { arraySize && arraySize.length>0 && arraySize.map((item,index) => {
                        return <option key={index} value={item.size}>{item.size}</option>
                    })
                }
            </select>
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>handleChangeSize(size)}>Save</button>
      </div>
    </div>
  </div>
</div>
);
}
export default Modal;