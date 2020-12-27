const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema(
  {
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
            name: "Time-Worn Dagger",
            type: "Weapon",
            subType: "Dagger",
            img: "",
            tradeable: true,
            fragment: 100,
            id: "temporary-id-for-new-weapon",
            damage: 10,
            rarity: "Abnormal"
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
        default: "/Zone/HUB"
      },
      subLocation: {
        type: String,
        default: "/"
      },
      unlockedAbilities: {
        type: Array,
        default: []
      },
      combatPrefs: {
        type: Object,
        default: {
          preferredPosition: 3,
          weaponOne: {
            type: Object,
            weaponType: "",
            position: {
              one: {
                type: Object,
                info: {
                  name: "None",
                }
              },
              two: {
                type: Object,
                info: {
                  name: "None",
                }
              },
              three: {
                type: Object,
                info: {
                  name: "None",
                }
              },
              four: {
                type: Object,
                info: {
                  name: "None",
                }
              },
              five: {
                type: Object,
                info: {
                  name: "None",
                }
              },
              six: {
                type: Object,
                info: {
                  name: "None",
                }
              }
            },
            chainers: {
              forward: {
                info: {
                  name: "None",
                }
              },
              backward: {
                info: {
                  name: "None",
                }
              }
            },
            finisher: {
              info: {
                  name: "None",
                }
            }
          },
          weaponTwo: {
            type: Object,
            weaponType: "",
            position: {
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
            heal: {
              type: Object,
              info: {
                  name: "None",
                }
            },
            reposition: {
              type: Object,

              forward: {
                type: Object,
                info: {
                  name: "None",
                }
              },
              backward: {
                type: Object,
                info: {
                  name: "None",
                }
              }
            },
            generic: {
              type: Object,
              info: {
                  name: "None",
                }
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
      },
      newUser: {
        type: Boolean,
        default: true,
      }
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  { minimize: false }
);

module.exports = User = mongoose.model("users", UserSchema);
