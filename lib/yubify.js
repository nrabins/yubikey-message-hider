module.exports = (input, reverse, numOptions=100) => {
  var options = [];
  for (let i = 0; i < numOptions; i++) {
    var encoded = encode(input, reverse);
    options.push(encoded);
  }
  return options;
}

var header = "vvccccikferc";

function encode(input, reverse) {
  var condensed = input.replace(/ /g, "");
  if (reverse) {
    condensed = condensed.split("").reverse().join("");
  }

  var maxInsertLength = Math.max(32 - condensed.length, 0);
  var insertAt = randomBetween(0, maxInsertLength);

  var prefix = "";
  for (let i = 0; i < insertAt; i++) {
    prefix += randomCharacter();
  }

  var suffix = "";
  for (let i = insertAt + condensed.length; i < 32; i++) {
    suffix += randomCharacter();
  }

  return header + prefix + condensed + suffix;
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * max) + min;
}

function randomCharacter() {
  var possible = "abcdefghijklmnopqrstuvwxyz";
  return possible.charAt(Math.floor(Math.random() * possible.length));
}