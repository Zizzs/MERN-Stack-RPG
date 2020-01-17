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

// Unlock ability for the user
export const unlockAbility = (userData, id) => {
  let data = {
    userData: userData
  };

  data.userData.character.unlockedAbilities.push(id);

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
