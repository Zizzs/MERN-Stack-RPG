const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  character: {
    health: {
      type: Number,
      default: 25
    },
    maxHealth: {
      type: Number,
      default: 25
    },
    mana: {
      type: Number,
      default: 10
    },
    maxMana: {
      type: Number,
      default: 10
    },
    strength: {
      type: Number,
      default: 5
    },
    dexterity: {
      type: Number,
      default: 5
    },
    intellect: {
      type: Number,
      default: 5
    },

    luminosity: {
      type: Number,
      default: 0
    },
    spark: {
      type: Number,
      default: 0
    },
    enlightenment: {
      type: Number,
      default: 0
    },

    currentEnergy: {
      type: Number,
      default: 50
    },
    maxEnergy: {
      type: Number,
      default: 50
    },

    boundFragments: {
      type: Number,
      default: 0
    },
    unboundFragments: {
      type: Number,
      default: 0
    },

    items: Array,
    equippedItems: Array,
    bankItems: Array,
    bankSlots: {
      type: Number,
      default: 1
    },

    pylonAlpha: {
      type: Boolean,
      default: false
    },
    pylonBeta: {
      type: Boolean,
      default: false
    },
    pylonGamma: {
      type: Boolean,
      default: false
    },
    pylonDelta: {
      type: Boolean,
      default: false
    },
    location: {
      type: String,
      default: "/HUB"
    },
    unlockedAbilities: {
      type: Array,
      default: false
    },
    combatAbilities: {
      type: Object,
      default: false
    },
    experience: {
      type: Object,
      default: {
        daggers: {
          type: Number,
          default: 0
        },
        bows: {
          type: Number,
          default: 0
        },
        staves: {
          type: Number,
          default: 0
        },
        wands: {
          type: Number,
          default: 0
        },
        swords: {
          type: Number,
          default: 0
        },
        utility: {
          type: Number,
          default: 0
        }
      }
    }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = User = mongoose.model("users", UserSchema);
