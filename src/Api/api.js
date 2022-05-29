import axios from 'axios';

export const url='http://localhost:8080/shoe/backend/upload/';

const API_URL='http://localhost:8080/shoe/backend/';

const ourRequest = axios.CancelToken.source();

/*============================= GET API =============================*/
export const getApi = async (endpoint) => {
  try {
    let res = await axios.get(`${API_URL}${endpoint}`,{CancelToken:ourRequest.token})  
    return res.data
  } catch (error){
    console.log("error API")
  }
};

/*============================= POST API =============================*/
export const postApi = async (endpoint,data) => {
  try {
    let res = await axios({ method: 'POST',url:`${API_URL}${endpoint}`,data:data},{CancelToken:ourRequest.token})   
    return res.data
  } catch (error) {
    console.log("error API");
  }
};

/*============================= PUT API =============================*/
export const putApi = async (endpoint,data) => {
  try {
    let res = await axios({ method: 'PUT',url:`${API_URL}${endpoint}`,data:data},{CancelToken:ourRequest.token})   
    return res.data
  } catch (error) {
    console.log("error API");
  }
};

/*============================= DELETE API =============================*/
export const deleteApi = async (endpoint) => {
  try {
    let res = await axios({ method: 'DELETE',url:`${API_URL}${endpoint}`,data:null},{CancelToken:ourRequest.token})   
    return res.data
  } catch (error) {
    console.log("error API");
  }
};

/*============================= POST API PICTURE =============================*/
export const postApiImg = async (endpoint,data) => {
  try {
    let res = await axios({ method: 'POST',
                          url:`${API_URL}${endpoint}`,
                          headers :{'Content-Type': 'multipart/form-data'},
                          data:data},
                          {CancelToken:ourRequest.token})   
    return res.data
  } catch (error) {
    console.log("error API");
  }
};
