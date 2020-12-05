import { enemies } from "./MonstersTemp";

let monster = {};
function calculateCombatEnemies(location) {
  if (location === "/Zone/CelestialTower") {
    monster = { ...enemies.skeleton };
  }

  if (location === "/Zone/CrystalForest") {
    monster = { ...enemies.soulBandit };
  }
  return monster;
}

export default calculateCombatEnemies;

// Most likely will move this to serverside, so the server can hold the monster data.
