const path = require('path');
const fs = require('fs');

// Get the absolute path of the package.json file
const packageJsonPath = path.resolve(__dirname, '../../package.json');

// Get the directory path of the package.json file
const packageJsonDir = path.dirname(packageJsonPath);

// Specify the path of the JSON file relative to the package.json file
const jsonFilePath = path.join(packageJsonDir, 'browserstack.json');

// Check if the config.json file exists, and delete it if it does
if (fs.existsSync(jsonFilePath)) {
  fs.unlinkSync(jsonFilePath);
}

// generates the project name with format [Varsity][Release xxx] {API or UI} - {Type of testing: Smoke or Regression} - {Environment} - {timestamp in format MM/DD/YYY}:{hour in format HH:MM}
function generateProjectName() {
  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: 'America/Chicago',
  });
  const release = process.env.TEST_RELEASE; // number of the release
  const type = process.env.TEST_TYPE; // type of test:  api, ui, mobile, accessibility
  const testSuite = process.env.TEST_SUITE; // suite to execute: smoke or regression
  const environment = process.env.TEST_ENV; // environemnt of the execution: dev, qa, uat
  let projectName = `[Varsity] [${release}] `;
  if (type) {
    projectName += ` - ${type}`;
  }
  if (testSuite) {
    projectName += ` - ${testSuite}`;
  }
  projectName += ` - Env:[${environment}] - ${currentDate}`;
  return projectName;
}

const jsonData = {
  browsers: [
    {
      os: 'Windows 11',
      browser: 'chrome',
      versions: ['latest'],
    },
    {
      os: 'Windows 11',
      browser: 'edge',
      versions: ['latest'],
    },
    {
      os: 'Windows 11',
      browser: 'firefox',
      versions: ['latest'],
    },
  ],
  run_settings: {
    cypress_config_file: './cypress.config.ts',
    project_name: 'Varsity',
    build_name: generateProjectName(),
    downloads: ['../reports', '../browserstackReport'],
    npm_dependencies: {
      cypress: '^12.10.0',
      typescript: '^5.0.4',
      'cypress-axe': '^1.4.0',
      'axe-core': '^4.0.2',
      '@cypress/grep': '^3.1.5',
      xmldom: '^0.6.0',
      '@types/xmldom': '^0.1.31',
    },
    package_config_options: {},
    headless: true,
  },
  connection_settings: {
    local: false,
  },
  disable_usage_reporting: false,
};

// Write the config object to the JSON file
fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData));
