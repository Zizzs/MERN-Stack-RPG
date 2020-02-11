import axios from "axios";
import { updateCurrentUser } from "./authActions";

// Give the user an item
export const getAllAbilities = () => {
  return axios({
    method: "get",
    url: "/api/abilities/getAllAbilities",
    headers: { "Content-Type": "application/json" }
  })
    .then(function(response) {
      //console.log(response.data.abilities);
      return response.data.abilities;
    })
    .catch(function(error) {
      //console.log(error);
    });
};

// Unlock ability for the user
export const unlockAbility = (userData, ability) => {
  let data = {
    userData: userData
  };

  if (!data.userData.character.unlockedAbilities.includes(ability.info.id)) {
    //console.log("Learned");
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

  return updateCurrentUser(data.userData);
};

export const saveWeapon = (weapon, weaponPosition, userData) => {
  let data = {
    userData: userData
  };

  if (weaponPosition === "Weapon One") {
    data.userData.character.combatPrefs.weaponOne.weaponType = weapon;
  }

  if (weaponPosition === "Weapon Two") {
    data.userData.character.combatPrefs.weaponTwo.weaponType = weapon;
  }

  return updateCurrentUser(data.userData);
};

export const savePreferredPosition = (newPosition, userData) => {
  userData.character.combatPrefs.preferredPosition = newPosition;
  return updateCurrentUser(userData);
};

// Unlock ability for the user
export const saveAbilityAtPosition = (
  skill,
  ability,
  userData,
  updateWeaponOne,
  updateWeaponTwo
) => {
  let data = {
    userData: userData
  };

  //console.log(skill, ability, userData, updateWeaponOne, updateWeaponTwo);

  if (updateWeaponOne) {
    if (skill === "Position 1") {
      data.userData.character.combatPrefs.weaponOne.position.one = ability;
    }

    if (skill === "Position 2") {
      data.userData.character.combatPrefs.weaponOne.position.two = ability;
    }

    if (skill === "Position 3") {
      data.userData.character.combatPrefs.weaponOne.position.three = ability;
    }

    if (skill === "Position 4") {
      data.userData.character.combatPrefs.weaponOne.position.four = ability;
    }

    if (skill === "Position 5") {
      data.userData.character.combatPrefs.weaponOne.position.five = ability;
    }

    if (skill === "Position 6") {
      data.userData.character.combatPrefs.weaponOne.position.six = ability;
    }

    if (skill === "Chainer Forward") {
      data.userData.character.combatPrefs.weaponOne.chainers.forward = ability;
    }

    if (skill === "Chainer Backward") {
      data.userData.character.combatPrefs.weaponOne.chainers.backward = ability;
    }

    if (skill === "Finisher") {
      data.userData.character.combatPrefs.weaponOne.finisher = ability;
    }
  }

  if (updateWeaponTwo) {
    if (skill === "Position 1") {
      data.userData.character.combatPrefs.weaponTwo.position.one = ability;
    }

    if (skill === "Position 2") {
      data.userData.character.combatPrefs.weaponTwo.position.two = ability;
    }

    if (skill === "Position 3") {
      data.userData.character.combatPrefs.weaponTwo.position.three = ability;
    }

    if (skill === "Position 4") {
      data.userData.character.combatPrefs.weaponTwo.position.four = ability;
    }

    if (skill === "Position 5") {
      data.userData.character.combatPrefs.weaponTwo.position.five = ability;
    }

    if (skill === "Position 6") {
      data.userData.character.combatPrefs.weaponTwo.position.six = ability;
    }

    if (skill === "Chainer Forward") {
      data.userData.character.combatPrefs.weaponTwo.chainers.forward = ability;
    }

    if (skill === "Chainer Backward") {
      data.userData.character.combatPrefs.weaponTwo.chainers.backward = ability;
    }

    if (skill === "Finisher") {
      data.userData.character.combatPrefs.weaponTwo.finisher = ability;
    }
  }

  if (skill === "Reposition Forward") {
    data.userData.character.combatPrefs.utility.reposition.forward = ability;
  }

  if (skill === "Reposition Backward") {
    data.userData.character.combatPrefs.utility.reposition.backward = ability;
  }

  if (skill === "Heal") {
    data.userData.character.combatPrefs.utility.heal = ability;
  }

  if (skill === "Generic") {
    data.userData.character.combatPrefs.utility.generic = ability;
  }

  return updateCurrentUser(data.userData);
};

export const filterAbilities = (
  unlockedAbilityIds,
  allAbilities,
  weapon,
  skill
) => {
  //console.log(unlockedAbilityIds);
  let abilityList = [];
  for (let id of unlockedAbilityIds) {
    // Dagger Abilities
    //console.log(`Looking for ${id}`);
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
    //console.log(id);
    if (id[0] === "U" && weapon === "Utility") {
      if (id[1] === "R") {
        if (id[2] === "F" && skill === "Reposition Forward") {
          for (let abilityId in allAbilities.utility.reposition.forward) {
            if (id === abilityId) {
              abilityList.push(allAbilities.utility.reposition.forward[id]);
            }
          }
        }

        if (id[2] === "B" && skill === "Reposition Backward") {
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

  //console.log(abilityList, skill);

  if (skill === "Any") {
    return abilityList;
  }

  if (skill === "Position 1") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (
        obj.info.id[1] === "B" &&
        obj.position.minPosition <= 1 &&
        obj.position.maxPosition >= 1 &&
        obj.info.type === "Basic"
      ) {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Position 2") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (
        obj.info.id[1] === "B" &&
        obj.position.minPosition <= 2 &&
        obj.position.maxPosition >= 2 &&
        obj.info.type === "Basic"
      ) {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Position 3") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (
        obj.info.id[1] === "B" &&
        obj.position.minPosition <= 3 &&
        obj.position.maxPosition >= 3 &&
        obj.info.type === "Basic"
      ) {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Position 4") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (
        obj.info.id[1] === "B" &&
        obj.position.minPosition <= 4 &&
        obj.position.maxPosition >= 4 &&
        obj.info.type === "Basic"
      ) {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Position 5") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (
        obj.info.id[1] === "B" &&
        obj.position.minPosition <= 5 &&
        obj.position.maxPosition >= 5 &&
        obj.info.type === "Basic"
      ) {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Position 6") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (
        obj.info.id[1] === "B" &&
        obj.position.minPosition <= 6 &&
        obj.position.maxPosition >= 6 &&
        obj.info.type === "Basic"
      ) {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Chainer Forward") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (
        obj.info.id[1] === "C" &&
        obj.position.doesReposition === true &&
        obj.position.repositionDirection === "Forward" &&
        obj.info.type === "Chainer"
      ) {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Chainer Backward") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (
        obj.info.id[1] === "C" &&
        obj.position.doesReposition === true &&
        obj.position.repositionDirection === "Backward" &&
        obj.info.type === "Chainer"
      ) {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Finisher") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (obj.info.id[1] === "F" && obj.info.type === "Finisher") {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Reposition Forward") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (
        obj.info.id[1] === "R" &&
        obj.position.doesReposition === true &&
        obj.position.repositionDirection === "Forward" &&
        obj.info.type === "Reposition"
      ) {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Reposition Backward") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (obj.info.id[1] === "R" && obj.info.type === "Reposition") {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Heal") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (obj.info.id[1] === "H" && obj.info.type === "Heal") {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }

  if (skill === "Generic") {
    let newAbilityList = [];
    for (let obj of abilityList) {
      if (obj.info.id[1] === "G" && obj.info.type === "Generic") {
        newAbilityList.push(obj);
      }
    }
    return newAbilityList;
  }
};
