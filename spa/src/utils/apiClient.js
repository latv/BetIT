import axios from 'axios';
import jwt from './jwt';
import {message} from 'antd';
const request = async (url, data, method,isAuthorized=true) => {

  const requestConfig = {
    url: url,
    method: method,
    baseURL: process.env.REACT_APP_BACKEND_URL,
    responseType: 'json',
    // headers: {'Authorization': jwt.getHeader()},
  };
  if (jwt.isAuthorized())
  {
    requestConfig.headers = {'Authorization': jwt.getHeader()};
  }
  if (isAuthorized===false){
    requestConfig.headers = {'Authorization': jwt.getHeader()};
  }

  if (method === 'GET') {
    requestConfig.params = data;
  } else {
    requestConfig.data = data;
  }

  try {
    const response = await axios.request(requestConfig);

  if (url=== '/api/auth/refresh'){
    console.log('jwt stuff',response.data.token);
    jwt.deleteToken();
    jwt.saveToken(response.data.token,response.data.expiresIn);
  }
    return response.data;
  } catch (e) {
    console.log('error: ',e.response.status);
    if(e.response.status === 401 && isAuthorized === true){
      try{
      let response = await request('/api/auth/refresh',{},"GET",false);
      jwt.saveToken(response.token, response.expiresIn);
      console.log(response);}
      catch(e){
        console.log(e);
        // jwt.deleteToken();

      }

    }
    throw e;




  }
}


export default { request };
