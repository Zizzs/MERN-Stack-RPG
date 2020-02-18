// Item Types
import Weapons from "./Weapons";
import Materials from "./Materials";
import Tokens from "./Tokens";

// Item Tier will be directly related to the tier the monster killed is from. Skeletons are tier one, so they will drop tier one items.
// Item Type will be the main type that the item relates with. Materials, Weapons, and Tokens will be the initial item types. Armor will come later.
// Item Sub Type will be the variation of the main type. type: "Weapon", subType: "Dagger"
// Rarity Bonus will be a value I can add to the item generation for specific events, giving it a higher chance to be one tier higher. It will be a float. 1.26 would mean it would have a 26% higher chance to to be the next tier higher, This will just be a flat % added value, so I can force a higher tier if I want. Say a special boss?
// Force Rarity will allow me to force a specific rarity if I want to have a specific rarity to spawn.
// Unique Name will allow me to type in a unique string to generate a unique item. "Sword of Light", for Example.

// Rarity Tiers
// 1-10000 Roll for each rarity. Must hit the rarity's requirement or higher.
// Ordinary 1 - [WHITE, Damage, One Stat]
// Abnormal 5000 - [BLUE, Damage+, Two Stats, Aura]
// Unusual 7500 - [PURPLE, Damage++, All Stats, Aura+]
// Exceptional 9000 - [NEON GREEN, Damage+++, All Stats+, Aura++, Skill]
// Peerless 9500 - [NEON PINK, Damage++++, All Stats++, Aura+++, Skill+]
// Fabled 9900 - [Silver/Gold, Damage+++++, All Stats+++, Aura++++, Aura++++, Skill++]
// Ancient 9999 - [Rainbow?, Damage++++++, All Stats++++, Aura+++++, Aura+++++, Skill+++, Skill+++]

const generateItem = (
  itemTier,
  type,
  subtype,
  rarityBonus,
  forceRarity,
  uniqueName
) => {};
