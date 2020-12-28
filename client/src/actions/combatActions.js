import axios from "axios";

export const damageUser = (userData, damage) => {
  let data = {
    userData: userData,
    damage: damage,
  };

  data.userData.character.health -= damage;

  if(data.userData.character.health < 0){
    data.userData.character.health = 0;
  }

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