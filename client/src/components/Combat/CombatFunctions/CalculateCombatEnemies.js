import { enemyTable } from "./MonsterTable";

let monster = {};
function calculateCombatEnemies(userLocation, zoneData, regionData) {
  let table = {};

  if (userLocation === "/Zone/CelestialTower") {
    //monster = { ...enemies.skeletonWarrior };
    table = enemyTable.CelestialTower.enemies;
  }

  if (userLocation === "/Zone/CrystalForest") {
    table = enemyTable.CrystalForest.enemies;
  }

  let totalWeight = 0;
  let randomNumber = 0;

  for(let enemyKey in table){
    let enemy = table[enemyKey];
    totalWeight += enemy.weight;
  }

  randomNumber = Math.round((Math.random() * totalWeight) + 1);

  console.log(randomNumber);

  let currentWeightTotal = 0;
  for(let enemyKey in table){
    currentWeightTotal += table[enemyKey].weight;
    if(randomNumber <= currentWeightTotal){
      monster = {...table[enemyKey].obj};
      break;
    }
  }
  return monster;
}

export default calculateCombatEnemies;

// Most likely will move this to serverside, so the server can hold the monster data.
