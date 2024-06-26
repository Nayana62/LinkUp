import * as PostApi from "../api/PostRequest";

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const deletePostAction = (id, userId) => async (dispatch) => {
  try {
    dispatch({ type: "DELETE_POST_START" });
    await PostApi.deletePost(id, userId);
    dispatch({ type: "DELETE_POST_SUCCESS", payload: id });
  } catch (error) {
    console.log(error);
    dispatch({ type: "DELETE_POST_FAIL" });
  }
};
