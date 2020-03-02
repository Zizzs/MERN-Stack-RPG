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
    uniqueName
  } = itemData.body;
  console.log(
    `Generating Item: ${tier}, ${type}, ${subType}, ${rarityBonus}, ${forceRarity}, ${uniqueName}`
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

  // Check for Uniques.
  // Check Type/SubType/Tier to get blueprint.
  if (type === "Weapon") {
    if (subType === "Dagger") {
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
    if (subType === "Skeleton") {
      itemBlueprint = Tokens.tierOne.skeleton;
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

  // Tokens require these 6 variables, but they also apply to weapons.
  item.name = itemBlueprint.name;
  item.type = itemBlueprint.type;
  item.subType = itemBlueprint.subType;
  item.img = itemBlueprint.img;
  item.tradeable = itemBlueprint.tradeable;
  item.id = uuidv1();

  if (type === "Token") {
    item.count = 1;
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
    item.rarity = "Ordinary";
    let roll = Math.floor(Math.random() * 10000) + 1;
    if (roll >= 5000) {
      item.rarity = "Abnormal";
      roll = Math.floor(Math.random() * 10000) + 1;
      if (roll >= 7500) {
        item.rarity = "Unusual";
        roll = Math.floor(Math.random() * 10000) + 1;
        if (roll >= 9000) {
          item.rarity = "Exceptional";
          roll = Math.floor(Math.random() * 10000) + 1;
          if (roll >= 9500) {
            item.rarity = "Peerless";
            roll = Math.floor(Math.random() * 10000) + 1;
            if (roll >= 9900) {
              item.rarity = "Fabled";
              roll = Math.floor(Math.random() * 10000) + 1;
              if (roll >= 9999) {
                item.rarity = "Ancient";
              }
            }
          }
        }
      }
    }
  }

  res.status(200).send({
    item: item
  });
};

exports.generateItem = generateItem;
