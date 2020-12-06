import { enemies } from "./MonstersTemp";

export const enemyTable = {
  CelestialTower:{
    location: "/Zone/CelestialTower",
    enemies: {
      skeletonWarrior: {
        obj: enemies.skeletonWarrior,
        weight: 35,
      },
      rickitySkeleton: {
        obj: enemies.rickitySkeleton,
        weight: 60,
      },
      skeletonGiant: {
        obj: enemies.skeletonGiant,
        weight: 15,
      },
    }
  },
  CrystalForest:{
    location: "/Zone/CrystalForest",
    enemies: {
      soulBandit: {
        obj: enemies.soulBandit,
        weight: 25,
      },
      youngTreant: {
        obj: enemies.youngTreant,
        weight: 50,
      },
      crystalRatBaby: {
        obj: enemies.crystalRatBaby,
        weight: 60,
      },
      
    }
  }
  
};
