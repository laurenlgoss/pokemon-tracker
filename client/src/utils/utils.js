  // Capitalize first letter of inputted string
  function capitalizeFirstLetter(string) {
    var stringArray = string.split(' ');

    for (var i = 0; i < stringArray.length; i++) {
      stringArray[i] =
        stringArray[i].charAt(0).toUpperCase() + stringArray[i].slice(1);
    }

    return stringArray.join(' ');
  }

  export default capitalizeFirstLetter;