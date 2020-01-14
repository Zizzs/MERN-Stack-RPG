import axios from "axios";

// Give the user an item
export const getAllAbilities = () => {
  return axios({
    method: "get",
    url: "/api/abilities/getAllAbilities",
    headers: { "Content-Type": "application/json" }
  })
    .then(function(response) {
      return response.data.abilities;
    })
    .catch(function(error) {
      console.log(error);
    });
};
