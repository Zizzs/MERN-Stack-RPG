import { zoneData } from "./WorldZoneData"

export const calculateCurrentZoneData = (location, subLocation) => {

  let currentZoneData = {};

  if(location === "/Zone/CrystalForest"){
    if(subLocation === "Spire Path"){
      currentZoneData = zoneData.CrystalForest.spirePath;
    }

    if(subLocation === "VineFall"){
      currentZoneData = zoneData.CrystalForest.vineFall;
    }

    if(subLocation === "The Ruined Stairway"){
      currentZoneData = zoneData.CrystalForest.ruinedStairway;
    }

    if(subLocation === "The Rootway"){
      currentZoneData = zoneData.CrystalForest.rootway;
    }
  }


  //console.log(currentZoneData);


  return currentZoneData;
}