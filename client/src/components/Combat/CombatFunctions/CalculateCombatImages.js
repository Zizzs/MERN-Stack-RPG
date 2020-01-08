// Celestial Tower Images
import celestialTowerLeft from "../../../images/combatLeft.png";
import celestialTowerRight from "../../../images/combatRight.png";

let images = {};
function calculateCombatImages(location) {
  if (location === "/HUB/CelestialTower") {
    images.left = celestialTowerLeft;
    images.right = celestialTowerRight;
  }

  return images;
}

export default calculateCombatImages;
