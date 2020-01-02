import axios from "axios";

import { GET_ERRORS } from "./types";

// Login - get user token
export const giveUserItem = (userData, item) => dispatch => {
  console.log(item);
  let data = {
    userData: userData,
    item: item
  };
  axios
    .post("/api/items", data)
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
