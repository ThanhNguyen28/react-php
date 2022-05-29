import {useState} from 'react'
import { useNavigate  } from "react-router-dom"
import { postApi } from '../../Api/api'
import md5 from 'md5';
function Login() {
    let navigate = useNavigate();
    const [inputs, setInputs] = useState({});
    
    const onChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = (event) => {
       event.preventDefault()
       postApi("user/login",{email:inputs.email,password:md5(inputs.password)}).then((res)=>{
           if(res.status===200 && res.data && res.data.length > 0){
               localStorage.setItem('LOGIN', JSON.stringify(res.data));
               navigate("/admin", { replace: true });
           }else{
               alert("Login Thất Bại");
           }
       })
    }

    return ( 
    <div className="container" style={styles.container}>
    <div className="row" style={styles.row}>
       <h1> Login </h1> 
       <form onSubmit={(event)=>handleSubmit(event)}>
           <div className="form-floating col-sm-10" style={styles.divs}>
              <input type="email" className="form-control" 
                 onChange={(event)=>onChange(event)}
                 name="email"
                 id="floatingInput" placeholder='Email' required/>
              <label htmlFor="floatingInput" style={styles.label}>Email</label>
           </div>
           <div className="form-floating col-sm-10" style={styles.divs}>
              <input type="password" className="form-control"
                 name="password" 
                 onChange={(event)=>onChange(event)}
                 id="floatingPassword" placeholder='Password' required/>
              <label htmlFor="floatingPassword" style={styles.label}>Password</label>
            </div>
            <div className="col-auto" style={styles.divs}>
                <button type="submit" style={{"marginBottom":"20px"}} className="btn btn-primary col-sm-3">SIGN IN</button>
            </div>
        </form>
    </div>
    </div>
    );
}
export default Login;
const styles = {
    container:{
        margin: "auto",
        marginTop:"50px",
        width: "50%",
        border: "1px solid green",
        backgroundClip:"padding-box",
        padding:"10px",
        backgroundColor: "#9ACD32",
        boxShadow: "10px 10px #888888",
    },
    row :{ 
        textAlign: "center",
        marginTop:"50px",
        alignContent:"center",
        color:"SlateBlue"
    },
    divs :{ 
        float: "center",
        margin:"auto",
        marginTop:"20px"
    },
    label:{
        marginLeft:"20px"
    }
}
/*
 ================================ localStorage ========================================
setItem(): This method is used to add a key and a value to localStorage.
getItem(): This method is used to get an item from localStorage using the key.
removeItem(): This technique is used to delete an item from localStorage based on its key.
clear(): This technique is used to delete all instances of localStorage.
key(): When you supply a number, it aids in the retrieval of a localStorage key.
 */
