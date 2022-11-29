// Capitalize first letter of inputted string
function capitalizeFirstLetter(string) {
  var stringArray = string.split(' ');

  for (var i = 0; i < stringArray.length; i++) {
    stringArray[i] =
      stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);
  }

  return stringArray.join(' ');
}

// Calculate remaining total EVs from 510
function calculateTotalRemainingEVs(hp, atk, def, spatk, spdef, spd) {
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

function calculateEVsUntilGoal(currentEv, goalEv) {
  if (goalEv === null) {
    goalEv = '0';
  }

  let remainingEVs = parseInt(goalEv) - parseInt(currentEv);

  if (isNaN(remainingEVs) || remainingEVs === 0) {
    return;
  }
  return `${remainingEVs > 0 ? '+' : ''}${remainingEVs}`;
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

// Color EV text based on reached goal EV or not
function getEVClassColor(ev, goalEv) {
  if (goalEv === null) {
    goalEv = '0';
  }

  if (goalEv === '0' && ev === '0') {
    return;
  }

  if (parseInt(ev) > parseInt(goalEv)) {
    return 'danger';
  } else if (parseInt(ev) < parseInt(goalEv)) {
    return 'warning';
  } else if (ev === goalEv || parseInt(ev) >= 252) {
    return 'success';
  }

  // If goal is reached OR EVs are maxed out w/o goal
  // if (
  //   (ev === goalEv && goalEv !== '0') ||
  //   (ev === '252' && (!goalEv || goalEv === '0'))
  // ) {
  //   return 'success';
  // } else if (goalEv && goalEv !== '0') {
  //   if (parseInt(ev) < parseInt(goalEv)) {
  //     return 'warning';
  //   } else if (parseInt(ev) > parseInt(goalEv)) {
  //     return 'danger';
  //   }
  // }
  // If EVs and goals do not match (over or under)
  // else if (parseInt(ev) !== parseInt(goalEv) && goalEv && goalEv !== '0') {
  //   return 'warning';
  // }
}

export {
  capitalizeFirstLetter,
  calculateTotalRemainingEVs,
  calculateEVsUntilGoal,
  getNatureClassName,
  translateStatName,
  getEVClassColor,
};
