import skeletonImage from "../../../images/skeleton.png";

// prefPosition: 1-6 -- Monster will try to modify the space between the player to achieve their preferred position.
// movement: Number(1-5?) Most monsters will most likely be 1 or 2 movement. The amount of position the monster may move.
// attackAndMove: true/false -- Monster will perform an attack while moving if it needs to move.
// rangeOrMelee: "Melee"/"Ranged" -- Melee monsters reduce the distance(Subtracting their movement from player position), Ranged increase the distance(Adding).

// Planned Additions
// abilityies: {
//  frequency: .25 -- A Percent? Frequency that the monster may perform an ability. 1/4 chance in this case.
//  knockback: {
//    name: "Knockback", -- String, The name of the attack, to be used in a combat log.
//    power: 1, -- Number(1-5?), The power of the attack. A power of one would mean a knockback would do 1 position movement.
//    doesDamage: true, -- true/false, does damage or not
//    damage: 2, -- Number, Flat damage for the attack.
//    multiMin: 1, -- Number, Min Moltiplier for the damage of the attack. 
//    multiMax: 2, -- Number, Max Multiplier for the damage of the attack if it has any. 
//  }
//  
//}

const skeleton = {
  name: "Skeleton Warrior",
  level: 1,
  health: 100,
  attackMin: 1,
  attackMax: 3,
  prefPosition: 2,
  movement: 1,
  attackAndMove: false,
  rangeOrMelee: "Melee",
  drops: {
    minItemCount: 1,
    maxItemCount: 2,
    minFragmentCount: 25,
    maxFragmentCount: 50,
  },
  image: skeletonImage,
};

export const enemies = {
  skeleton: skeleton,
};
