import { zoneData } from "./WorldZoneData"

console.log(zoneData);

export const calculateCurrentZoneData = (region, subLocation) => {

  let currentZoneData = {};

  if(region === "/Zone/HUB"){
    currentZoneData = zoneData.HUB;
  }

  if(region === "/Zone/CrystalForest"){
    let regionData = zoneData.CrystalForest;

    console.log(regionData);

    for (const subZone in regionData){
      if(regionData[subZone].name === subLocation){
        currentZoneData = regionData[subZone];
      }
    }
  }

  console.log(currentZoneData);
  return currentZoneData;
}

export const calculateCurrentRegionData = (region) => {

  let regionData = {};

  if(region === "/Zone/CrystalForest"){
    regionData = zoneData.CrystalForest.regionSpecificData;
  }

  return regionData;
}