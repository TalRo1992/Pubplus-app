import axios from "axios";
import { DEFAULT_URL } from "../constants";

export const login = async (username:string , password:string) => {
  try {
    const response = await axios({
      method: 'post',
      url: `${DEFAULT_URL}auth/login`,
      data: {username,password},
      headers: {
          'Content-Type': 'application/json',
      },
      withCredentials: true
  })

  if(response.status === 200){
    return response.data;
  }
  } catch (error) {
    throw new Error('Internal Error');
  }
};

export const logout = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${DEFAULT_URL}auth/logout`,
      data: null,
      headers: {
          'Content-Type': 'application/json',
      },
      withCredentials: true
  })

  return response;
  } catch (error) {
    throw new Error('Internal Error');
  }
};
