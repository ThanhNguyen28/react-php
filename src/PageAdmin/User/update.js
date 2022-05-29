import { Link, useParams } from 'react-router-dom'
import {useState,useEffect} from 'react'
import {useDispatch} from 'react-redux'
import * as ACTIONS from "../../store/actions/index"
import { getApi } from '../../Api/api';
import md5 from 'md5';
function UpdateUser() {

    const [inputs, setInputs] = useState({});
    const [power, setPower] = useState();
    const [check, setcheck] = useState(false);

    const id = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
      getApi(`user/?id=${id.id}`).then((res)=>{
        setInputs(res);
      })
    }, [id.id]);
     // GET input đưa vào setInputs
    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    // Su kien check
    const onChangeCheck = (event) => {
      const target = event.target
      target.checked ? setcheck(true) : setcheck(false);
    }
    // GET select 
    const handlePower = (event) => {
        setPower(event.target.value)
    }
    
        // Submit
    const handleSubmit = (event) => {
        event.preventDefault();
        var password=null;
        var user = null;
        if(check){
          inputs.password===inputs.pass ? password=inputs.password : alert("Password không khớp")
          user = {name:inputs.name,
            password:md5(password),
            phone:inputs.phone,
            email:inputs.email,
            address:inputs.address,
            power:power ? power : inputs.email,
            id:id.id}
        }else{ 
          user = {name:inputs.name,
            phone:inputs.phone,
            email:inputs.email,
            address:inputs.address,
            power:power ? power : inputs.email,
            id:id.id}
        }
        dispatch(ACTIONS.updateUser(user,id.id))
        alert("Sửa Thành Công")
    
    }
    const handleShow = () => {
      if(check){
        return (<>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Password</label>
          <input type="password" 
            className="form-control" 
            name="password"
            onChange={(event)=>onChange(event)} 
            required/>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Retype Password</label>
          <input type="password"
            className="form-control" 
            name="pass" 
            onChange={(event)=>onChange(event)} 
            required/>
        </div></>
        )
      }
    }
    return (  
        <div className="container" style={styles.container}>
        <div className="row">
            <div className="col-12 col-sm-12">
               <h1 style={styles.title}>Update User</h1> 
            </div>
            <div>
                <Link to="/admin/user">
                   <button className="btn btn-outline-secondary">Go Back</button>
                </Link>
            </div>
        <form onSubmit={(event)=>handleSubmit(event)} style={styles.form}>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Name</label>
          <input type="text" 
            className="form-control" 
            name="name"
            value={inputs.name || ""}
            onChange={(event)=>onChange(event)} 
            placeholder="Enter Name" required/>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Email</label>
          <input type="email" 
            className="form-control" 
            name="email"
            value={inputs.email || ""}
            onChange={(event)=>onChange(event)} 
            placeholder="Enter Email" required/>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Phone</label>
          <input type="text" 
            className="form-control" 
            name="phone" 
            value={inputs.phone || ""}
            onChange={(event)=>onChange(event)} 
            placeholder="Enter Phone" required/>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Address</label>
          <input type="text" 
            className="form-control" 
            name="address"
            value={inputs.address || ""}
            onChange={(event)=>onChange(event)} 
            placeholder="Enter Address" required/>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <label className="form-label">Power</label>
          <select className="form-control" name="power"  onChange={(event)=>handlePower(event)} required>
             <option value="1">Admin</option>
             <option value="2">Quản lý sản phẩm</option>
             <option value="3">Quản lý đơn hàng</option>
          </select>
        </div>
        <div className="col-12 col-sm-6" style={styles.formDiv}>
          <input type="checkbox"
            checked={check} 
            className="form-check-input"
            onChange={(event)=>onChangeCheck(event)} /><p>Change Password</p>
        </div>
        {handleShow()}
        <div className="col-12"  style={{'textAlign':'center',"marginTop":"10px"}}>               
            <button type="submit" className="btn btn-outline-danger">Save</button>         
        </div>
      </form>
      </div>
      </div> 
    );
}

export default UpdateUser;
const styles={
  container:{
      fontFamily:"Times New Roman",
      fontSize:"18px"
  },
  title:{
      textAlign:"center",
      color:"red",
      padding:"20px"
  },
  form:{
    padding:"10px"
  },
  formDiv:{
    margin:"auto",
    with:"50%",
    marginTop:"10px"
  }
}
