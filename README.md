# PlaywrightTS

A TypeScript-based Playwright framework for UI automation testing, featuring accessibility scanning, logging, and utility helpers.

## Features

- Playwright test integration
- Accessibility testing with Axe
- Logging utilities
- Browser and web element actions
- Screenshot capabilities
- CSV data handling

## Installation

```bash
npm install playwrightts
```

## Usage

```typescript
import { logger, WebElementAction, AxeUtilites } from 'playwrightts';

// Example usage
// (Add your code examples here)
```

## Building

```bash
npm run build
```

## Running Tests

```bash
npm run ui-test
```

## Viewing Reports

```bash
npm run show-report
```

## License

ISC

######################################################################################################################

#Execution of Playwright in docker container
Auto Approach (used mostly on CI/CD ):
    docker build -t myplaywrightits .  -> which the build the playwright images either check the cache or download the image from docker hub.
    
    docker run --rm -v ${PWD}/playwright-report:/app/playwright-report -e HEADLESS=true playwright-ts 
                -> To copy the report from container we mount the report file from docker to local host machine using "-V ${PWD}/playwright-report :/app/playwright-report
                -> --rm removal of contianer for clean up activites
                -> -e Headless=true "To run tests in headless mode only support by docker
                -> playwright-ts : is an image name of the playwirght that generate ramdom container id

    To view containers under playwright-ts image
                docker ps -a

    Manual Approach :
         to copy report from docker to local machine
    docker build -t myplaywrightits .  -> which the build the playwright images either check the cache or download the image from docker hub.
    docker run -e Headless=true playwright-ts -> to run the playwright test
    docker cp playwrightContainerId:/app/playwright-report ./playwright-report ->copied from docker env to local env
    ->docker cp playwrightContainerId:/app/playwright-report : Path of the report inside the docker
    ->./playwright-report : Path of the report in the local machine

    ##################################################################################################################


