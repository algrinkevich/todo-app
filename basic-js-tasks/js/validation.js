function validateNumbers(numbers) {
  validateIsArray(numbers);
  validateItemsType(numbers, "number");
}

function validateStrings(strings) {
  validateIsArray(strings);
  validateItemsType(strings, "string");
}

function validateString(string) {
  if (typeof string !== "string") {
    throw new Error("Not string is provided");
  }
}

function validateIsArray(array) {
  if (!Array.isArray(array)) {
    throw new Error("Not array is provided");
  }
}

function validateItemsType(array, type) {
  const doAllHaveType = array.every(item => typeof item === type);
  if (!doAllHaveType) {
    throw new Error(`Array contains non-${type} values`);
  }
}

function validateFishes(fishes) {
  validateObjects(
    fishes,
    fish => typeof fish.name === "string" && typeof fish.likes === "string"
  );
}

function validateProducts(products) {
  validateObjects(
    products,
    product =>
      typeof product.price === "number" && typeof product.count === "number"
  );
}

function validateFullName(user) {
  if (typeof user !== "object" || !user) {
    throw new Error("Not an object is provided");
  }

  if (
    typeof user.firstName !== "string" ||
    typeof user.secondName !== "string" ||
    typeof user.patronymic !== "string"
  ) {
    throw new Error("Invalid user object");
  }
}

function validateObjects(objects, validateFunction) {
  validateIsArray(objects);

  const areCorrectObjects = objects.every(validateFunction);
  if (!areCorrectObjects) {
    throw new Error("Array includes invalid object");
  }
}

function validateCode(codeToMessage, code) {
  if (!codeToMessage[code]) {
    throw new Error("Invalid code");
  }
}

function validate2BiggestSmallestValues(numbers) {
  validateNumbers(numbers);

  if (numbers.length < 2) {
    throw new Error("Array contains less than 2 numbers");
  }
}

function validateMultiplyTo(numbers, multiplier) {
  validateNumbers(numbers);

  if (!multiplier) {
    throw new Error("Multiplier is missing");
  }
  if (typeof multiplier !== "number") {
    throw new Error("Multiplier is not number");
  }
}

function validateCharacterNames(characters, franchise) {
  validateObjects(
    characters,
    character =>
      typeof character.name === "string" &&
      typeof character.franchise === "string"
  );

  if (!franchise) {
    throw new Error("Franchise is missing");
  }
  if (typeof franchise !== "string") {
    throw new Error("Franchise is not string");
  }
}

function validateMultiDimensionalArray(array2D) {
  array2D.forEach(row => validateNumbers(row));
}

module.exports = {
  validateString,
  validateStrings,
  validateNumbers,
  validateIsArray,
  validateFishes,
  validateProducts,
  validate2BiggestSmallestValues,
  validateCode,
  validateFullName,
  validateMultiDimensionalArray,
  validateCharacterNames,
  validateMultiplyTo,
};
