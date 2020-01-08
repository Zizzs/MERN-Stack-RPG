import { enemies } from "./MonstersTemp";

let monster = {};
function calculateCombatEnemies(location) {
  if (location === "/HUB/CelestialTower") {
    monster = { ...enemies.skeleton };
  }
  return monster;
}

export default calculateCombatEnemies;
