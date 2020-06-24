const path = require('path');
const fs = require('fs');
const logResults = require('./runner');

const EXTENSION = '.spec.js';

const searchForTests = () => {
  fs.readdir(__dirname, (err, files)) => {
    return files.filter(el => /\.spec.js$/.test(el));
  }
}

function run() {
  const files = searchForTests();

  if (files.length > 0) {
    logResults();
  } else {
    console.error('No test files found');
  }
}

run();

