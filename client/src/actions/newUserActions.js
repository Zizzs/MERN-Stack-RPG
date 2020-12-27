import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const giveUserDaggerSetup = (userData, abilitiesDagger, abilitiesUtility) => {
  let data = {
    userData: userData,
  };

  console.log(userData, abilitiesDagger, abilitiesUtility);

  let randomWeaponId = uuidv4();

  let weapon = {
    name: "Time-Worn Dagger",
    type: "Weapon",
    subType: "Dagger",
    img: "",
    tradeable: true,
    fragment: 100,
    id: randomWeaponId,
    damage: 10,
    rarity: "Ordinary",
  };

  data.userData.character.unlockedAbilities = ["DBThrust", "DBSlice", "DBThrow", "DCShadowStep", "DCSmokeBomb", "DFThousandHits", "URFCharge", "URBDodgeBack", "UHLesserHeal", "UGFeint"];
  data.userData.character.equipment.weaponOne = weapon;
  data.userData.character.combatPrefs.preferredPosition = 4;
  data.userData.character.combatPrefs.weaponOne.weaponType = weapon;

  data.userData.character.combatPrefs.weaponOne.position.one = abilitiesDagger.basic.DBThrust;
  data.userData.character.combatPrefs.weaponOne.position.two = abilitiesDagger.basic.DBThrust;
  data.userData.character.combatPrefs.weaponOne.position.three = abilitiesDagger.basic.DBSlice;
  data.userData.character.combatPrefs.weaponOne.position.four = abilitiesDagger.basic.DBSlice;
  data.userData.character.combatPrefs.weaponOne.position.five = abilitiesDagger.basic.DBThrow;
  data.userData.character.combatPrefs.weaponOne.position.six = abilitiesDagger.basic.DBThrow;

  data.userData.character.combatPrefs.weaponOne.chainers.forward = abilitiesDagger.chainer.DCShadowStep;
  data.userData.character.combatPrefs.weaponOne.chainers.backward = abilitiesDagger.chainer.DCSmokeBomb;

  data.userData.character.combatPrefs.weaponOne.finisher = abilitiesDagger.finisher.DFThousandHits;

  data.userData.character.combatPrefs.utility.heal = abilitiesUtility.heal.UHLesserHeal;

  data.userData.character.combatPrefs.utility.reposition.forward = abilitiesUtility.reposition.forward.URFCharge;
  data.userData.character.combatPrefs.utility.reposition.backward = abilitiesUtility.reposition.backward.URBDodgeBack;

  data.userData.character.combatPrefs.utility.generic = abilitiesUtility.generic.UGFeint;

  data.userData.character.newUser = false;

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