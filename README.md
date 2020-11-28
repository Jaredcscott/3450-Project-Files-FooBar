# Project Milestone 3
## Group Name: FooBar
## Group Members
  * Jared Scott
  * Braysen Goodwin
  * Peter Allen
  * Nathan Johnson

---
  
## Project
  Dan from Dan's Bagels would like a web-based application to manage and operate his bagel shop. See the [google drive](https://drive.google.com/drive/folders/1U6tCNB-WRtASPWM0pf92Lu5S1zJgnxXI?usp=sharing) for living documents.
 
## Team Organization
   * Server Code Reviewer: Braysen Goodwin 
   * Front End Code Reviewer: Jared Scott
   * Back End Developers: Braysen Goodwin and Nathan Johnson 
   * Fron End Developers: Jared Scott and Peter Goodwin

### Team Planning

We will be using an agile development method for this project. We will have sprint planning every Monday after class between 2:30pm-3:00pm to determine tasks for the week, and standup/scrum on Wednesday and Friday after class between 2:30pm and 3:00pm.

---

## Software Development Process

## Policies, Procedures and tools


#### Tech stack
*  client
   * [react](https://reactjs.org) - front end rendering
   * [styled-components](https://styled-components.com/docs/advanced#theming) - css manager
   * [react-redux](https://www.npmjs.com/package/react-redux) - front end state manager
   * [react-query](https://react-query.tanstack.com) - back end (server) state manager
   * [axios](https://github.com/axios/axios) - back end (server) communication manager
   * [react-testing-library](https://testing-library.com/docs/react-testing-library/intro) - testing framework (extends [jest](https://jestjs.io) testing framework)
   * [yarn](https://www.npmjs.com/package/yarn) - package (dependency) manager
   * [flow](https://flow.org) - type hinting
   * [eslint](https://www.npmjs.com/package/eslint) - code syntax enforcer
* server
   * [nodejs](https://nodejs.org/en/) - javascript interpreter
   * [express](http://expressjs.com) - http(s) request handler (router)
   * [express-ws](https://github.com/HenningM/express-ws) - websocket handler
   * [mongoose](https://mongoosejs.com/docs/index.html) - database interface
   * [jest](https://jestjs.io) - testing framework
   * [yarn](https://www.npmjs.com/package/yarn) - package (dependency) manager
   * [flow](https://flow.org) - type hinting
   * [eslint](https://www.npmjs.com/package/eslint) - code syntax enforcer
* database
   * [mongoDB](https://docs.mongodb.com/manual/) - database (none sql)

#### Tools for communication:  
  * Discord (Communication and video conferencing)  
  * Canvas (General class communication)
  * Git (For version control and code review)
  * Google Drive (For file sharing) 
    
#### Naming Conventions:
  * variables:
    * All caps for Constants 
    * Lower camel Case for variables
    * Upper camel case for components and classes
  * files:
    * files which export component(s) or classes have UpperCamelCase names
    * folders which contain an `index.js` file which exports a component, then the name is UpperCamelCase, else the folder name is lowerCamelCase.

#### Code organization:
  * no code should be referenced between the `server` and `client` folders.
  * server
    * all url end points should exist within the `routes` folder.
    * all shared functions between files should exists outside the `routes` folder.
    * all mongoose models should exist within the `models` folder.
  * client
    * all url routes should be handled by a single parent (wrapper)component in a file or folder within the `routes` folder.

#### Code preferences:
These are not hard rules, but they should be followed whenever possible.
  * client
    * all persistent variables values (values which persist between renders) should be treated as immutable (you can use [immer](https://immerjs.github.io/immer/docs/introduction) for easy immutability).
    * all colors, fontsizes, and spacing (padding and margin) should be based off the theme supplied by (styled components )[https://styled-components.com/docs/advanced#theming].



#### Version Control Procedure:
  * All code files and code documentation is handled by git.
  * Before merge to `master` (or `dev`) all merge/pull requests must be reviewed by at least one other member (preferably by the appropriate reviewer - Braysen for back end, Jared for front end).
  * Living documents are in [google drive](https://drive.google.com/drive/folders/1U6tCNB-WRtASPWM0pf92Lu5S1zJgnxXI?usp=sharing).


---

## Running Testing

#### Creating tests:
  * server (uses [jest](https://jestjs.io))
    * unit tests should be created for any general functions (if unable to test separately, it should be tested in the system it is used).
    * each route should be tested for good and bad data.
  * client (uses [jest](https://jestjs.io) with [react-testing-library](https://testing-library.com/docs/react-testing-library/intro))
    * generalized components should be tested individually (if none-trivial).
    * server queries should have a mock implementation in the client.
    * routes should be tested as a whole.
  * system
    * manual testing of the client and server (combined) should be done each week on saturday.

#### Running automated tests (system/unit)
  1. navigate to the client or server folder and run `yarn test` ([majestic](https://github.com/Raathigesh/majestic) can be used if you want a GUI).

#### Manual testing instructions (system)
  1. check out the master branch of both client and server.
  2. use setup instructions.
  3. use the client to try to break everything.
  4. write down what is broken, and steps to recreate.
  5. bugs will be discussed during sprint planning the next Monday.

---


# Setup
  1. install node version manager (nvm) [mac: `brew install nvm`]
  2. install and use node version 10 `nvm install 10 && nvm alias default 10`
  3. install yarn `npm install -g yarn`
  4. install mongoDB [community edition](https://www.mongodb.com/try/download/community)
  5. install dependencies `cd ./server && yarn && cd ../client && yarn`
      * navigate into the client folder and run `yarn`
      * navigate into the server folder and run `yarn`
  6. navigate to server folder and copy the file `.env.example` to `.env`
  7. navigate to the client folder and copy the file `.env.development` to `.env`
  8. install google chrome
  9. install google chrome extensions
      * install [react developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
      * install [redux developer tools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

# Starting Servers
  * start server
    1. start mongoDB server, see mongoDB documentation
    1. navigate into the server folder and run `yarn dev`
  * start client
    1. navigate into the server folder and run `yarn start`
 

