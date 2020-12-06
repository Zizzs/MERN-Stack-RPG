import { zoneData } from "./WorldZoneData"

export const calculateCurrentZoneData = (region, subLocation) => {

  let currentZoneData = {};

  if(region === "/Zone/HUB"){
    currentZoneData = zoneData.HUB;
  }

  if(region === "/Zone/CelestialTower"){
    currentZoneData = zoneData.CelestialTower;
  }

  if(region === "/Zone/CrystalForest"){
    let regionData = zoneData.CrystalForest;

    for (const subZone in regionData){
      if(regionData[subZone].name === subLocation){
        currentZoneData = regionData[subZone];
      }
    }
  }
  
  return currentZoneData;
}

export const calculateCurrentRegionData = (region) => {

  let regionData = {};

  if(region === "/Zone/CrystalForest"){
    regionData = zoneData.CrystalForest.regionSpecificData;
  }

  return regionData;
}