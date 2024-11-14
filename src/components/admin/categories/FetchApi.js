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

export const getAllCategory = async () => {
  try {
    let res = await axios.get(
      `${apiURL}/api/categories`,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const createCategory = async ({
  cName,
  cImage,
  cDescription,
  cStatus,
}) => {
  let formData = new FormData();
  formData.append("cImage", cImage);
  formData.append("cName", cName);
  formData.append("cDescription", cDescription);
  formData.append("cStatus", cStatus);

  try {
    let res = await axios.post(
      `${apiURL}/api/categories`,
      formData,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log('vai linh hon')
    console.log(error);
  }
};

export const editCategory = async (cId, des, status) => {
  let data = { cDescription: des, cStatus: status };
  try {
    let res = await axios.put(
      `${apiURL}/api/categories/${cId}`,
      data,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCategory = async (cId) => {
  try {
    let res = await axios.delete(
      `${apiURL}/api/categories/${cId}`,
      Headers()
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
