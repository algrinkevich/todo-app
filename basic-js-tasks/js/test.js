const main = require("./main");
const assert = require("assert").strict;


describe("Get odd values", function () {
  it("should return odd output from provided example", function () {
    assert.deepEqual(main.getOddValues([1, 2, 3, 4]), [1, 3]);
  });

  it("should return empty output for empty input", function () {
    assert.deepEqual(main.getOddValues([]), []);
  });

  it("should return empty output for even input", function () {
    assert.deepEqual(main.getOddValues([2, 4, 6]), []);
  });

  it("should return the same for odd input", function () {
    assert.deepEqual(main.getOddValues([1, 3, 5]), [1, 3, 5]);
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.getOddValues(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-numbers", function () {
    assert.throws(
      () => main.getOddValues(["hello", true]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get smallest value from array", function () {
  it("should return smallest value from provided example", function () {
    assert.equal(main.getSmallestValue([4, 2, 10, 27]), 2);
  });

  it("should return undefined for empty array", function () {
    assert.equal(main.getSmallestValue([]), undefined);
  });

  it("should return smallest value among negative values", function () {
    assert.equal(main.getSmallestValue([-10, -100500, -3, -1]), -100500);
  });

  it("should return smallest value among decimal numbers", function () {
    assert.equal(main.getSmallestValue([3.14, 83.9999, 2.09]), 2.09);
  });

  it("should return a value from an array consisting of 1 value", function () {
    assert.equal(main.getSmallestValue([0]), 0);
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.getSmallestValue(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-numbers", function () {
    assert.throws(
      () => main.getSmallestValue(["hello", true, null]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get biggest value from array", function () {
  it("should return biggest value from provided example", function () {
    assert.equal(main.getBiggestValue([5, 22, 9, 43]), 43);
  });

  it("should return undefined for empty array", function () {
    assert.equal(main.getBiggestValue([]), undefined);
  });

  it("should return biggest value among negative values", function () {
    assert.equal(main.getBiggestValue([-12, -1, -44, -1000]), -1);
  });

  it("should return biggest value among decimal numbers", function () {
    assert.equal(main.getBiggestValue([3.14, 83.9999, 2.09]), 83.9999);
  });

  it("should return a value from an array consisting of 1 value", function () {
    assert.equal(main.getBiggestValue([0]), 0);
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.getBiggestValue(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-numbers", function () {
    assert.throws(
      () => main.getBiggestValue(["hello", true, null]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get shortest strings", function () {
  it("should return the shortest string from provided example", function () {
    assert.deepEqual(
      main.getShorterStrings([
        "I am a short string",
        "I seem to be short too",
        "And I am a long string",
      ]),
      ["I am a short string"]
    );
  });

  it("should return empty array for empty input", function () {
    assert.deepEqual(main.getShorterStrings([]), []);
  });

  it("should return at least 2 shortest strings", function () {
    assert.deepEqual(
      main.getShorterStrings([
        "Ccccccccccccc20chars",
        "Aaaaaaaaaaaa19chars",
        "Bbbbbbbbbbbb19chars",
      ]),
      ["Aaaaaaaaaaaa19chars", "Bbbbbbbbbbbb19chars"]
    );
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.getShorterStrings(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-strings", function () {
    assert.throws(
      () => main.getShorterStrings(["hello", true, null]),
      /^Error: Array contains non-string values$/
    );
  });
});


describe("Get computed strings", function () {
  it("should return computed string from provided example", function () {
    assert.deepEqual(
      main.getComputedStrings([
        { name: "shark", likes: "ocean" },
        { name: "turtle", likes: "pond" },
        { name: "otter", likes: "fish biscuits" },
      ]),
      ["shark likes ocean", "turtle likes pond", "otter likes fish biscuits"]
    );
  });

  it("should return empty array for empty array", function () {
    assert.deepEqual(main.getComputedStrings([]), []);
  });

  it("should throw exception for empty object input", function () {
    assert.throws(
      () => main.getComputedStrings([{}]),
      /^Error: Array includes invalid object$/
    );
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.getComputedStrings(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-object input values", function () {
    assert.throws(
      () => main.getComputedStrings(["hello", true, null]),
      /^Error: Array includes invalid object$/
    );
  });
});


describe("Get merged object", function () {
  it("should return merged object from provided example", function () {
    assert.deepEqual(main.mergeObjects([{ name: "Alice" }, { age: 11 }]), {
      name: "Alice",
      age: 11,
    });
  });

  it("should return merged object with latest keys when given objects have the same keys", function () {
    assert.deepEqual(
      main.mergeObjects([
        { name: "John", age: 15 },
        { name: "Maria", age: 19 },
      ]),
      {
        name: "Maria",
        age: 19,
      }
    );
  });

  it("should return empty object for array with empty object", function () {
    assert.deepEqual(main.mergeObjects([{}]), {});
  });

  it("should return empty object for empty array", function () {
    assert.deepEqual(main.mergeObjects([]), {});
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.mergeObjects(null),
      /^Error: Not array is provided$/
    );
  });
});


describe("Get smallest value from array 2", function () {
  it("should return smallest value from provided example", function () {
    assert.equal(main.getSmallestValue2([5, 200, -5, 41]), -5);
  });

  it("should return undefined for empty array", function () {
    assert.equal(main.getSmallestValue2([]), undefined);
  });

  it("should return smallest value among negative values", function () {
    assert.equal(main.getSmallestValue2([-10, -100500, -3, -1]), -100500);
  });

  it("should return smallest value among decimal numbers", function () {
    assert.equal(main.getSmallestValue2([3.14, 83.9999, 2.09]), 2.09);
  });

  it("should return a value from an array consisting of 1 value", function () {
    assert.equal(main.getSmallestValue2([0]), 0);
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.getSmallestValue2(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-numbers", function () {
    assert.throws(
      () => main.getSmallestValue2(["hello", true, null]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get odd values 2", function () {
  it("should return odd output from provided example", function () {
    assert.deepEqual(main.getOddValues2([77, 2, 30, 51]), [77, 51]);
  });

  it("should return empty output for empty input", function () {
    assert.deepEqual(main.getOddValues2([]), []);
  });

  it("should return empty output for even input", function () {
    assert.deepEqual(main.getOddValues2([2, 4, 6]), []);
  });

  it("should return the same for odd input", function () {
    assert.deepEqual(main.getOddValues2([1, 3, 5]), [1, 3, 5]);
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.getOddValues2(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-numbers", function () {
    assert.throws(
      () => main.getOddValues2(["hello", true]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Calculate total", function () {
  it("should return calculated total from provided example", function () {
    assert.equal(
      main.calculateTotal([
        { price: 10, count: 2 },
        { price: 100, count: 1 },
        { price: 2, count: 5 },
        { price: 15, count: 6 },
      ]),
      220
    );
  });

  it("should return 0 for empty array input", function () {
    assert.equal(main.calculateTotal([]), 0);
  });

  it("should throw exception for empty object input", function () {
    assert.throws(
      () => main.calculateTotal([{}]),
      /^Error: Array includes invalid object$/
    );
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.calculateTotal(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-object input values", function () {
    assert.throws(
      () => main.calculateTotal(["hello", true, null]),
      /^Error: Array includes invalid object$/
    );
  });
});


describe("Get unique values", function () {
  it("should return unique output from provided example", function () {
    assert.deepEqual(main.getUniqueValues([1, 2, 2, 4, 5, 5]), [1, 2, 4, 5]);
  });

  it("should return unique output for missing diplicates", function () {
    assert.deepEqual(main.getUniqueValues([1, 2, 3]), [1, 2, 3]);
  });

  it("should return unique output for mixed up diplicates", function () {
    assert.deepEqual(main.getUniqueValues([1, 2, 1, 2, 1, 3]), [1, 2, 3]);
  });

  it("should return empty output for empty input", function () {
    assert.deepEqual(main.getUniqueValues([]), []);
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.getUniqueValues(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-numbers", function () {
    assert.throws(
      () => main.getUniqueValues(["hello", true]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get error message", function () {
  it("should return error message for existing code", function () {
    assert.equal(main.getErrorMessage(500), "Server Error");
  });

  it("should throw exception for non-existing code", function () {
    assert.throws(() => main.getErrorMessage(100500), /^Error: Invalid code$/);
  });

  it("should throw exception for non-number", function () {
    assert.throws(() => main.getErrorMessage(null), /^Error: Invalid code$/);
  });
});


describe("Get 2 smallest values", function () {
  it("should return 2 smallest values from provided example", function () {
    assert.deepEqual(main.get2SmallestValues([4, 3, 2, 1]), [1, 2]);
  });

  it("should return 2 smallest values for the same values in array", function () {
    assert.deepEqual(main.get2SmallestValues([2, 2, 2]), [2, 2]);
  });

  it("should throw exception for array consisting of less than 2 numbers", function () {
    assert.throws(
      () => main.get2SmallestValues([1]),
      /^Error: Array contains less than 2 numbers$/
    );
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.get2SmallestValues(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-numbers", function () {
    assert.throws(
      () => main.get2SmallestValues(["hello", true]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get unique values", function () {
  it("should return unique output from provided example", function () {
    assert.deepEqual(main.getUniqueValues([1, 2, 2, 4, 5, 5]), [1, 2, 4, 5]);
  });

  it("should return unique output for missing diplicates", function () {
    assert.deepEqual(main.getUniqueValues([1, 2, 3]), [1, 2, 3]);
  });

  it("should return unique output for mixed up diplicates", function () {
    assert.deepEqual(main.getUniqueValues([1, 2, 1, 2, 1, 3]), [1, 2, 3]);
  });

  it("should return empty output for empty input", function () {
    assert.deepEqual(main.getUniqueValues([]), []);
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.getUniqueValues(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-numbers", function () {
    assert.throws(
      () => main.getUniqueValues(["hello", true]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get error message", function () {
  it("should return error message for existing code", function () {
    assert.equal(main.getErrorMessage(500), "Server Error");
  });

  it("should throw exception for non-existing code", function () {
    assert.throws(() => main.getErrorMessage(100500), /^Error: Invalid code$/);
  });

  it("should throw exception for non-number", function () {
    assert.throws(() => main.getErrorMessage(null), /^Error: Invalid code$/);
  });
});


describe("Get full name", function () {
  it("should return full name from provided example", function () {
    assert.equal(
      main.getFullName({
        firstName: "Peter",
        secondName: "Vasiliev",
        patronymic: "Ivanovich",
      }),
      "Name: Peter Ivanovich Vasiliev"
    );
  });

  it("should throw exception for empty object input", function () {
    assert.throws(() => main.getFullName({}), /^Error: Invalid user object$/);
  });

  it("should throw exception for non-object input", function () {
    assert.throws(
      () => main.getFullName(null),
      /^Error: Not an object is provided$/
    );
  });
});


describe("Multiply to", function () {
  it("should return output from provided example", function () {
    assert.deepEqual(main.multiplyTo([1, 2, 3, 4], 5), [5, 10, 15, 20]);
  });

  it("should return empty output for empty input", function () {
    assert.deepEqual(main.multiplyTo([], 7), []);
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.multiplyTo(null, 5),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for missing multiplier", function () {
    assert.throws(
      () => main.multiplyTo([1, 2, 3, 4]),
      /^Error: Multiplier is missing$/
    );
  });

  it("should throw exception for invalid multiplier", function () {
    assert.throws(
      () => main.multiplyTo([1, 2, 3, 4], "hello"),
      /^Error: Multiplier is not number$/
    );
  });

  it("should throw exception for non-numbers in array", function () {
    assert.throws(
      () => main.multiplyTo(["hello", true], 10),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get character names", function () {
  it("should return character names from provided example", function () {
    assert.equal(
      main.getCharacterNames(
        [
          { name: "Batman", franchise: "DC" },
          { name: "Ironman", franchise: "Marvel" },
          { name: "Thor", franchise: "Marvel" },
          { name: "Superman", franchise: "DC" },
        ],
        "Marvel"
      ),
      "Ironman, Thor"
    );
  });

  it("should return undefined output for empty characters", function () {
    assert.equal(main.getCharacterNames([], "DC"), undefined);
  });

  it("should throw exception for invalid input object", function () {
    assert.throws(
      () => main.getCharacterNames([{}], "DC"),
      /^Error: Array includes invalid object$/
    );
  });

  it("should throw exception for missing franchise", function () {
    assert.throws(
      () => main.getCharacterNames([{ name: "Superman", franchise: "DC" }]),
      /^Error: Franchise is missing$/
    );
  });

  it("should throw exception for invalid franchise", function () {
    assert.throws(
      () => main.getCharacterNames([{ name: "Superman", franchise: "DC" }], 123),
      /^Error: Franchise is not string$/
    );
  });
});


describe("Get smallest row", function () {
  it("should return smallest row from provided example", function () {
    assert.deepEqual(
      main.getSmallestRow([
        [10, 1, 300, 4],
        [20, 2, 300, 400],
        [30, 3, 300, 4],
        [40, 4, 300, 4],
      ]),
      [1, 2, 3, 4]
    );
  });

  it("should return smallest row for matrix with equal values", function () {
    assert.deepEqual(
      main.getSmallestRow([
        [1, 1],
        [1, 1],
      ]),
      [1, 1]
    );
  });

  it("should return undefined for empty matrix", function () {
    assert.equal(main.getSmallestRow([]), undefined);
  });

  it("should return undefined for empty rows in matrix", function () {
    assert.deepEqual(main.getSmallestRow([[], []]), [undefined, undefined]);
  });

  it("should throw exception for non-numbers in array", function () {
    assert.throws(
      () =>
        main.getSmallestRow([
          ["hello", 3],
          [4, false],
        ]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get smallest column", function () {
  it("should return smallest column from provided example", function () {
    assert.deepEqual(
      main.getSmallestColumn([
        [1, 2, 3, 4],
        [1, 2, 3, 4],
        [1, 2, 30, 4],
        [1, 2, 3, 40],
      ]),
      [1, 2, 3, 4]
    );
  });

  it("should return smallest column for matrix with equal values", function () {
    assert.deepEqual(
      main.getSmallestColumn([
        [1, 1],
        [1, 1],
      ]),
      [1, 1]
    );
  });

  it("should return undefined for empty matrix", function () {
    assert.equal(main.getSmallestColumn([]), undefined);
  });

  it("should return empty array for empty rows in matrix", function () {
    assert.deepEqual(main.getSmallestColumn([[], []]), []);
  });

  it("should throw exception for non-numbers in array", function () {
    assert.throws(
      () =>
        main.getSmallestColumn([
          ["hello", 3],
          [4, false],
        ]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get 2 biggest values", function () {
  it("should return 2 biggest values from provided example", function () {
    assert.deepEqual(main.get2BiggestValues([4, 3, 2, 1]), [4, 3]);
  });

  it("should return 2 biggest values for the same values in array", function () {
    assert.deepEqual(main.get2BiggestValues([2, 2, 2]), [2, 2]);
  });

  it("should throw exception for array consisting of less than 2 numbers", function () {
    assert.throws(
      () => main.get2BiggestValues([1]),
      /^Error: Array contains less than 2 numbers$/
    );
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.get2BiggestValues(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-numbers", function () {
    assert.throws(
      () => main.get2BiggestValues(["hello", true]),
      /^Error: Array contains non-number values$/
    );
  });
});


describe("Get number of vowels", function () {
  it("should return number of vowels from provided example", function () {
    assert.equal(
      main.getNumberOfVowels(
        "Return the number (count) of vowels in the given string."
      ),
      15
    );
  });

  it("should return 0 for missing vowels", function () {
    assert.equal(main.getNumberOfVowels("Bbb cc"), 0);
  });

  it("should return 0 for empty input string", function () {
    assert.equal(main.getNumberOfVowels(""), 0);
  });

  it("should throw exception for non-string input", function () {
    assert.throws(
      () => main.getNumberOfVowels(null),
      /^Error: Not string is provided$/
    );
  });
});


describe("Get capitalized strings", function () {
  it("should return capitalized strings from provided example", function () {
    assert.deepEqual(main.getCapitalizedStrings("abcdef"), [
      "AbCdEf",
      "aBcDeF",
    ]);
  });

  it("should return 2 empty strings for empty input string", function () {
    assert.deepEqual(main.getCapitalizedStrings(""), ["", ""]);
  });

  it("should return capitalized strings for 1 character in strings", function () {
    assert.deepEqual(main.getCapitalizedStrings("a"), ["A", "a"]);
  });

  it("should throw exception for non-string input", function () {
    assert.throws(
      () => main.getCapitalizedStrings(null),
      /^Error: Not string is provided$/
    );
  });
});


describe("Get correct string", function () {
  it("should return correct string from provided example 1", function () {
    assert.equal(main.getCorrectString("eedaaad"), "eedaad");
  });

  it("should return correct string from provided example 2", function () {
    assert.equal(main.getCorrectString("xxxtxxx"), "xxtxx");
  });

  it("should return correct string from provided example 3", function () {
    assert.equal(main.getCorrectString("uuuuxaaaaxuuu"), "uuxaaxuu");
  });

  it("should return empty string for empty input string", function () {
    assert.equal(main.getCorrectString(""), "");
  });

  it("should return correct string for more than 3 chars in input string", function () {
    assert.equal(main.getCorrectString("aaaaa"), "aa");
  });

  it("should return correct string for less than 2 repeated chars in input string", function () {
    assert.equal(main.getCorrectString("abc"), "abc");
  });

  it("should throw exception for non-string input", function () {
    assert.throws(
      () => main.getCorrectString(null),
      /^Error: Not string is provided$/
    );
  });
});


describe("Get flattened array", function () {
  it("should return flattened array from provided example", function () {
    assert.deepEqual(
      main.getFlattenedArray([1, 2, [3, 4], 5, [[6, 7], 8], 9]),
      [1, 2, 3, 4, 5, 6, 7, 8, 9]
    );
  });

  it("should return flattened array for multi-dimensional array", function () {
    assert.deepEqual(main.getFlattenedArray([[[1]]]), [1]);
  });

  it("should return flattened array for empty array", function () {
    assert.deepEqual(main.getFlattenedArray([]), []);
  });
});


describe("Get not unique values", function () {
  it("should return not unique output from provided example", function () {
    assert.deepEqual(main.getNotUniqueValues([1, 2, 2, 4, 5, 5]), [2, 5]);
  });

  it("should return not unique output for missing unique values", function () {
    assert.deepEqual(main.getNotUniqueValues([1, 1, 1]), [1]);
  });

  it("should return empty array for all unique input values", function () {
    assert.deepEqual(main.getNotUniqueValues([1, 2, 3]), []);
  });

  it("should return empty output for empty input", function () {
    assert.deepEqual(main.getNotUniqueValues([]), []);
  });

  it("should throw exception for non-array input", function () {
    assert.throws(
      () => main.getNotUniqueValues(null),
      /^Error: Not array is provided$/
    );
  });

  it("should throw exception for non-numbers", function () {
    assert.throws(
      () => main.getNotUniqueValues(["hello", true]),
      /^Error: Array contains non-number values$/
    );
  });
});