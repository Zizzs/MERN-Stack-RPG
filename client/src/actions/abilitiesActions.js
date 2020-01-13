import axios from "axios";

// Give the user an item
export const getAllAbilities = () => {
  axios({
    method: "get",
    url: "/api/abilities/getAllAbilities",
    headers: { "Content-Type": "application/json" }
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
