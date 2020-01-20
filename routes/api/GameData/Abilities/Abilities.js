// Crit Chance is Tied to the Weapon!
const Abilities = {
  dagger: {
    basic: {
      DBThrust: {
        info: {
          id: "DBThrust",
          name: "Thrust",
          weapon: "Dagger",
          type: "Basic",
          description: "A close thrusting strike against the target.",
          combatText: [
            "thrust the",
            "lunge forward and thrust with",
            "make rude faces and quickly thrust the"
          ]
        },
        cost: {
          experience: 0,
          health: 0,
          mana: 0,
          energy: 0
        },
        damage: {
          doesDamage: true,
          attackCount: 1,
          damageMin: 4,
          damageMax: 7
        },
        position: {
          doesReposition: false,
          repositionDirection: "None",
          minPosition: 1,
          maxPosition: 2
        },
        heal: {
          doesHealHealth: false,
          healthHealAmountMin: 0,
          healthHealAmountMax: 0,
          doesHealMana: false,
          manaHealAmountMin: 0,
          manaHealAmountMax: 0,
          doesHealEnergy: false,
          energyHealAmountMin: 0,
          energyHealAmountMax: 0
        }
      },
      DBSlice: {
        info: {
          id: "DBSlice",
          name: "Slice",
          weapon: "Dagger",
          type: "Basic",
          description:
            "A quick horizontal slice attack, maybe someday itll bleed too!",
          combatText: [
            "slice with your",
            "duck and slice with your favorite weapon,"
          ]
        },
        cost: {
          experience: 0,
          health: 0,
          mana: 0,
          energy: 0
        },
        damage: {
          doesDamage: true,
          attackCount: 1,
          damageMin: 2,
          damageMax: 6
        },
        position: {
          doesReposition: false,
          repositionDirection: "None",
          minPosition: 3,
          maxPosition: 4
        },
        heal: {
          doesHealHealth: false,
          healthHealAmountMin: 0,
          healthHealAmountMax: 0,
          doesHealMana: false,
          manaHealAmountMin: 0,
          manaHealAmountMax: 0,
          doesHealEnergy: false,
          energyHealAmountMin: 0,
          energyHealAmountMax: 0
        }
      },
      DBThrow: {
        info: {
          id: "DBThrow",
          name: "Throw",
          weapon: "Dagger",
          type: "Basic",
          description: "A ranged attack, in which the dagger is thrown. ",
          combatText: ["throw the", "chuck the"]
        },
        cost: {
          experience: 0,
          health: 0,
          mana: 0,
          energy: 0
        },
        damage: {
          doesDamage: true,
          attackCount: 2,
          damageMin: 1,
          damageMax: 3
        },
        position: {
          doesReposition: false,
          repositionDirection: "None",
          minPosition: 5,
          maxPosition: 6
        },
        heal: {
          doesHealHealth: false,
          healthHealAmountMin: 0,
          healthHealAmountMax: 0,
          doesHealMana: false,
          manaHealAmountMin: 0,
          manaHealAmountMax: 0,
          doesHealEnergy: false,
          energyHealAmountMin: 0,
          energyHealAmountMax: 0
        }
      }
    },
    chainer: {
      DCShadowStep: {
        info: {
          id: "DCShadowStep",
          name: "Shadow Step",
          weapon: "Dagger",
          type: "Chainer",
          description: "Dash forward through the shadows and stab the enemy.",
          combatText: [
            "duck into the shadows, reappearing closer and damaging the"
          ]
        },
        cost: {
          experience: 0,
          health: 0,
          mana: 1,
          energy: 0
        },
        damage: {
          doesDamage: true,
          attackCount: 1,
          damageMin: 10,
          damageMax: 15
        },
        position: {
          doesReposition: true,
          repositionDirection: "Forward",
          minPosition: 1,
          maxPosition: 6
        },
        heal: {
          doesHealHealth: false,
          healthHealAmountMin: 0,
          healthHealAmountMax: 0,
          doesHealMana: false,
          manaHealAmountMin: 0,
          manaHealAmountMax: 0,
          doesHealEnergy: false,
          energyHealAmountMin: 0,
          energyHealAmountMax: 0
        }
      },
      DCSmokeBomb: {
        info: {
          id: "DCSmokeBomb",
          name: "Smoke Bomb",
          weapon: "Dagger",
          type: "Chainer",
          description:
            "A retreating skill, giving you distance from the enemy.",
          combatText: [
            "throw a smoke bomb, giving you space to breathe. You hit the"
          ]
        },
        cost: {
          experience: 0,
          health: 0,
          mana: 0,
          energy: 0
        },
        damage: {
          doesDamage: true,
          attackCount: 1,
          damageMin: 1,
          damageMax: 5
        },
        position: {
          doesReposition: true,
          repositionDirection: "Backward",
          minPosition: 1,
          maxPosition: 6
        },
        heal: {
          doesHealHealth: true,
          healthHealAmountMin: 3,
          healthHealAmountMax: 5,
          doesHealMana: true,
          manaHealAmountMin: 1,
          manaHealAmountMax: 2,
          doesHealEnergy: false,
          energyHealAmountMin: 0,
          energyHealAmountMax: 0
        }
      }
    },
    finisher: {
      DFThousandHits: {
        info: {
          id: "DFThousandHits",
          name: "Thousand Hits",
          weapon: "Dagger",
          type: "Finisher",
          description:
            "A widly known skill, praised for its quick succession attacks.",
          combatText: [
            "stab the",
            "thrust and twist into the",
            "gut the",
            "slice off an unrecognizable body part from the",
            "poke a hole in the",
            "yell really loud and thrust into the"
          ]
        },
        cost: {
          experience: 0,
          health: 0,
          mana: 5,
          energy: 0
        },
        damage: {
          doesDamage: true,
          attackCount: 5,
          damageMin: 7,
          damageMax: 10
        },
        position: {
          doesReposition: false,
          repositionDirection: "None",
          minPosition: 1,
          maxPosition: 6
        },
        heal: {
          doesHealHealth: false,
          healthHealAmountMin: 0,
          healthHealAmountMax: 0,
          doesHealMana: false,
          manaHealAmountMin: 0,
          manaHealAmountMax: 0,
          doesHealEnergy: false,
          energyHealAmountMin: 0,
          energyHealAmountMax: 0
        }
      }
    }
  },
  utility: {
    reposition: {
      forward: {
        URFCharge: {
          info: {
            id: "URFCharge",
            name: "Charge",
            weapon: "Utility",
            type: "Reposition",
            description:
              "A forward charging attack that moves you closer to the enemy.",
            combatText: ["charge at", "sprint forward and charge towards"]
          },
          cost: {
            experience: 0,
            health: 0,
            mana: 0,
            energy: 0
          },
          damage: {
            doesDamage: true,
            attackCount: 1,
            damageMin: 1,
            damageMax: 3
          },
          position: {
            doesReposition: true,
            repositionDirection: "Forward",
            minPosition: 1,
            maxPosition: 6
          },
          heal: {
            doesHealHealth: false,
            healthHealAmountMin: 0,
            healthHealAmountMax: 0,
            doesHealMana: false,
            manaHealAmountMin: 0,
            manaHealAmountMax: 0,
            doesHealEnergy: false,
            energyHealAmountMin: 0,
            energyHealAmountMax: 0
          }
        }
      },
      backward: {
        URBDodgeBack: {
          info: {
            id: "URBDodgeBack",
            name: "Dodge Back",
            weapon: "Utility",
            type: "Reposition",
            description:
              "A retreating dodge that moves you away from the enemy.",
            combatText: [
              "dodge backwards to gain better footing.",
              "retreat backwards in effort to gain control."
            ]
          },
          cost: {
            experience: 0,
            health: 0,
            mana: 0,
            energy: 0
          },
          damage: {
            doesDamage: true,
            attackCount: 1,
            damageMin: 1,
            damageMax: 3
          },
          position: {
            doesReposition: true,
            repositionDirection: "Forward",
            minPosition: 1,
            maxPosition: 6
          },
          heal: {
            doesHealHealth: false,
            healthHealAmountMin: 0,
            healthHealAmountMax: 0,
            doesHealMana: false,
            manaHealAmountMin: 0,
            manaHealAmountMax: 0,
            doesHealEnergy: false,
            energyHealAmountMin: 0,
            energyHealAmountMax: 0
          }
        }
      }
    },
    heal: {
      UHLesserHeal: {
        info: {
          id: "UHLesserHeal",
          name: "Lesser Heal",
          weapon: "Utility",
          type: "Heal",
          description: "A generic healing spell that heals your health.",
          combatText: [
            "heal yourself for",
            "try to remember how to heal and successfully heal for"
          ]
        },
        cost: {
          experience: 0,
          health: 0,
          mana: 0,
          energy: 0
        },
        damage: {
          doesDamage: false,
          attackCount: 0,
          damageMin: 0,
          damageMax: 0
        },
        position: {
          doesReposition: false,
          repositionDirection: "None",
          minPosition: 1,
          maxPosition: 6
        },
        heal: {
          doesHealHealth: true,
          healthHealAmountMin: 25,
          healthHealAmountMax: 50,
          doesHealMana: false,
          manaHealAmountMin: 0,
          manaHealAmountMax: 0,
          doesHealEnergy: false,
          energyHealAmountMin: 0,
          energyHealAmountMax: 0
        }
      },
      UHHeal: {
        info: {
          id: "UHHeal",
          name: "Heal",
          weapon: "Utility",
          type: "Heal",
          description: "A generic healing spell that heals your health.",
          combatText: [
            "dodge backwards to gain better footing.",
            "retreat backwards in effort to gain control."
          ]
        },
        cost: {
          experience: 1000,
          health: 0,
          mana: 0,
          energy: 0
        },
        damage: {
          doesDamage: false,
          attackCount: 0,
          damageMin: 0,
          damageMax: 0
        },
        position: {
          doesReposition: false,
          repositionDirection: "None",
          minPosition: 1,
          maxPosition: 6
        },
        heal: {
          doesHealHealth: true,
          healthHealAmountMin: 75,
          healthHealAmountMax: 100,
          doesHealMana: false,
          manaHealAmountMin: 0,
          manaHealAmountMax: 0,
          doesHealEnergy: false,
          energyHealAmountMin: 0,
          energyHealAmountMax: 0
        }
      }
    },
    generic: {
      UGFeint: {
        info: {
          id: "UGFeint",
          name: "Feint",
          weapon: "Utility",
          type: "Generic",
          description: "A skill used when you're desperate for a new position.",
          combatText: [
            "project your voice to distract the enemy, giving you time to run.",
            "throw your most valued posessions that you don't own and quickly run away to get a solid footing.",
            "believe in yourself, just kidding.",
            "think of a better plan and move.",
            "try your best, but at least you're in a better spot.",
            "yell 'Hey there! Stop!', and then quickly move."
          ]
        },
        cost: {
          experience: 0,
          health: 0,
          mana: 0,
          energy: 0
        },
        damage: {
          doesDamage: false,
          attackCount: 0,
          damageMin: 0,
          damageMax: 0
        },
        position: {
          doesReposition: true,
          repositionDirection: "Any",
          minPosition: 1,
          maxPosition: 6
        },
        heal: {
          doesHealHealth: false,
          healthHealAmountMin: 0,
          healthHealAmountMax: 0,
          doesHealMana: false,
          manaHealAmountMin: 0,
          manaHealAmountMax: 0,
          doesHealEnergy: false,
          energyHealAmountMin: 0,
          energyHealAmountMax: 0
        }
      }
    },
    magic: {}
  }
};

exports.Abilities = Abilities;
