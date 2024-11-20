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


export const getSingleProduct = async (pId) => {
  try {
    let res = await axios.get(`${apiURL}/api/products/${pId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postAddReview = async (formData) => {
  console.log('Review product', formData);
  const reqData = {
    uId: formData.uId,
    rating: formData.rating,
    review: formData.review,
  }
  try {
    let res = await axios.post(`${apiURL}/api/products/${formData.pId}/review`, reqData, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const postDeleteReview = async (formData) => {
  console.log('Delete review', formData);
  try {
    let res = await axios.delete(`${apiURL}/api/products/${formData.pId}/review/${formData.rId}`, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const putEditReview = async (formData) => {
  console.log('Review product', formData);
  const reqData = {
    uId: formData.uId,
    rating: formData.rating,
    review: formData.review,
  }
  try {
    let res = await axios.put(`${apiURL}/api/products/${formData.pId}/review/${formData.rId}`, reqData, Headers());
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
