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
export const unlockAbility = (userData, ability) => {
  let data = {
    userData: userData
  };

  if (!data.userData.character.unlockedAbilities.includes(ability.info.id)) {
    console.log("Learned");
    if (
      ability.info.weapon === "Dagger" &&
      data.userData.character.experience.daggers >= ability.cost.experience
    ) {
      data.userData.character.experience.daggers -= ability.cost.experience;
      data.userData.character.unlockedAbilities.push(ability.info.id);
    }

    if (
      ability.info.weapon === "Bow" &&
      data.userData.character.experience.bows >= ability.cost.experience
    ) {
      data.userData.character.experience.bows -= ability.cost.experience;
      data.userData.character.unlockedAbilities.push(ability.info.id);
    }

    if (
      ability.info.weapon === "Staff" &&
      data.userData.character.experience.staves >= ability.cost.experience
    ) {
      data.userData.character.experience.staves -= ability.cost.experience;
      data.userData.character.unlockedAbilities.push(ability.info.id);
    }

    if (
      ability.info.weapon === "Wand" &&
      data.userData.character.experience.wands >= ability.cost.experience
    ) {
      data.userData.character.experience.wands -= ability.cost.experience;
      data.userData.character.unlockedAbilities.push(ability.info.id);
    }

    if (
      ability.info.weapon === "Sword" &&
      data.userData.character.experience.daggers >= ability.cost.experience
    ) {
      data.userData.character.experience.swords -= ability.cost.experience;
      data.userData.character.unlockedAbilities.push(ability.info.id);
    }

    if (
      ability.info.weapon === "Utility" &&
      data.userData.character.experience.daggers >= ability.cost.experience
    ) {
      data.userData.character.experience.utility -= ability.cost.experience;
      data.userData.character.unlockedAbilities.push(ability.info.id);
    }
  }

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
