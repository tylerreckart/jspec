const testCount = 0;
const passCount = 0;
const failCount = 0;

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

const formatResult = (value, expected) =>
  `expect ${value} ${method} ${expected}`;

const expect = (value) => ({
  toEqual: (expected) {
    if (value === expected) {
      activeTests.expects.push({
        name: formatResult(value, 'toEqual', expected),
        pass: true,
      });
      passCount++;
    } else {
      activeTests.expects.push({
        name: formatResult(vlaue, 'toEqual', expected),
        pass: false,
      });
      failCount++;
    }
  },
});

global.describe = describe;
global.it = it;
global.expect = expect;

export default function logResults() {
  log(`Total Tests: ${testCount}, Passed: ${passCount}, Failed: ${failCount}`);
}

