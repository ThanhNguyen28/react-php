import { Link } from 'react-router-dom'
import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import * as ACTIONS from "../../store/actions/index"
import { getApi, postApi,postApiImg } from '../../Api/api'

const CreateProduct = () => {

  const {trademark} = useSelector((state) => state)
  const dispatch = useDispatch();
  
    // Tạo State inputs
    const [inputs, setInputs] = useState({});
     // id  Trademark
    const [trademarkID, setTrademarkID] = useState();
     // Tạo State image
    const [image,setImage]=useState();
    // State showimage
    const [showImage,setShowImage]=useState();
    // Tạo State ckeditor
    const [ckeditor, setCkeditor] = useState("");
    const [size, setSize] = useState([]);
    const [sizes, setSizes] = useState([]);
    const [status, setStatus] = useState(false);
   /* Loading trademark */ 
   useEffect(() => {
      dispatch(ACTIONS.getTrademark());
      getApi("size/all").then(res=>{
         setSize(res)
      })
    },[dispatch]);

    useEffect(()=>{
      status===true && setStatus(false)
    },[status])
    
    // add size
    const getSize = (event) => {
      let size = event.target.value;
      sizes.includes(size)!==true &&
      setSizes([...sizes, size]);
    }

    // thay doi size
    const handleChangeSize = (index) =>{
      sizes.splice(index,1);
      setSizes(sizes);
      setStatus(true);
    }
    
     // get data Textarea
    const handleTextarea = (event, editor) => {
      const data = editor.getData();
      setCkeditor(data);
    };
    // lấy id trademark
    const getTrademarkID = (event) => {
      setTrademarkID(event.target.value);
    }
    // lấy giá trị input đưa vào setInputs
    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    // get img
    const uploadImage = (event) => {
      if(event.target.files && event.target.files.length > 0){
        setImage(event.target.files[0])
        setShowImage(URL.createObjectURL(event.target.files[0]))
      }
    }

    // Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const product = {trademark_id:trademarkID ? trademarkID : "",
                         name:inputs.name,
                         price:inputs.price,
                         discount:0,
                         quantity:inputs.quantity,
                         picture:image.name,
                         detail:ckeditor,
                         status:1}
        postApi("product/create",product).then((res)=>{
          let id = res
          dispatch(ACTIONS.createProduct(product))
          sizes &&
          sizes.map(item =>{
          postApi("product-size/create",{product_id:id,size:item})
            return true;
          })
        })   

        
        let formData = new FormData();
        formData.append('image',image);
        postApiImg('product/saveimg',formData)
        alert("Lưu Thành Công")
        setSizes(['']);
        setCkeditor('');

    }
    return (
        <div className="container">
        <div className="row">
            <div className="col-12 col-sm-12">
               <h1 style={{'textAlign':'center','color':'red','padding':'20px'}}>Product</h1> 
            </div>
            <div>
                <Link to="/admin/product">
                   <button className="btn btn-outline-secondary">Go Back</button>
                </Link>
            </div>
            <form onSubmit={(event)=>handleSubmit(event)} className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                        <input 
                           type="text" 
                           className="form-control"  
                           name="name" 
                           value={inputs.name || ""}
                           onChange={(event)=>onChange(event)} 
                           placeholder="Enter Product" required/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Price</label>
                        <input 
                           min={1}
                           type="number" 
                           className="form-control"  
                           name="price" 
                           value={inputs.price || ""}
                           onChange={(event)=>onChange(event)} 
                           placeholder="Enter Price" required/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Trademark</label>
                        <select 
                           className="form-control" 
                           name="trademark_id" 
                           onClick={(event)=>getTrademarkID(event)}>
                             <option value="0">Choose</option>
                            { trademark && trademark.length > 0 &&
                              trademark.map((item) => {
                                  return <option key={item.id} value={item.id}>{item.name}</option>
                              })
                            }
                        </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Quantity</label>
                        <input 
                           min={1}
                           type="number" 
                           className="form-control"  
                           name="quantity" 
                           value={inputs.quantity || ""}
                           onChange={(event)=>onChange(event)} 
                           placeholder="Enter Quantity" required/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Size</label>
                        <select className="form-control" name="category_id" 
                           onChange={(event)=>getSize(event)}>
                            {size && size.length>0 && size.map((item,index) => {
                              return <option key={index} value={item.name}>{item.name}</option>
                              })
                            }
                        </select>
                        {sizes.length > 0 &&
                          sizes.map((item,index)=>{
                            return <button type="button" key={index} style={styles.button} onClick={()=>handleChangeSize(index)} className="btn btn-outline-primary">
                                     {item} <i className="bi bi-x"></i>
                                    </button>
                          })
                        }
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Image</label>
                        <input type="file" 
                          className="form-control" 
                          placeholder='Upload an image' 
                          name="picture" 
                          onChange={(event)=>uploadImage(event)}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Detail</label>
                      <CKEditor
                         editor={ClassicEditor}
                         className="form-control"
                         rows={10}
                         onChange={handleTextarea}
                         data={ckeditor}/>
                    </div>
                    <div className="col-md-6">
                       {showImage &&  
                        <img src={showImage} style={styles.image} height="180px" width="200px" alt="img"/>
                      }
                    </div>
                    <div className="col-12"  style={{'textAlign':'center'}}>     
                       <button type="reset" style={{"marginRight":"40px"}} className="btn btn-outline-danger">Reset</button>           
                       <button type="submit" className="btn btn-outline-danger">Save</button>
                    </div>
            </form> 
        </div>
        </div>
    );
}
export default CreateProduct;
const styles = {
  image: { borderRadius:"10px" },
  check : {padding:"5px"},
  button : {marginTop: "10px",marginLeft:"5px"},
}
