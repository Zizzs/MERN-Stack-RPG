// Item Types
const Weapons = require("./Weapons");
const Materials = require("./Materials");
const Tokens = require("./Tokens");
const uuidv1 = require("uuid/v1");

// Item Tier will be directly related to the tier the monster killed is from. Skeletons are tier one, so they will drop tier one items. Integer. 1/2/3..
// Item Type will be the main type that the item relates with. Materials, Weapons, and Tokens will be the initial item types. Armor will come later.
// Item Sub Type will be the variation of the main type. type: "Weapon", subType: "Dagger"
// Rarity Bonus will be a value I can add to the item generation for specific events, giving it a higher chance to be one tier higher. It will be a float. 1.26 would mean it would have a 26% higher chance to to be the next tier higher, This will just be a flat % added value, so I can force a higher tier if I want. Say a special boss?
// Force Rarity will allow me to force a specific rarity if I want to have a specific rarity to spawn.
// Unique Name will allow me to type in a unique string to generate a unique item. "Sword of Light", for Example.

const generateItem = (itemData, res) => {
  //console.log(itemData);
  let {
    tier,
    type,
    subType,
    rarityBonus,
    forceRarity,
    uniqueName,
    amount,
  } = itemData.body;
  console.log(
    `Generating Item: Tier: ${tier} Type: ${type}, SubType: ${subType}, RarityBonus: ${rarityBonus}, ForceRarity: ${forceRarity}, UniqueName: ${uniqueName}, Amount: ${amount}`
  );
  // Create Item Base
  let item = {};

  // Create Item Blueprint Base (Will contain the instructions on how to build the item)
  // {
  //   name: "Time-Worn Dagger",
  //   itemType: "Weapon",
  //   itemSubType: "Dagger",
  //   tradeable: true,
  //   damageRangeMin: 1,
  //   damageRangeMax: 10,
  //   canRollStats: true,
  //   canRollSkills: true,
  //   canRollAuras: true,
  //   fragment: 100
  // }
  let itemBlueprint = {};

  let tempSubType = subType;
  // An array of all current available weapon subtypes.
  let availableWeaponSubTypes = ["Dagger"];
  // An array of all current available material subtypes.
  let availableMaterialSubTypes = ["Metal", "Wood", "Cloth"];
  // An array of all current available token subtypes.
  let availableTokenSubTypes = ["Rusted"];

  if (tempSubType === "Any") {
    if (type === "Weapon") {
      tempSubType = availableWeaponSubTypes[Math.floor(Math.random() * Math.floor(availableWeaponSubTypes.length))];
    }

    if (type === "Material") {
      tempSubType = availableMaterialSubTypes[Math.floor(Math.random() * Math.floor(availableMaterialSubTypes.length))];
    }

    if (type === "Token") {
      tempSubType = availableTokenSubTypes[Math.floor(Math.random() * Math.floor(availableTokenSubTypes.length))];
    }
  }

  // Check for Uniques.
  // Check Type/SubType/Tier to get blueprint.
  if (type === "Weapon") {
    if (tempSubType === "Dagger") {
      if (tier === 1) {
        itemBlueprint =
          Weapons.daggers.tierOne[
            Math.floor(
              Math.random() * Math.floor(Weapons.daggers.tierOne.length)
            )
          ];
      }
    }
  }

  if (type === "Token") {
    if (tier === 1) {
      if (tempSubType === "Rusted") {
        itemBlueprint = Tokens.tokens.tierOne.rusted;
      }
    }
  }

  if (type === "Material") {
    if (tier === 1) {
      if (tempSubType === "Metal") {
        itemBlueprint = Materials.materials.tierOne.metal;
      }

      if (tempSubType === "Cloth") {
        itemBlueprint = Materials.materials.tierOne.cloth;
      }

      if (tempSubType === "Wood") {
        itemBlueprint = Materials.materials.tierOne.wood;
      }
    }
  }

  // Build Item from Blueprint
  // Example Weapon:
  // let dagger = {
  //   id="0"
  //   rarity: "Ordinary"
  //   type: "Dagger",
  //   subOne: "Pointy",
  //   subTwo: "Rusty",
  //   damage: 5,
  //   statBonus: {
  //     dex: 0,
  //     str: 0,
  //     int: 0,
  //     spark: 0,
  //     luminosity: 0,
  //     enlightenment: 0,
  //   }
  //   hasSkills: false,
  //   skills: [{},{}],
  //   hasAuras: false,
  //   auras: [{},{}],
  // }

  // Tokens require these 7 variables, but they also apply to weapons.
  item.name = itemBlueprint.name;
  item.type = itemBlueprint.type;
  item.subType = tempSubType;
  item.img = itemBlueprint.img;
  item.tradeable = itemBlueprint.tradeable;
  item.fragment = itemBlueprint.fragment;
  item.id = uuidv1();

  if (type === "Token") {
    item.count = amount;
  }

  if (type === "Material") {
    item.count = amount;
  }

  // Build
  if (type === "Weapon") {
    item.damage = Math.floor(
      Math.random() *
        (itemBlueprint.damageRangeMax - itemBlueprint.damageRangeMin + 1) +
        itemBlueprint.damageRangeMin
    );

    // Roll Rarity or Force Rarity and Modify Item
    // Rarity Tiers
    // 1-10000 Roll for each rarity. Must hit the rarity's requirement or higher.
    // Ordinary 1 - [WHITE, Damage, One Stat]
    // Abnormal 5000 - [BLUE, Damage+, Two Stats, Aura]
    // Unusual 7500 - [PURPLE, Damage++, All Stats, Aura+]
    // Exceptional 9000 - [NEON GREEN, Damage+++, All Stats+, Aura++, Skill]
    // Peerless 9500 - [NEON PINK, Damage++++, All Stats++, Aura+++, Skill+]
    // Fabled 9900 - [Silver/Gold, Damage+++++, All Stats+++, Aura++++, Aura++++, Skill++]
    // Ancient 9999 - [Rainbow?, Damage++++++, All Stats++++, Aura+++++, Aura+++++, Skill+++, Skill+++]
    let extraDamageRollMax = 0;
    let rollIsSuccessful = true;
    let currentRarityBonus = rarityBonus;
    let rarityArray = [
      {rarity: "Ordinary", requiredRoll: 0, bonusStats: {damage: 0}},
      {rarity: "Abnormal", requiredRoll: 5000, bonusStats: {damage: 5}},
      {rarity: "Unusual", requiredRoll: 7500, bonusStats: {damage: 7}},
      {rarity: "Exceptional", requiredRoll: 8500, bonusStats: {damage: 9}},
      {rarity: "Peerless", requiredRoll: 9500, bonusStats: {damage: 11}},
      {rarity: "Fabled", requiredRoll: 9900, bonusStats: {damage: 13}},
      {rarity: "Ancient", requiredRoll: 9990, bonusStats: {damage: 15}},
    ];

    
    for (let rarityObj of rarityArray) {
      if(rollIsSuccessful){
        let roll = (Math.floor(Math.random() * 10000) + 1);
        let difference = rarityObj.requiredRoll - roll;
        //console.log(roll, rarityObj.requiredRoll, rarityObj.rarity, currentRarityBonus);
        if (roll >= rarityObj.requiredRoll) {
          extraDamageRollMax += rarityObj.bonusStats.damage;
          item.rarity = rarityObj.rarity;
        } else if (roll < rarityObj.requiredRoll && currentRarityBonus >= difference) {
          currentRarityBonus -= difference;
          extraDamageRollMax += rarityObj.bonusStats.damage;
          item.rarity = rarityObj.rarity;
        } else {
          rollIsSuccessful = false;
        }
      }
    }


    item.damage += Math.floor(
      Math.random() *
        (extraDamageRollMax - (extraDamageRollMax / 2) + 1) +
        extraDamageRollMax / 2
    );
    
  }

  res.status(200).send({
    item: item,
  });
};

exports.generateItem = generateItem;
