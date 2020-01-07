import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS } from "./types";
import { setCurrentUser } from "./authActions";

// Give the user an item
export const giveUserItem = (userData, item) => dispatch => {
  //console.log(item);
  let data = {
    userData: userData,
    item: item
  };
  axios({
    method: "post",
    url: "/api/items/giveItem",
    headers: { "Content-Type": "application/json" },
    data: data
  })
    .then(response => {
      // Save to localStorage
      // Set token to localStorage
      console.log(response);
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const fragmentItem = (user, item) => {};
