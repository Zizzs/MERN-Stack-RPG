const damageOneAbility = {
  name: "Dagger Slice",
  direction: "none",
  melee: true,
  ranged: false,
  damageMin: 1,
  damageMax: 2,
  damageType: "physical",
  rangeMin: 1,
  rangeMax: 2,
  critChange: 0.05
};
const damageTwoAbility = {
  name: "Dagger Thrust",
  direction: "forward",
  melee: true,
  ranged: false,
  damageMin: 2,
  damageMax: 3,
  damageType: "physical",
  rangeMin: 2,
  rangeMax: 3,
  critChange: 0.05
};
const damageThreeAbility = {
  name: "Dagger Throw",
  direction: "none",
  melee: true,
  ranged: false,
  damageMin: 1,
  damageMax: 2,
  damageType: "physical",
  rangeMin: 3,
  rangeMax: 4,
  critChange: 0.05
};

const damageFourAbility = {
  name: "Feint",
  direction: "none",
  melee: false,
  ranged: false,
  damageMin: 0,
  damageMax: 0,
  damageType: "none",
  rangeMin: 4,
  rangeMax: 4,
  critChange: 0.0
};

const damageFiveAbility = {
  name: "Heal",
  direction: "none",
  melee: false,
  ranged: false,
  damageMin: 0,
  damageMax: 0,
  damageType: "none",
  rangeMin: 5,
  rangeMax: 5,
  critChange: 0.0
};

const damageSixAbility = {
  name: "Feint",
  direction: "none",
  melee: false,
  ranged: false,
  damageMin: 0,
  damageMax: 0,
  damageType: "none",
  rangeMin: 6,
  rangeMax: 6,
  critChange: 0.0
};

const repositionForward = {
  name: "Shadow Dash",
  direction: "forward",
  minDamage: 1,
  maxDamage: 2,
  minRange: 1,
  maxRange: 4,
  healthHeal: 0,
  manaHeal: 0,
  critChance: 0.05
};

const repositionBackwards = {
  name: "Retreating Dodge",
  direction: "backwards",
  minDamage: 0,
  maxDamage: 0,
  minRange: 0,
  maxRange: 0,
  healthHeal: 2,
  manaHeal: 2,
  critChance: 0.0
};

export const abilities = {
  damageAbilities: {
    one: damageOneAbility,
    two: damageTwoAbility,
    three: damageThreeAbility,
    four: damageFourAbility,
    five: damageFiveAbility,
    six: damageSixAbility
  },
  repositionAbilities: {
    forward: repositionForward,
    backward: repositionBackwards
  }
};
