import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

export const getApiData = async () => {
  try {
    const res = await api.get("posts");
    return res.status === 200 ? res.data : [];
  } catch (error) {
    throw new Error(error);
  }
};

// export const getSingleCardData = async (id) => {
//   try {
//     const res = await api.get(`posts/${id}`);
//     return res.status === 200 ? res.data : {};
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const deleteSingleCard = async (id) => {
  try {
    return await api.delete(`posts/${id}`);
  } catch (error) {
    throw new Error(error);
  }
};

export const updateSingleCardData = async (id, updateData) => {
  try {
    const res = await api.patch(`posts/${id}`, updateData);
    return res.status === 200 ? res.data : {};
  } catch (error) {
    throw new Error(error);
  }
};

export const addNewTask = async (task) => {
  try {
    const res = await api.post("posts", task);
    return res.status === 201 ? res.data : {};
  } catch (error) {
    throw new Error(error);
  }
};
