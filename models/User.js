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
    equipment: {
      type: Object,
      default: {
        weaponOne: {
          type: Object,
          default: {}
        },
        weaponTwo: {
          type: Object,
          default: {}
        },
        helm: { type: Object, default: {} },
        chest: { type: Object, default: {} },
        shoulder: { type: Object, default: {} },
        bracer: { type: Object, default: {} },
        gloves: { type: Object, default: {} },
        boots: { type: Object, default: {} },
        belt: { type: Object, default: {} },
        ringOne: { type: Object, default: {} },
        ringTwo: { type: Object, default: {} },
        ringThree: { type: Object, default: {} },
        ringFour: { type: Object, default: {} },
        earringOne: { type: Object, default: {} },
        earringTwo: { type: Object, default: {} },
        necklace: { type: Object, default: {} }
      }
    },
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
      default: []
    },
    combatPrefs: {
      type: Object,
      default: {
        ready: false,
        weaponOne: {
          type: Object,
          weaponType: "",
          position: {
            type: Object,
            one: {
              type: Object,
              default: {}
            },
            two: {
              type: Object,
              default: {}
            },
            three: {
              type: Object,
              default: {}
            },
            four: {
              type: Object,
              default: {}
            },
            five: {
              type: Object,
              default: {}
            },
            six: {
              type: Object,
              default: {}
            }
          },
          chainers: {
            type: Object,

            forward: {
              type: Object,
              default: {}
            },
            backward: {
              type: Object,
              default: {}
            }
          },
          finisher: {
            type: Object,
            default: {}
          }
        },
        weaponTwo: {
          type: Object,
          weaponType: "",
          position: {
            type: Object,
            one: {
              type: Object,
              default: {}
            },
            two: {
              type: Object,
              default: {}
            },
            three: {
              type: Object,
              default: {}
            },
            four: {
              type: Object,
              default: {}
            },
            five: {
              type: Object,
              default: {}
            },
            six: {
              type: Object,
              default: {}
            }
          },
          chainers: {
            type: Object,

            forward: {
              type: Object,
              default: {}
            },
            backward: {
              type: Object,
              default: {}
            }
          },
          finisher: {
            type: Object,
            default: {}
          }
        },
        utility: {
          type: Object,

          heal: {
            type: Object,
            default: {}
          },
          reposition: {
            type: Object,

            forward: {
              type: Object,
              default: {}
            },
            backward: {
              type: Object,
              default: {}
            }
          },
          generic: {
            type: Object,
            default: {}
          }
        }
      }
    },
    experience: {
      type: Object,
      default: {
        daggers: 0,
        bows: 0,
        staves: 0,
        wands: 0,
        swords: 0,
        utility: 0
      }
    }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

module.exports = User = mongoose.model("users", UserSchema);
