import { Link ,useParams} from 'react-router-dom'
import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import * as ACTIONS from "../../store/actions/index"
import { getApi,postApiImg } from '../../Api/api'

const ProductUpdate = ()=>{
    /* Lấy id từ url */
    const id = useParams();
    const {trademark} = useSelector((state) => state)
    const dispatch = useDispatch();
    /* Tạo State inputs = {} */
    const [inputs, setInputs] = useState({});
     // id  Trademark
    const [trademarkID, setTrademarkID] = useState();
    
     // Tạo State image
    const [image,setImage]=useState();
    // State showimage
    const [showImage,setShowImage]=useState();
    // Tạo State ckeditor
    const [ckeditor, setCkeditor] = useState("");

    useEffect(() => {
      getApi(`product/product-detail/?id=${id.id}`).then((res)=>{
        setInputs(res);
      })
    }, [id.id]);

   /* Loading trademark */ 
   useEffect(() => {
      dispatch(ACTIONS.getTrademark());
    },[dispatch]);
    
     /* GET data Textarea */
    const handleTextarea = (event, editor) => {
      const data = editor.getData();
      setCkeditor(data);
    };
    /* GET id trademark */
    const getTrademarkID = (event) => {
        setTrademarkID(event.target.value);
    }
    /* GET input đưa vào setInputs */
    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    /* GET img */
    const uploadImage = (event) => {
      if(event.target.files && event.target.files.length > 0){
        setImage(event.target.files[0])
        setShowImage(URL.createObjectURL(event.target.files[0]))
      }
    }

    /* Submit */
    const handleSubmit = (event) => {
        event.preventDefault();
        var product
        if(image){
            product = {trademark_id:trademarkID,
            name:inputs.name,
            price:inputs.price,
            discount:inputs.discount,
            quantity:inputs.quantity,
            picture:image.name,
            detail:ckeditor,
            id:id.id}
          let formData = new FormData();
          formData.append('image',image);
          postApiImg('product/saveimg',formData)
        }else{
          if(trademarkID===undefined){
            product = {
              name:inputs.name,
              price:inputs.price,
              discount:inputs.discount,
              quantity:inputs.quantity,
              detail:ckeditor,
              id:id.id}
          }else{
            product = {trademark_id:trademarkID,
              name:inputs.name,
              price:inputs.price,
              discount:inputs.discount,
              quantity:inputs.quantity,
              detail:ckeditor,
              id:id.id}
          }
        }
        dispatch(ACTIONS.updateProduct(product,id.id))
        alert("Lưu Thành Công")
    }

    return (
        <div className="container" style={styles.container}>
        <div className="row">
            <div className="col-12 col-sm-12">
               <h1 style={styles.title}>Update Product</h1> 
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
                        <select className="form-control" 
                           onChange={(event)=>getTrademarkID(event)}>
                            { trademark && trademark.length > 0 &&
                              trademark.map((item) => {
                                return <option key={item.id} value={item.id} >{item.name}</option>      // selected={item.id===inputs.trademark_id && 'selected'}   
                              })
                            }
                        </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Discount</label>
                        <input 
                           min={1}
                           type="number" 
                           className="form-control"  
                           name="discount" 
                           value={inputs.discount || ""}
                           onChange={(event)=>onChange(event)} 
                           placeholder="Enter Discount" required/>
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
                         data={inputs.detail || ""}/>
                    </div>
                    <div className="col-md-6">
                       {showImage &&  
                        <img src={showImage} style={styles.image} height="150px" width="100px" alt="img"/>
                      }
                    </div>
                    <div className="col-12"  style={{'textAlign':'center'}}>               
                       <button type="submit" className="btn btn-outline-danger">Save</button>         
                    </div>
            </form> 
        </div>
        </div>
    );
}
export default ProductUpdate;
const styles = {
  title:{
    textAlign:"center",
    color:"red",
    padding:"20px"
  },
  container:{
    fontFamily:"Times New Roman",
    fontSize:"18px"
  },
  image: { borderRadius:"10px" },
  check : {padding:"5px"},
  button : {marginTop: "10px",marginLeft:"5px"}
}
/*
 * Sử dụng useSelector của react-redux để lấy state từ store.
 * Sử dụng useDispatch để trả về function dispatch, 
 * truyền getAll vào dispatch để gọi 2 action này
 */