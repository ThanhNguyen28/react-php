import axios from 'axios'

export const url='http://localhost:8080/shoe/backend/upload/';

const API_URL='http://localhost:8080/shoe/backend/';

const ourRequest = axios.CancelToken.source();

/*============================= GET API =============================*/
export const getApi = async (endpoint) => {
  return ( 
      await axios.get(`${API_URL}${endpoint}`,{CancelToken:ourRequest.token})  
  )
};

/*============================= POST API =============================*/
export const postApi = async (endpoint,data) => {
  return ( 
    await axios({
      method: 'POST',
      url:`${API_URL}${endpoint}`,
      data:data
      },{CancelToken:ourRequest.token})   
  )
};
/*============================= PUT API =============================*/
export const putApi = async (endpoint,data) => {
  return ( 
      await axios({
        method: 'PUT',
        url:`${API_URL}${endpoint}`,
        data:data
        },{CancelToken:ourRequest.token})  
  )
};
/*============================= DELETE API =============================*/
export const deleteApi = async (endpoint) => {
  return ( 
      await axios({
        method: 'DELETE',
        url:`${API_URL}${endpoint}`,
        data:null
        },{CancelToken:ourRequest.token})  
  )
};
export const postApiImg = async (endpoint,data) => {
  return ( 
    await axios({
      url:`${API_URL}${endpoint}`,
      method: 'POST',
      headers :{'Content-Type': 'multipart/form-data'},
      data:data
      },{CancelToken:ourRequest.token})   
  )
};
/*
import { useState, useEffect } from 'react'
import axios from 'axios'
import * as Config from '../contant/Config';
const useFetch = (url="",method='GET',req=[]) => {
    const [data,setdata]=useState([]); // useState luu data
    useEffect(() => {
      const ourRequest = axios.CancelToken.source(); // tranh loi request nhanh date load ko kip Cleanup()
      async function apiData(){
        try {
              let res = await axios({
              method:method,
              url:`${Config.API_URL}${url}`,
              data:req
              },{CancelToken:ourRequest.token})
              let data = (res && res.data) ? res.data : []; // if(res && res.data){res.data}else{[]}    
              setdata(data);
        }catch(err){
          if(axios.isCancel(err)){
            console.log('>>> Loi request nhanh : ',err.message);
          }
        }
      }
        setTimeout(()=>{
          apiData();
        },500)
    },[]);

    return {data}
}
export default useFetch;

*/
