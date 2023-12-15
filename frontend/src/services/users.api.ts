import axios from "axios";
import { DEFAULT_URL } from "../constants";
import { UpdateStatusReq } from "../types/users";


export const fetchUsers = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `${DEFAULT_URL}users`,
      data: null,
      headers: {
          'Content-Type': 'application/json',
      },
      withCredentials: true
  })

  if (response.status > 200) {
    // window.location.href('/signin');
    throw new Error('Network response was not ok');
  }
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('Error fetching users data');
  }
};

export const updateUserStatus = async (updateStatusReq:UpdateStatusReq) => {
  try {
    const response = await axios({
      method: 'put',
      url: `${DEFAULT_URL}users/status/${updateStatusReq.id}`,
      data: { status: updateStatusReq.status },
      headers: {
          'Content-Type': 'application/json',
      },
      withCredentials: true
  })

  if (response.status > 200) {
    // window.location.href('/signin');
    throw new Error('Network response was not ok');
  }
    const data = response.data;
    return data;
  } catch (error) {
    throw new Error('Error fetching users data');
  }
};
