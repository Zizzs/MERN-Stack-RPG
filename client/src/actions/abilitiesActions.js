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

export const filterAbilities = (unlockedAbilityIds, allAbilities, weapon) => {
  console.log(unlockedAbilityIds);
  let abilityList = [];
  for (let id of unlockedAbilityIds) {
    // Dagger Abilities
    console.log(`Looking for ${id}`);
    if (id[0] === "D" && weapon === "Dagger") {
      if (id[1] === "B") {
        for (let abilityId in allAbilities.dagger.basic) {
          if (id === abilityId) {
            abilityList.push(allAbilities.dagger.basic[id]);
          }
        }
      }

      if (id[1] === "C") {
        for (let abilityId in allAbilities.dagger.chainer) {
          if (id === abilityId) {
            abilityList.push(allAbilities.dagger.chainer[id]);
          }
        }
      }

      if (id[1] === "F") {
        for (let abilityId in allAbilities.dagger.finisher) {
          if (id === abilityId) {
            abilityList.push(allAbilities.dagger.finisher[id]);
          }
        }
      }
    }

    // Utility Abilities

    if (id[0] === "U" && weapon === "Utility") {
      if (id[1] === "R") {
        if (id[2] === "F") {
          for (let abilityId in allAbilities.utility.reposition.forward) {
            if (id === abilityId) {
              abilityList.push(allAbilities.utility.reposition.forward[id]);
            }
          }
        }

        if (id[2] === "B") {
          for (let abilityId in allAbilities.utility.reposition.backward) {
            if (id === abilityId) {
              abilityList.push(allAbilities.utility.reposition.backward[id]);
            }
          }
        }
      }

      if (id[1] === "H") {
        for (let abilityId in allAbilities.utility.heal) {
          if (id === abilityId) {
            abilityList.push(allAbilities.utility.heal[id]);
          }
        }
      }

      if (id[1] === "G") {
        for (let abilityId in allAbilities.utility.generic) {
          if (id === abilityId) {
            abilityList.push(allAbilities.utility.generic[id]);
          }
        }
      }
    }
  }
  return abilityList;
};
