// Capitalize first letter of inputted string
function capitalizeFirstLetter(string) {
  var stringArray = string.split(' ');

  for (var i = 0; i < stringArray.length; i++) {
    stringArray[i] =
      stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);
  }

  return stringArray.join(' ');
}

function calculateRemainingEVs(hp, atk, def, spatk, spdef, spd) {
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

function getNatureClassName(nature) {
  if (nature) {
    return 'text-success';
  } else if (nature === false) {
    return 'text-danger';
  } else {
    return null;
  }
}

// Needed because the API stat name is different than my variables
function translateStatName(stat) {
  let newStatName;

  switch (stat) {
    case 'attack':
      newStatName = 'atk';
      break;
    case 'defense':
      newStatName = 'def';
      break;
    case 'special-attack':
      newStatName = 'spatk';
      break;
    case 'special-defense':
      newStatName = 'spdef';
      break;
    case 'speed':
      newStatName = 'spd';
      break;
    default:
      newStatName = null;
  }
  return newStatName;
}

export { capitalizeFirstLetter, calculateRemainingEVs, getNatureClassName, translateStatName };
