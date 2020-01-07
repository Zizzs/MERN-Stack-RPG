function calculateInitialAbilities(
  position,
  combatAbilities,
  repositionAbilities
) {
  let initialAbilities = {
    one: { name: "Feint" },
    two: { name: "Feint" },
    three: { name: "Feint" },
    four: { name: "Feint" },
    five: { name: "Feint" },
    six: { name: "Feint" }
  };

  if (position === 1) {
    initialAbilities.one = combatAbilities.one;
    initialAbilities.two = repositionAbilities.backward;
    initialAbilities.three = { name: "Feint" };
    initialAbilities.four = { name: "Feint" };
    initialAbilities.five = { name: "Feint" };
    initialAbilities.six = { name: "Feint" };
  }

  if (position === 2) {
    initialAbilities.one = repositionAbilities.forward;
    initialAbilities.two = combatAbilities.two;
    initialAbilities.three = repositionAbilities.backward;
    initialAbilities.four = { name: "Feint" };
    initialAbilities.five = { name: "Feint" };
    initialAbilities.six = { name: "Feint" };
  }

  if (position === 3) {
    initialAbilities.one = { name: "Feint" };
    initialAbilities.two = repositionAbilities.forward;
    initialAbilities.three = combatAbilities.three;
    initialAbilities.four = repositionAbilities.backward;
    initialAbilities.five = { name: "Feint" };
    initialAbilities.six = { name: "Feint" };
  }

  if (position === 4) {
    initialAbilities.one = { name: "Feint" };
    initialAbilities.two = { name: "Feint" };
    initialAbilities.three = repositionAbilities.forward;
    initialAbilities.four = combatAbilities.four;
    initialAbilities.five = repositionAbilities.backward;
    initialAbilities.six = { name: "Feint" };
  }

  if (position === 5) {
    initialAbilities.one = { name: "Feint" };
    initialAbilities.two = { name: "Feint" };
    initialAbilities.three = { name: "Feint" };
    initialAbilities.four = repositionAbilities.forward;
    initialAbilities.five = combatAbilities.five;
    initialAbilities.six = repositionAbilities.backward;
  }

  if (position === 6) {
    initialAbilities.one = { name: "Feint" };
    initialAbilities.two = { name: "Feint" };
    initialAbilities.three = { name: "Feint" };
    initialAbilities.four = { name: "Feint" };
    initialAbilities.five = repositionAbilities.forward;
    initialAbilities.six = combatAbilities.six;
  }
  return initialAbilities;
}

export default calculateInitialAbilities;
