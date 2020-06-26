const chalk = require('chalk');

let testCount = 0;
let passCount = 0;
let failCount = 0;
let activeSuite = { it: [] };
let activeTest = {};

const results = [];

const log = console.log;

const describe = (desc, callback) => {
  // Reset the active suite.
  activeSuite = { it: [] };
  // Apply test constants.
  activeSuite.name = desc;
  // Run any `it` blocks.
  callback.apply(this);
  // Push the active suite to the results array.
  results.push(activeSuite);
};

const it = (desc, callback) => {
  // Increment the test count.
  testCount++;
  // Set the active test.
  activeTest = {
    name: desc,
    expects: [],
  };
  // Run the callback.
  callback.apply(this);
  // Add the test to the active suite.
  activeSuite.it.push(activeTest);
};

const formatResult = (value, method, expected) =>
  `expect ${value} ${method} ${expected}`;

const expect = (value) => ({
  toEqual: (expected) => {
    if (value === expected) {
      // The test passed. Log the result.
      activeTest.expects.push({
        name: formatResult(value, 'toEqual', expected),
        pass: true,
      });
      passCount++;
    } else {
      // The test failed. Log the result.
      activeTest.expects.push({
        name: formatResult(value, 'toEqual', expected),
        pass: false,
      });
      failCount++;
    }
  },
});

global.describe = describe;
global.it = it;
global.expect = expect;

const logResults = () => {
  log(`Total Tests: ${testCount}, Passed: ${chalk.green(passCount)}, Failed: ${chalk.red(failCount)}`);
};

module.exports = logResults;

