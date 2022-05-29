import React,{useState,useEffect} from 'react'
// import {useDispatch} from 'react-redux'

import { deleteApi, getApi, postApi } from '../../Api/api'
function Size(props) {

    // const dispatch = useDispatch();
    const [sizes,setSizes]=useState([]); // sizes=[]
    
    // size product
    const {id} = props

    // trạng thái
    const [status, setStatus] = useState(false);
    //  mảng size
    const [arraySize,setArraySize]=useState();
/* ============================== ARRAY SIZE ============================== */
    useEffect(() => {
        getApi("size/index").then((res)=>{
            setArraySize(res.data)
          });
    }, []);
/* ============================== ARRAY SIZE ============================== */
/* ============================== PRODUCT GET SIZE ============================== */
const [arraySizes,setArraySizes]=useState();
  useEffect(() => {
    id &&
    getApi(`product-size/?id=${id}`).then((res) =>{
      setArraySizes(res.data)
    })
  }, [id]);

/* ============================== PRODUCT GET SIZE ============================== */
/* ============================== GET SIZE ============================== */
    const getSize = (event) => {
        let size = event.target.value;
        sizes.includes(size)!==true &&
        setSizes([...sizes, size]);
    }
/* ============================== GET SIZE ============================== */
  
/* ============================== DELETE SIZE ============================== */
    const handleChangeSize = (index) =>{
        sizes.splice(index,1);
        setSizes(sizes);
        setStatus(true);
    }
/* ============================== Thay đổi khi status thay đổi ============================== */
    useEffect(()=>{
        status===true && setStatus(false)
    },[status])
/* ============================== Thay đổi khi status thay đổi ============================== */
/* ============================== SUBMIT ============================== */
    const handleSubmit = (event) => {
      event.preventDefault();
      if(id>0 && sizes && sizes.length >0 ){
        deleteApi(`product-size/delete/?id=${id}`);
        sizes.map(item =>{
           postApi("product-size/create",{product_id:id,size:item})
            return true;
        })
        alert("Lưu Thành Công");
        getApi(`product-size/?id=${id}`).then((res) =>{
          setArraySizes(res.data)
        })
      }else{
        alert("Lưu Thất Bại");
      }
      setSizes([]);
    }
/* ============================== SUBMIT ============================== */
    return ( 
        <div className="modal fade" id="modals" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="staticBackdropLabel" style={styles.title}>Size</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              <div className='col-md-6'>
              </div>
            <form onSubmit={(event)=>handleSubmit(event)} className="row g-3">
               <div className="col-md-6">
                <label className="form-label">Size</label>
                <select className="form-control" name="category_id" 
                    onChange={(event)=>getSize(event)}>
                    { arraySize && arraySize.length>0 && arraySize.map((item,index) => {
                        return <option key={index} value={item.name}>{item.name}</option>
                      })
                    }
                </select>
                <div className="col-md-12" style={styles.size}>
                    { arraySizes && arraySizes.length>0 && arraySizes.map((item,index) => {
                        return <button key={index} style={styles.bt} 
                                  className="btn btn-outline-primary">{item.size}
                                </button>
                      })
                    }
                </div>
                <hr/>
                { 
                sizes && sizes.length > 0 &&
                  sizes.map((item,index)=>{
                    return <button type="button" key={index} style={styles.button} onClick={()=>handleChangeSize(index)} className="btn btn-outline-primary">
                             {item}<i className="bi bi-x"></i>
                            </button>
                    })
                }
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
     );
}

export default Size;
const styles = {
    title:{
      textAlign:"center",
      color:"red",
      padding:"20px"
    },
    button : {marginTop: "10px",marginLeft:"5px"},
    size:{
      margin: "10px",
    },
    bt:{
      margin: "5px",
    }
  }