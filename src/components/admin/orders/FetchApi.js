import axios from "axios";
const apiURL = process.env.REACT_APP_API_URL;

export const getAllOrder = async () => {
  try {
    let res = await axios.get(`${apiURL}/api/orders`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const editCategory = async (oId, status) => {
  let data = { status: status };
  console.log(data);
  try {
    let res = await axios.put(`${apiURL}/api/orders/${oId}`, data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteOrder = async (oId) => {
  try {
    let res = await axios.delete(`${apiURL}/api/order/delete-order/${oId}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
