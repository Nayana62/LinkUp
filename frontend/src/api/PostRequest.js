import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`post/${id}/like`, { userId: userId });
export const deletePost = (id, userId) =>
  API.delete(`/post/${id}`, { data: { userId: userId } });

// To include the userId in the DELETE request, you need to add it to the data field because the HTTP DELETE method doesn't typically include a request body, or alternatively,  we can use query parameters or the URL path to pass userId to the backend.
