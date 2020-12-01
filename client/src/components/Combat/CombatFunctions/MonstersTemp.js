import skeletonImage from "../../../images/skeleton.png";

const skeleton = {
  name: "Skeleton Warrior",
  level: 1,
  health: 100,
  attackMin: 1,
  attackMax: 3,
  prefPosition: 2,
  attackAndMove: false,
  rangeOrMelee: "Melee",
  movement: 1,
  drops: {
    minItemCount: 1,
    maxItemCount: 2,
    minFragmentCount: 25,
    maxFragmentCount: 50,
  },
  image: skeletonImage,
};

export const enemies = {
  skeleton: skeleton,
};
