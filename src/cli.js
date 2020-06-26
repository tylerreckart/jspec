const path = require('path');
const fs = require('fs');
const logResults = require('./runner');

const BASE_DIRECTORY = path.dirname(require.main.filename);

const searchForTests = () => {
  const tests = [];

  fs.readdirSync(BASE_DIRECTORY).forEach((file) => {
    if (/\.spec.js$/.test(file)) {
      tests.push(file);
    }
  });

  return tests;
}

function run() {
  const files = searchForTests();

  if (files.length > 0) {
    files.forEach((file) => require(fs.realpathSync(`src/${file}`)));

    logResults();
  } else {
    console.error('No test files found');
  }
}

run();

