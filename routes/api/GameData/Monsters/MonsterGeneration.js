const {enemyTable} = require("./MonsterTable");

const calculateMonster = (locationData, res) => {
  let monster = {};
  let table = {};

  let {userLocation, zoneData, regionData} = locationData.body;

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

  let currentWeightTotal = 0;
  for(let enemyKey in table){
    currentWeightTotal += table[enemyKey].weight;
    if(randomNumber <= currentWeightTotal){
      monster = {...table[enemyKey].obj};
      break;
    }
  }

  res.status(200).send({
    monster: monster,
  });

}

exports.calculateMonster = calculateMonster;