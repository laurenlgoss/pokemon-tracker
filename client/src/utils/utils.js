// Capitalize first letter of inputted string
function capitalizeFirstLetter(string) {
  var stringArray = string.split(' ');

  for (var i = 0; i < stringArray.length; i++) {
    stringArray[i] =
      stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);
  }

  return stringArray.join(' ');
}

function calculateRemainingEVs({ hp, atk, def, spatk, spdef, spd }) {
  if (!hp) {
    hp = 0;
  }
  if (!atk) {
    atk = 0;
  }
  if (!def) {
    def = 0;
  }
  if (!spatk) {
    spatk = 0;
  }
  if (!spdef) {
    spdef = 0;
  }
  if (!spd) {
    spd = 0;
  }

  const usedEVs =
    parseInt(hp) +
    parseInt(atk) +
    parseInt(def) +
    parseInt(spatk) +
    parseInt(spdef) +
    parseInt(spd);

  return 510 - usedEVs;
}

export { capitalizeFirstLetter, calculateRemainingEVs };
