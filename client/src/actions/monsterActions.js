import axios from "axios";
import skeletonImage from "../images/enemyImages/skeleton.png";

export const generateMonster = (
  userLocation, 
  zoneData, 
  regionData
) => {
  let data = {
    userLocation: userLocation,
    zoneData: zoneData,
    regionData: regionData
  };

  return axios({
    method: "post",
    url: "/api/monsters/calculateMonster",
    headers: { "Content-Type": "application/json" },
    data: data,
  })
    .then(function(response) {
      let monster = response.data.monster;
      monster.image = skeletonImage;
      return monster;
    })
    .catch(function(error) {
      console.log(error);
    });
};