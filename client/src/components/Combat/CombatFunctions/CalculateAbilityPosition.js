function calculateAbilityPositions(
  position,
  userHasChained,
  combatAbilities,
  chainerAbilities,
  finisherAbility,
  repositionAbilities,
  genericAbility
) {
  let abilities = {
    one: genericAbility,
    two: genericAbility,
    three: genericAbility,
    four: genericAbility,
    five: genericAbility,
    six: genericAbility,
  };

  console.log(position);

  let fillerPositionObject = { info: { name: "" }, position: { repositionDirection: "None" }};

  // I will need to redo this whole place. When a user is in combat, the position they chose determines the starting point. That position will have it's basic default ability chosen in combat prefs, and the utility repositions for forward and backward. The user will have a dodge/feint ability that will be +1 or -1 the current abilities.

  // 1 Charge
  // ->2 Thrust (Thrust to start the chain)
  // 3 Dodge Back
  // 4 Feint
  // 5 Grayed Out
  // 6 Grayed Out

  // ->1 Shadow Step
  // 2 Thrust
  // 3 Smoke Bomb
  // 4 Dodge Back
  // 5 Feint
  // 6 Grayed Out

  // When a user uses the chainer, in this case Shadow Step, the basic ability turns into a finisher ability, a much stronger ability.

  // 1 Thousand Hits(Finisher)
  // 2 Smoke Bomb
  // 3 Dodge Back
  // ->4 Feint
  // 5 Grayed Out
  // 6 Grayed Out
  if (userHasChained === 0) {
    if (position === 1) {
      abilities.one = combatAbilities.one;
      abilities.two = repositionAbilities.backward;
      abilities.three = genericAbility;
      abilities.four = fillerPositionObject;
      abilities.five = fillerPositionObject;
      abilities.six = fillerPositionObject;
    }

    if (position === 2) {
      abilities.one = repositionAbilities.forward;
      abilities.two = combatAbilities.two;
      abilities.three = repositionAbilities.backward;
      abilities.four = genericAbility;
      abilities.five = fillerPositionObject;
      abilities.six = fillerPositionObject;
    }

    if (position === 3) {
      abilities.one = genericAbility;
      abilities.two = repositionAbilities.forward;
      abilities.three = combatAbilities.three;
      abilities.four = repositionAbilities.backward;
      abilities.five = genericAbility;
      abilities.six = fillerPositionObject;
    }

    if (position === 4) {
      abilities.one = fillerPositionObject;
      abilities.two = genericAbility;
      abilities.three = repositionAbilities.forward;
      abilities.four = combatAbilities.four;
      abilities.five = repositionAbilities.backward;
      abilities.six = genericAbility;
    }

    if (position === 5) {
      abilities.one = fillerPositionObject;
      abilities.two = fillerPositionObject;
      abilities.three = genericAbility;
      abilities.four = repositionAbilities.forward;
      abilities.five = combatAbilities.five;
      abilities.six = repositionAbilities.backward;
    }

    if (position === 6) {
      abilities.one = fillerPositionObject;
      abilities.two = fillerPositionObject;
      abilities.three = fillerPositionObject;
      abilities.four = genericAbility;
      abilities.five = repositionAbilities.forward;
      abilities.six = combatAbilities.six;
    }
  }

  if (userHasChained === 1) {
    if (position === 1) {
      abilities.one = combatAbilities.one;
      abilities.two = chainerAbilities.backward;
      abilities.three = genericAbility;
      abilities.four = fillerPositionObject;
      abilities.five = fillerPositionObject;
      abilities.six = fillerPositionObject;
    }

    if (position === 2) {
      abilities.one = chainerAbilities.forward;
      abilities.two = combatAbilities.two;
      abilities.three = chainerAbilities.backward;
      abilities.four = genericAbility;
      abilities.five = fillerPositionObject;
      abilities.six = fillerPositionObject;
    }

    if (position === 3) {
      abilities.one = genericAbility;
      abilities.two = chainerAbilities.forward;
      abilities.three = combatAbilities.three;
      abilities.four = chainerAbilities.backward;
      abilities.five = genericAbility;
      abilities.six = fillerPositionObject;
    }

    if (position === 4) {
      abilities.one = fillerPositionObject;
      abilities.two = genericAbility;
      abilities.three = chainerAbilities.forward;
      abilities.four = combatAbilities.four;
      abilities.five = chainerAbilities.backward;
      abilities.six = genericAbility;
    }

    if (position === 5) {
      abilities.one = fillerPositionObject;
      abilities.two = fillerPositionObject;
      abilities.three = genericAbility;
      abilities.four = chainerAbilities.forward;
      abilities.five = combatAbilities.five;
      abilities.six = chainerAbilities.backward;
    }

    if (position === 6) {
      abilities.one = fillerPositionObject;
      abilities.two = fillerPositionObject;
      abilities.three = fillerPositionObject;
      abilities.four = genericAbility;
      abilities.five = chainerAbilities.forward;
      abilities.six = combatAbilities.six;
    }
  }

  if (userHasChained === 2) {
    if (position === 1) {
      abilities.one = finisherAbility;
      abilities.two = chainerAbilities.backward;
      abilities.three = genericAbility;
      abilities.four = fillerPositionObject;
      abilities.five = fillerPositionObject;
      abilities.six = fillerPositionObject;
    }

    if (position === 2) {
      abilities.one = chainerAbilities.forward;
      abilities.two = finisherAbility;
      abilities.three = chainerAbilities.backward;
      abilities.four = genericAbility;
      abilities.five = fillerPositionObject;
      abilities.six = fillerPositionObject;
    }

    if (position === 3) {
      abilities.one = genericAbility;
      abilities.two = chainerAbilities.forward;
      abilities.three = finisherAbility;
      abilities.four = chainerAbilities.backward;
      abilities.five = genericAbility;
      abilities.six = fillerPositionObject;
    }

    if (position === 4) {
      abilities.one = fillerPositionObject;
      abilities.two = genericAbility;
      abilities.three = chainerAbilities.forward;
      abilities.four = finisherAbility;
      abilities.five = chainerAbilities.backward;
      abilities.six = genericAbility;
    }

    if (position === 5) {
      abilities.one = fillerPositionObject;
      abilities.two = fillerPositionObject;
      abilities.three = genericAbility;
      abilities.four = chainerAbilities.forward;
      abilities.five = finisherAbility;
      abilities.six = chainerAbilities.backward;
    }

    if (position === 6) {
      abilities.one = fillerPositionObject;
      abilities.two = fillerPositionObject;
      abilities.three = fillerPositionObject;
      abilities.four = genericAbility;
      abilities.five = chainerAbilities.forward;
      abilities.six = finisherAbility;
    }
  }

  return abilities;
}

export default calculateAbilityPositions;
