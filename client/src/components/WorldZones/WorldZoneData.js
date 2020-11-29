import CrystalForestLeftImg from "../../images/zoneImages/CrystalForestLeft.png"
import CrystalForestRightImg from "../../images/zoneImages/CrystalForestRight.png"

export const zoneData = {
  CrystalForest: {
    regionSpecificData: {
      imgLeft: CrystalForestLeftImg,
      imgRight: CrystalForestRightImg,
    },
    spirePath: {
      name: "Spire Path",
      location: "/Zone/CrystalForest",
      exitOne: "/HUB",
      exitTwo: "Vinefall",
      exitThree: "The Ruined Stairway",
      exitFour: "The Rootway",  
    },
    vineFall: {
      name: "Vinefall",
      location: "/Zone/CrystalForest",
      exitOne: "Spire Path",
      exitTwo: "Underbrush",
      exitThree: "The Climb",
      exitFour: "None",  
    },
    ruinedStairway: {
      name: "The Ruined Stairway",
      location: "/Zone/CrystalForest",
      exitOne: "Spire Path",
      exitTwo: "Shimmering Rise",
      exitThree: "None",
      exitFour: "None",  
    },
    rootway: {
      name: "The Rootway",
      location: "/Zone/CrystalForest",
      exitOne: "Spire Path",
      exitTwo: "Rotting River",
      exitThree: "Lair of the Crystal Rat",
      exitFour: "None",  
    },
    underbrush: {
      name: "Underbrush",
      location: "/Zone/CrystalForest",
      exitOne: "Vinefall",
      exitTwo: "Vinemother's Garden",
      exitThree: "None",
      exitFour: "None",  
    },
    vinemotherGarden: {
      name: "Vinemother's Garden",
      location: "/Zone/CrystalForest",
      exitOne: "Underbrush",
      exitTwo: "Vinemother's Grove",
      exitThree: "None",
      exitFour: "None",  
    },
    vinemotherGrove: {
      name: "Vinemother's Grove",
      location: "/Zone/CrystalForest",
      exitOne: "Vinemother's Garden",
      exitTwo: "Twisted Vines of the Vinemother",
      exitThree: "None",
      exitFour: "None",  
    },
    vinemotherTwistedVines: {
      name: "Twisted Vines of the Vinemother",
      location: "/Zone/CrystalForest",
      exitOne: "Vinemother's Grove",
      exitTwo: "None",
      exitThree: "None",
      exitFour: "None",  
    },

  }
}