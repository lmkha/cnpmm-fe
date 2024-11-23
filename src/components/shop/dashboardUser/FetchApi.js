import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

const BearerToken = () =>
  localStorage.getItem("jwt")
    ? JSON.parse(localStorage.getItem("jwt")).token
    : false;
const Headers = () => {
  return {
    headers: {
      Authorization: `Bearer ${BearerToken()}`,
    },
  };
};

export const getUserById = async (uId) => {
  try {
    let res = await axios.get(`${apiURL}/api/users/${uId}`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePersonalInformationFetch = async (userData) => {
  console.log('User data: ', userData);
  try {
    let res = await axios.put(`${apiURL}/api/users/${userData.uId}`, userData, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderByUser = async (uId) => {
  try {
    let res = await axios.get(`${apiURL}/api/orders/user/${uId}`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (formData) => {
  console.log('Change password data: ', formData);
  try {
    let res = await axios.put(`${apiURL}/api/users/${formData.uId}/change-password`, formData, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
