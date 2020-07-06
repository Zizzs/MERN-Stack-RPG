function calculateInitialAbilities(
  position,
  combatAbilities,
  repositionAbilities
) {
  let initialAbilities = {
    one: { info: { name: "Feint" } },
    two: { info: { name: "Feint" } },
    three: { info: { name: "Feint" } },
    four: { info: { name: "Feint" } },
    five: { info: { name: "Feint" } },
    six: { info: { name: "Feint" } },
  };

  console.log(position, combatAbilities, repositionAbilities);

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

  if (position === 1) {
    initialAbilities.one = combatAbilities.one;
    initialAbilities.two = repositionAbilities.backward;
    initialAbilities.three = { info: { name: "Feint" } };
    initialAbilities.four = { info: { name: "Feint" } };
    initialAbilities.five = { info: { name: "Feint" } };
    initialAbilities.six = { info: { name: "Feint" } };
  }

  if (position === 2) {
    initialAbilities.one = repositionAbilities.forward;
    initialAbilities.two = combatAbilities.two;
    initialAbilities.three = repositionAbilities.backward;
    initialAbilities.four = { info: { name: "Feint" } };
    initialAbilities.five = { info: { name: "Feint" } };
    initialAbilities.six = { info: { name: "Feint" } };
  }

  if (position === 3) {
    initialAbilities.one = { info: { name: "Feint" } };
    initialAbilities.two = repositionAbilities.forward;
    initialAbilities.three = combatAbilities.three;
    initialAbilities.four = repositionAbilities.backward;
    initialAbilities.five = { info: { name: "Feint" } };
    initialAbilities.six = { info: { name: "Feint" } };
  }

  if (position === 4) {
    initialAbilities.one = { info: { name: "Feint" } };
    initialAbilities.two = { info: { name: "Feint" } };
    initialAbilities.three = repositionAbilities.forward;
    initialAbilities.four = combatAbilities.four;
    initialAbilities.five = repositionAbilities.backward;
    initialAbilities.six = { info: { name: "Feint" } };
  }

  if (position === 5) {
    initialAbilities.one = { info: { name: "Feint" } };
    initialAbilities.two = { info: { name: "Feint" } };
    initialAbilities.three = { info: { name: "Feint" } };
    initialAbilities.four = repositionAbilities.forward;
    initialAbilities.five = combatAbilities.five;
    initialAbilities.six = repositionAbilities.backward;
  }

  if (position === 6) {
    initialAbilities.one = { info: { name: "Feint" } };
    initialAbilities.two = { info: { name: "Feint" } };
    initialAbilities.three = { info: { name: "Feint" } };
    initialAbilities.four = { info: { name: "Feint" } };
    initialAbilities.five = repositionAbilities.forward;
    initialAbilities.six = combatAbilities.six;
  }
  return initialAbilities;
}

export default calculateInitialAbilities;
