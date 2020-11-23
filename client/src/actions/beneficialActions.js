import axios from "axios";

export const healUser = (userData, healAmount) => {
  console.log(userData);
  let data = {
    userData: userData,
    healAmount: healAmount,
  };

  if(healAmount > data.userData.character.maxHealth){
    data.userData.character.health = data.userData.character.maxHealth;
  } else {
    data.userData.character.health += healAmount;

    if(data.userData.character.health > data.userData.character.maxHealth){
      data.userData.character.health = data.userData.character.maxHealth;
    }
  }

  console.log(`Healed for ${healAmount}`);

  axios({
    method: "post",
    url: "/api/saveLocalUser",
    headers: { "Content-Type": "application/json" },
    data: data,
  })
    .then(function(response) {
      //console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};