<div align="center">
    <img src="./public/vb-logo.svg">
    <h1>VB - Frontend</h1>
    <a href="#">Report a Bug</a>
    ·
    <a href="#">Request a Feature</a>
    .
    <a href=#">Ask a Question</a>
    <br />
    This repository includes all code realted with Varsity Brand site.
</div>

<br />

> NOTE: this README is under continuous development.

<hr />

## Requirements:

- NodeJS >=v18.15.0

<br />

## Stack:

- Typescript
- NextJS _([https://nextjs.org/docs/getting-started](https://nextjs.org/docs/getting-started))_
- SWR _([https://swr.vercel.app/docs/getting-started](https://swr.vercel.app/docs/getting-started))_
- SASS
- ESLint
- Prettier
- Storybook _([https://storybook.js.org/docs/react/get-started/install/](https://storybook.js.org/docs/react/get-started/install/))_
- Cypress _([https://www.cypress.io/](https://www.cypress.io/))_

<br />

## Getting Started

```sh
# Install dependencies:
npm i

# Run project (dev mode):
npm run dev
```

<br />

## NPM Scripts

```sh
# Install dependencies:
npm i

# Run project (dev mode):
npm run dev

# Linter:
npm run lint

# Prettier:
npm run format:prettier

# ESLint:
npm run format:eslint

# Format:
npm run format:fix

# Storybook:
npm run sb

# Buld Storybook:
npm run build-sb

# Run cypress
npm run cypress
```

<br />

## Testing

### **Test Automation**

Cypress starter pack for UI and API automation testing by the Varsity QA Team. Simple and neat folder structure in combination with typescript will help you write test faster. The Dockerfiles will guide you to setup the CI/CD pipeline quickly.

**Prerequisites**

1. Node v18 or higher (currently LTS version is v18.16.0, check using `node -v`).
2. Docker Desktop (check using `docker -v`).
3. GIT Bash (recommended)
4. Any IDE that support Prettier and Eslint extensions.

**Setup**

1. Make sure all the dependencies are installed `npm install`.
2. Environments availables `qa`, `dev`, `uat` on path `./cypress/config`.

**Execution**

Using docker

- `npm run test` - will trigger the docker container and will run all the test cases there.

Direct from the command line

- `npm run cypress:open` - runs test via gui
- `npm run cypress:run` - run tests via command line
- `--env TEST_ENV=<env>` - select an environment specific config
- `-s '<pathToFile>'` path for the spec files you wish to run
  - `-s 'cypress/ui/example.e2e.test.ts'` example

**Tests structure**

| Type          | Location                                 |
| ------------- | ---------------------------------------- |
| api           | [cypress/tests/api](./cypress/tests/api) |
| ui            | [cypress/tests/ui](./cypress/tests/ui)   |
| mobile        | TBD                                      |
| accessibility | TBD                                      |
| unit          | TBD                                      |

**Browserstack**

BrowserStack enables you to run automated tests on your internal development environments, on localhost, and from behind a corporate firewall.

1. Configuring BrowserStack credentials (if not already done)
   All our sample scripts need your BrowserStack credentials to run, just create them.
   Please set the environment variables `BROWSERSTACK_USERNAME` and `BROWSERSTACK_ACCESS_KEY` with your credentials as shown below:

```bash
export BROWSERSTACK_USERNAME=[xxxx]
export BROWSERSTACK_ACCESS_KEY=[xxxx]
```

2. Run your test

```bash
  npm run browserstack
```

Note: The script `browserstack` is using the file `cypress/utils/generateBrowserstackConfig.ts` to generate the configuration file found in the root of the project called `browserstack.json`. This util file is creating a dynamic name for the build name reading the following environment variables:

```bash
export TEST_RELEASE=[xxxx]  // number of the release
export TEST_TYPE=[xxxx]     // type of test:  api, ui, mobile, accessibility
export TEST_SUITE=[xxxx]    // suite to execute: smoke or regression
export TEST_ENV=[xxxx]      // environemnt of the execution: dev, qa, uat
```

**Docker**

A dockerfile that triggers the test execution is created under the path `./Dockerfile.Qa`

```bash
FROM cypress/included:latest
WORKDIR /test
COPY ./cypress ./cypress
COPY package.json package.json
COPY cypress.config.js cypress.config.js
RUN npm install
CMD ["node", "npx cypress run --env TEST_ENV=qa"]
```

To create the image, use

```bash
docker build --no-cache -f Dockerfile.Qa -t cypress .
```

To run the image, use

```bash
docker run --rm cypress
```

To run the image in bash mode, remove or comment the CMD line on dockerfile `CMD [...]` and then use

```bash
docker run -it --entrypoint bash cypress
```

**Accessibility**

Cypress use the depednency `cypress-axe` to validate all the (WCAG) 2.0 rules and validation.

To implement accessibility testing, add the following task:

```bash
cy.checkPageA11y('/');
```

Then from the console, a table with the accessibility rules and errors will be displayed example:

```bash
┌─────────┬────────────┬────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┬───────┐
│ (index) │   impact   │                                                            description                                                             │ nodes │
├─────────┼────────────┼────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┼───────┤
│    0    │  'minor'   │                       'Ensures role attribute has an appropriate value for the element (aria-allowed-role)'                        │   1   │
│    1    │ 'critical' │                              'Ensures all ARIA attributes have valid values (aria-valid-attr-value)'                               │   2   │
│    2    │ 'serious'  │ 'Ensures the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds (color-contrast)' │   8   │
│    3    │  'minor'   │                                    'Ensures every id attribute value is unique (duplicate-id)'                                     │   1   │
│    4    │ 'moderate' │                                   'Ensures the document has a main landmark (landmark-one-main)'                                   │   1   │
└─────────┴────────────┴────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────┴───────┘
```

Also, from the Cypress Runner window, you're going to get the accessibility issues from the console.log present on the steps of the testcase once it gets executed.
<br />

## Build & Deploy

> _See [NextJS Docs](https://nextjs.org/docs/deployment)_
