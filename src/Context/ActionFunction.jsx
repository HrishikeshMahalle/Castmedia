import axios from "axios";

const addToUserLike = async (_id, encodedToken) => {
  try {
    const response = await axios.post(
      "/api/user/likes",
      { video: { id: _id } },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error in adding to liked LIst", err);
  }
};
const addToUserWatch = async (_id, encodedToken) => {
  try {
    const response = await axios.post(
      "/api/user/watchlater",
      { video: { id: _id } },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error in adding to liked LIst", err);
  }
};
const addToUserHistory = async (_id, encodedToken) => {
  try {
    const response = await axios.post(
      "/api/user/history",
      { video: { id: _id } },
      {
        headers: {
          authorization: encodedToken,
        },
      }
    ).then((resp)=>console.log(resp))
  } catch (err) {
    console.log("Error in adding to liked LIst", err);
  }
};
const removeFrmUserLike = async (_id, encodedToken) => {
  try {
    const response = await axios
      .delete(`/api/user/likes/${_id}`, {
        headers: {
          authorization: encodedToken,
        },
      })
      .then((ress) => console.log("Remove like", ress));
    return response.data;
  } catch (err) {
    console.log("Error in removing from", err);
  }
};

export { addToUserHistory, addToUserLike, addToUserWatch, removeFrmUserLike };
