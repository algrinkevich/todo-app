const validation = require("./validation");
// ----==== JS School - Lecture 4 HW ====----

/**
 * Сriteria for assessment
 *
 * 5 - All tasks are correctly solved (23 items), the code is clean, the solutions are optimal;
 * 4 - Correctly solved all the tasks of the base block (15 tasks), the code is clean;
 * 3 - At least 10 problems are correctly solved, the code is clean;
 * 2 - Correctly solved at least 10 problems;
 * 1 - At least 5 problems solved correctly.
 */

/**
 * Warning
 *
 * Do not rename function names or change arguments.
 */

// ----==== Basic exercises (15 items) ====----
/**
 * Exercise 1
 *
 * Write a function that returns odd array values.
 * [1,2,3,4] => [1,3]
 */
const getOddValues = numbers => {
  validation.validateNumbers(numbers);
  return numbers.filter(number => number % 2);
};
/**
 * Exercise 2
 *
 * Write a function that returns the smallest value of an array
 * [4,2,10,27] => 2
 */
const getSmallestValue = numbers => {
  // Math.min is not used as it's explicitly asked in the exercise 7

  validation.validateNumbers(numbers);
  return numbers.reduce(
    (currentMin, value) => (currentMin < value ? currentMin : value),
    numbers[0]
  );
};
/**
 * Exercise 3
 *
 * Write a function that returns the biggest value of an array
 * [5,22,9,43] => 43
 */
const getBiggestValue = numbers => {
  validation.validateNumbers(numbers);
  return numbers.length ? Math.max(...numbers) : undefined;
};
/**
 * Exercise 4
 *
 * Write a function that takes an array of strings as input
 * and returns only those shorter than 20 characters
 *
 *[
 * 'I am a short string',
 * 'I seem to be short too',
 * 'And I am a long string'
 *] => [
 * 'I am a short string',
 * 'And I am a long string'
 *]
 *
 * Use: filter
 */
const getShorterStrings = (strings, characters = 20) => {
  validation.validateStrings(strings);
  return strings.filter(string => string.length < characters);
};
/**
 * Exercise 5
 *
 * Write a function that takes the following data as input:
 *
 *[
 * { name: 'shark', likes: 'ocean' },
 * { name: 'turtle', likes: 'pond' },
 * { name: 'otter', likes: 'fish biscuits' }
 *]
 *
 * And returns an array of strings:
 *
 * [ 'shark likes ocean', 'turtle likes pond', 'otter likes fish biscuits' ]
 *
 * Use: map
 */
const getComputedStrings = fish => {
  validation.validateFishes(fish);
  return fish.map(item => `${item.name} likes ${item.likes}`);
};
/**
 * Exercise 6
 *
 * Write a function that takes 2 objects as input and returns 1 with
 * common properties. If properties have the same keys use the latter.
 *
 * [{ name: 'Alice' }, { age: 11 }] => { name: 'Alice', age: 11 }
 *
 * We use: ...
 */
const mergeObjects = objects => {
  validation.validateIsArray(objects);
  return objects.reduce(
    (currentMerged, obj) => ({ ...currentMerged, ...obj }),
    {}
  );
};
/**
 * Exercise 7
 *
 * Write a function that returns the smallest value of an array
 * [5,200,-5,41] => -5
 *
 * Use: operator ... and Math.min
 */
const getSmallestValue2 = numbers => {
  validation.validateNumbers(numbers);
  return numbers.length ? Math.min(...numbers) : undefined;
};
/**
 * Exercise 8
 *
 * Write a function that returns odd array values.
 * [77,2,30,51] => [77,51]
 *
 * Use: reduce
 */
const getOddValues2 = numbers => {
  validation.validateNumbers(numbers);
  return numbers.reduce(
    (resultArray, value) => resultArray.concat(value % 2 ? [value] : []),
    []
  );
};
/**
 * Exercise 9
 *
 * Write a function that accepts data from the basket as input in the following form:
 *
 *[
 * {price: 10, count: 2},
 * {price: 100, count: 1},
 * {price: 2, count: 5},
 * {price: 15, count: 6},
 *]
 * where price is the price of the item and count is the quantity.
 *
 * The function should return the total price for this order.
 *
 * Use: reduce
 */
const calculateTotal = products => {
  validation.validateProducts(products);
  return products.reduce((sum, item) => sum + item.price * item.count, 0);
};
/**
 * Exercise 10
 *
 * Implement a function that has an array of numbers as input and an array of unique values as output
 * [1, 2, 2, 4, 5, 5] => [1, 2, 4, 5]
 *
 * Use: reduce and indexOf
 */
const getUniqueValues = numbers => {
  validation.validateNumbers(numbers);

  return numbers.reduce(
    (currentUniqueValues, value) =>
      currentUniqueValues.indexOf(value) === -1
        ? [...currentUniqueValues, value]
        : currentUniqueValues,
    []
  );
};
/**
 * Exercise 11
 *
 * Implement a function whose input is a numeric code of an error, the output is a string with a message
 * 500 => Server Error
 * 401 => Authorization failed
 * 402 => Server Error
 * 403 => Access denied
 * 404 => Not found
 *
 * Use: switch case or object like a map structure
 */
const getErrorMessage = code => {
  const codeToMessage = {
    500: "Server Error",
    401: "Authorization failed",
    402: "Server Error",
    403: "Access denied",
    404: "Not found",
  };
  validation.validateCode(codeToMessage, code);

  return codeToMessage[code];
};
/**
 * Exercise 12
 *
 * Write a function that returns the 2 smallest values of an array
 * [4,3,2,1] => [1,2]
 *
 * Use: .sort()
 */
const get2SmallestValues = numbers => {
  validation.validate2BiggestSmallestValues(numbers);
  return numbers
    .sort((num1, num2) => num1 - num2)
    .slice(0, 2);
};
/**
 * Exercise 13
 *
 * Implement a function, at the input of which an object of the following form:
 * {
 * firstName: 'Peter',
 * secondName: 'Vasiliev',
 * patronymic: 'Ivanovich'
 *}
 * output line with the message 'Name: Petr Ivanovich Vasiliev'
 */
const getFullName = user => {
  validation.validateFullName(user);
  return `Name: ${user.firstName} ${user.patronymic} ${user.secondName}`;
};
/**
 * Exercise 14
 *
 * Implement a function that takes 2 arguments as input: an array of numbers and a multiplier,
 * a returns an array of the original array, each element of which has been multiplied by a factor:
 *
 * [1,2,3,4], 5 => [5,10,15,20]
 *
 * Use: map
 */
const multiplyTo = (numbers, multiplier) => {
  validation.validateMultiplyTo(numbers, multiplier);
  return numbers.map(number => number * multiplier);
};
/**
 * Exercise 15
 *
 * Implement a function that takes 2 arguments as input: an array and a franchise,
 * and returns a string with the names of the heroes separated by a comma:
 *
 *[
 * {name: "Batman", franchise: "DC"},
 * {name: "Ironman", franchise: "Marvel"},
 * {name: "Thor", franchise: "Marvel"},
 * {name: "Superman", franchise: "DC"}
 *],
 * Marvel
 * => Ironman, Thor
 *
 * Use: filter, map, join
 */
const getCharacterNames = (characters, franchise) => {
  if (!characters.length) {
    return undefined;
  }
  validation.validateCharacterNames(characters, franchise);

  return characters
    .filter(hero => franchise === hero.franchise)
    .map(hero => hero.name)
    .join(", ");
};
// ----==== Advanced exercises (8 items) ====----
/**
 * Exercise 16
 *
 * Write a function that returns an array of the smallest row values of a two-dimensional array
 *[
 * [10,1,300,4],
 * [20,2,300,400],
 * [30,3,300,4],
 * [40,4,300,4],
 *]
 * => [1,2,3,4]
 */
const getSmallestRow = numbers => {
  if (!numbers.length) {
    return undefined;
  }
  validation.validateMultiDimensionalArray(numbers);
  return numbers.map(row => row.length ? Math.min(...row) : undefined);
};
/**
 * Exercise 17
 *
 * Write a function that returns an array of the smallest column values of a two-dimensional array
 *[
 * [1,2,3,4],
 * [1,2,3,4],
 * [1,2,30,4],
 * [1,2,3,40],
 *]
 * => [1,2,3,4]
 */
const getSmallestColumn = numbers => {
  if (!numbers.length) {
    return undefined;
  }
  validation.validateMultiDimensionalArray(numbers);

  const numOfColumns = numbers[0]?.length;
  const result = [];

  for (let j = 0; j < numOfColumns; j++) {
    let minColumnValue = numbers[0][j];
    for (let i = 0; i < numbers.length; i++) {
      minColumnValue = Math.min(numbers[i][j], minColumnValue);
    }
    result.push(minColumnValue);
  }
  return result;
};
/**
 * Exercise 18
 *
 * Write a function that returns the 2 biggest value of an array
 * [4,3,2,1] => [4,3]
 */
const get2BiggestValues = numbers => {
  /*
  Can be solved via .sort but it's not optimal

    return numbers
      .sort((num1, num2) => num2 - num1)
      .slice(0, 2);
  */
  validation.validate2BiggestSmallestValues(numbers);

  const firstMax = Math.max(...numbers);
  numbers.splice(numbers.indexOf(firstMax), 1);
  const secondMax = Math.max(...numbers);
  return [firstMax, secondMax];
};
/**
 * Exercise 19
 *
 * Write a function that returns the number of vowels in a string in English
 * ( a, e, i, o, u ).
 *
 * 'Return the number (count) of vowels in the given string.' => 15
 */
const getNumberOfVowels = string => {
  validation.validateString(string);

  const vowels = ["a", "e", "i", "o", "u"];
  return string
    .split("")
    .filter(letter => vowels.includes(letter))
    .length;
};
/**
 * Exercise 20
 *
 * Write a function that returns an array of two strings where the first element
 * is the original string with uppercase even letters, and the second
 * with capital odd.
 * 'abcdef' => ['AbCdEf', 'aBcDeF']
 */
const getCapitalizedStrings = string => {
  validation.validateString(string);

  function capitalizeStringPartially(replaceConditionFunc) {
    return string
      .split("")
      .map((letter, index) =>
        replaceConditionFunc(index) ? letter.toUpperCase() : letter
      )
      .join("");
  }

  return [
    capitalizeStringPartially((index) => !(index % 2)),
    capitalizeStringPartially((index) => index % 2),
  ];
};
/**
 * Exercise 21
 *
 * Write a function that satisfies the following conditions:
 *
 * the function takes a string S, consisting of N letters of the English alphabet in lowercase [a-z]
 * the function returns a string that does not contain three identical letters in a row
 * the function removes the minimum number of letters from the string S
 *
 * Examples:
 * S = "eedaaad", the function returns "eedaad". One "a" has been removed.
 * S = "xxxtxxx", the function returns "xxtxx". The same letters can occur more than three times in a string, but not in a row.
 * S = "uuuuxaaaaxuuu", the function returns "uuxaaxuu".
 *
 * Assumptions:
 * N is an integer in the range [1..200,000]
 * S consists only of lowercase letters [a-z]
 */
const getCorrectString = string => {
  validation.validateString(string);

  let equalCharsCounter = 0;
  const correctedChars = [];

  for (let char of string) {
    if (char === correctedChars.at(-1)) {
      equalCharsCounter += 1;
    } else {
      equalCharsCounter = 1;
    }

    if (equalCharsCounter >= 3) {
      continue;
    }
    correctedChars.push(char);
  }
  return correctedChars.join("");
};
/**
 * Exercise 22
 *
 * Implement a flatten function that takes an array of arbitrary nesting arrays as input
 * and returns an array of all their elements without nesting.
 * [1, 2, [3, 4], 5, [[6, 7], 8], 9] => [1, 2, 3, 4, 5, 6, 7, 8, 9]
 */
const getFlattenedArray = numbers => {
  /*
  The shortest solution:

      return numbers.flat(Infinity);
  */
  if (!Array.isArray(numbers)) {
    return [numbers];
  }
  return numbers.reduce(
    (currentFlattened, item) => [
      ...currentFlattened,
      ...getFlattenedArray(item),
    ],
    []
  );
};
/**
 * Exercise 23
 *
 * Implement a function that has an array of numbers as input and an array of not unique values as output.
 *
 * [1, 2, 2, 4, 5, 5] => [2, 5]
 */
const getNotUniqueValues = numbers => {
  /*  
  Less effective (O(n^2) vs O(n)), but more readable:

      const result = [];
      for (let number of numbers) {
          const nonUnique = numbers.filter(num => num === number).length > 1;
          if (!nonUnique) {
              continue;
          }
          if (!result.includes(number)) {
              result.push(number);
          }
      }
      return result; 
  */
  validation.validateNumbers(numbers);

  const countByValue = new Map();

  for (let value of numbers) {
    const currentValCount = countByValue.get(value) || 0;
    countByValue.set(value, currentValCount + 1);
  }

  const resultSet = new Set();
  const nonUniqueValues = [];

  for (let value of numbers) {
    const alreadyAdded = resultSet.has(value);
    const valueCount = countByValue.get(value);

    if (alreadyAdded || valueCount === 1) {
      continue;
    }
    nonUniqueValues.push(value);
    resultSet.add(value);
  }
  return nonUniqueValues;
};


module.exports = {
  getOddValues,
  getSmallestValue,
  getBiggestValue,
  getShorterStrings,
  getComputedStrings,
  mergeObjects,
  getSmallestValue2,
  getOddValues2,
  calculateTotal,
  getUniqueValues,
  getErrorMessage,
  get2SmallestValues,
  getFullName,
  multiplyTo,
  getCharacterNames,
  getSmallestRow,
  getSmallestColumn,
  get2BiggestValues,
  getNumberOfVowels,
  getCapitalizedStrings,
  getCorrectString,
  getFlattenedArray,
  getNotUniqueValues
};
