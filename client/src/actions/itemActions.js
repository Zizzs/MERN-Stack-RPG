import axios from "axios";
// import setAuthToken from "../utils/setAuthToken";
// import jwt_decode from "jwt-decode";
// import { GET_ERRORS, UPDATE_CURRENT_USER } from "./types";
// import { updateCurrentUser } from "./authActions";

// Give the user an item
//itemTier,
// type,
// subType,
// rarityBonus,
// forceRarity,
// uniqueName
export const giveUserItem = (userData, item) => {
  let data = {
    userData: userData,
    item: item,
  };
  
  let foundItem = false;
  if (data.item.type === "Material" || data.item.type === "Token") {
    let index = 0;
    for (let item of data.userData.character.items) {
      if (item.name === data.item.name) {
        foundItem = true;
        index = data.userData.character.items.findIndex(item => item.name === data.item.name);
        data.userData.character.items[index].count += data.item.count;
        break;
      }
    }
  }

  if (foundItem === false) {
    data.userData.character.items.push(item);
  }

  axios({
    method: "post",
    url: "/api/saveLocalUser",
    headers: { "Content-Type": "application/json" },
    data: data,
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

// Generates an item for the user, requires tier, type, subType, rarityBonus, forceRarity, and uniqueName.

export const generateItem = (
  tier,
  type,
  subType,
  rarityBonus,
  forceRarity,
  uniqueName,
  amount
) => {
  let data = {
    tier: tier,
    type: type,
    subType: subType,
    rarityBonus: rarityBonus,
    forceRarity: forceRarity,
    uniqueName: uniqueName,
    amount: amount,
  };

  return axios({
    method: "post",
    url: "/api/items/generateItem",
    headers: { "Content-Type": "application/json" },
    data: data,
  })
    .then(function(response) {
      return response;
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const fragmentItem = (userData, item) => {
  let data = {
    userData: userData,
    item: item,
  };

  let tempItemArray = data.userData.character.items;
  for (let i = 0; i < tempItemArray.length; i++) {
    if (tempItemArray[i].id === data.item.id) {
      tempItemArray.splice(i, 1);
      break;
    }
  }

  data.userData.character.items = tempItemArray;
  data.userData.character.boundFragments += data.item.fragment;

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

export const equipWeapon = (userData, item, weaponSlot) => {
  let data = {
    userData: userData,
    item: item,
  };

  // Removes the item being equipped from the user's inventory
  let tempItemArray = data.userData.character.items;
  for (let i = 0; i < tempItemArray.length; i++) {
    if (tempItemArray[i].id === data.item.id) {
      tempItemArray.splice(i, 1);
      break;
    }
  }
  data.userData.character.items = tempItemArray;

  // Adds the currently equipped weapon into the user's inventory.
  data.userData.character.items.push(
    data.userData.character.equipment.weaponOne
  );

  // Equips the item given into the user's chosen slot (Currently only one weapon in WeaponOne)
  if (weaponSlot === "WeaponOne") {
    data.userData.character.equipment.weaponOne = data.item;
  }

  axios({
    method: "post",
    url: "/api/saveLocalUser",
    headers: { "Content-Type": "application/json" },
    data: data,
  })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};
