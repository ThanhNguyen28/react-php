import React,{useEffect} from 'react'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import ItemUser from './items'
import * as ACTIONS from '../../store/actions/index'
import Search from './search'
import { Pages } from '../../hooks/pages'

const User = () => {
/* ================ USER ================ */
    const user= useSelector((state) => state.user);
    const dispatch = useDispatch();
/* ================ GET PAGE ================ */
    const {data,page} = Pages(user);
/* ================ LOADING USER ================ */
    useEffect(() => {
        dispatch(ACTIONS.getUser())
    },[dispatch]) 
    /* Load lai khi thuc hien dispatch */
/* ================ LOADING USER ================ */

/* ================ UPDATE STATUS ================ */
    const handleUpdateStatus = (id,status) =>{
        status===1 ? status=0 :  status=1 // Câu điều kiện if
        dispatch(ACTIONS.updateStatusUser({status:status},id))
    }
/* ================ UPDATE STATUS ================ */

/* ================ DELETE ================ */
    const handleDelete = (id) => {
        if(window.confirm("Bạn có chắc trắng muốn xóa ")){ 
            dispatch(ACTIONS.deleteUser(id))
        }
    } 
/* ================ DELETE ================ */

/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */
    const handleOpposite = () => {
       dispatch(ACTIONS.oppositeUser())
    }
/* ================ OPPOSITE : ĐẢO NGƯỢC ================ */

    return (  
        <div className="container" style={styles.container}>
          <div className="row">
            <div className="col-12 col-sm-12">
               <h1 style={styles.title}>User</h1> 
            </div>
            <div>
                <Link to="/admin/user/create">
                  <button className="btn btn-outline-secondary">Create User</button>
                </Link>
            </div>
           <Search/>
           <table className="table table-hover" id="table">
                <thead>
                  <tr>
                    <th><i className="bi bi-arrow-down-up" onClick={()=>handleOpposite()} style={styles.opposite}></i>
                        ID
                    </th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Power</th>
                    <th>Status</th>
                    <th>Update|Delete</th>
                   </tr>
                </thead>
                <tbody>
                    <ItemUser // truyền tới : import ItemTheGroup from '../TheGroup/items'
                        handleDelete={handleDelete}
                        handleUpdateStatus={handleUpdateStatus}
                        data={data ? data : user} />
                </tbody>
            </table>
            {page}
          </div>
        </div>
    );
}

export default User;
const styles={
    container:{
        fontFamily:"Times New Roman",
        fontSize:"18px"
    },
    opposite:{
        marginRight:"10px"
    },
    title:{
        textAlign:"center",
        color:"red",
        padding:"20px"
    }
}