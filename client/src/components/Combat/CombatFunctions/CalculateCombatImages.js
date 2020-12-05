// Celestial Tower Images
import celestialTowerLeft from "../../../images/combatLeft.png";
import celestialTowerRight from "../../../images/combatRight.png";

import crystalForestLeft from "../../../images/zoneImages/CrystalForestLeft.png";
import crystalForestRight from "../../../images/zoneImages/CrystalForestRight.png";

let images = {};
function calculateCombatImages(location) {
  if (location === "/Zone/CelestialTower") {
    images.left = celestialTowerLeft;
    images.right = celestialTowerRight;
  }

  if (location === "/Zone/CrystalForest") {
    images.left = crystalForestLeft;
    images.right = crystalForestRight;
  }

  return images;
}

export default calculateCombatImages;
