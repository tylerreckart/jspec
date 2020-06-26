const chalk = require('chalk');

let testCount = 0;
let passCount = 0;
let failCount = 0;

let activeSuite = { it: [] };
let activeTest = {};

const results = [];

const log = console.log;

const describe = (desc, callback) => {
  activeSuite = { it: [] };
  activeSuite.name = desc;

  callback.apply(this);

  results.push(activeSuite);
};

const it = (desc, callback) => {
  testCount++;

  activeTest = {
    name: desc,
    expects: [],
  };

  callback.apply(this);

  activeSuite.it.push(activeTest);
};

const formatResult = (value, method, expected) =>
  `expect ${value} ${method} ${expected}`;

const expect = (value) => ({
  toEqual: (expected) => {
    if (value === expected) {
      activeTest.expects.push({
        name: formatResult(value, 'toEqual', expected),
        pass: true,
      });
      passCount++;
    } else {
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

