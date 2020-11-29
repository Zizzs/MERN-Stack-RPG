import { zoneData } from "./WorldZoneData"

export const calculateCurrentZoneData = (region, subLocation) => {

  let currentZoneData = {};

  if(region === "/Zone/CrystalForest"){
    let regionData = zoneData.CrystalForest;

    for (const subZone in regionData){
      if(regionData[subZone].name === subLocation){
        console.log(`Found Zone Data for: ${subLocation}`);
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