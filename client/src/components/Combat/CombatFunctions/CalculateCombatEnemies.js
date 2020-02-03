import { enemies } from "./MonstersTemp";

let monster = {};
function calculateCombatEnemies(location) {
  if (location === "/HUB/CelestialTower") {
    monster = { ...enemies.skeleton };
  }
  return monster;
}

export default calculateCombatEnemies;

// Most likely will move this to serverside, so the server can hold the monster data.
