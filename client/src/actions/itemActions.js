import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";
// import { GET_ERRORS, UPDATE_CURRENT_USER } from "./types";
// import { updateCurrentUser } from "./authActions";

// Give the user an item
export const giveUserItem = (userData, item) => {
  let data = {
    userData: userData,
    item: item
  };

  data.userData.character.items.push(item);

  axios({
    method: "post",
    url: "/api/saveLocalUser",
    headers: { "Content-Type": "application/json" },
    data: data
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const fragmentItem = (user, item) => {};
