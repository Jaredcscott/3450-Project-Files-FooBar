# Project Milestone 1 
## Group Name: FooBar
## Group Members
  * Jared Scott
  * Braysen Goodwin
  * Peter Allen
  * Nathan Johnson
  
## Project Summary
  Dan from Dan's Bagels would like a web-based application to manage and operate his bagel shop.
 
## Team Organization
   * Server Code Reviewer: Braysen Goodwin 
   * Front end Reviewer: Jared Scott
   * Back End Developers: Braysen Goodwin and Nathan Johnson 
   * Fron End Developers: Jared Scott and Peter Goodwin
   
## Software Development Process

## Policies, Procedures and tools
Tools for communication:  
  * Discord (Communication and video conferencing)  
  * Canvas (General class communication)
  * Git (For version control and code review)
  * Google Drive (For file sharing) 
    
Naming Conventions:  
  * All caps for Constants 
  * Lower camel Case for variables
  * Upper camel case for components and classes

# Setup
  1. install node version manager (nvm) [mac: `brew install nvm`]
  2. install and use node version 10 `nvm install 10 && nvm alias default 10`
  3. install yarn `npm install -g yarn`
  4. install mongoDB (community edition)[https://www.mongodb.com/try/download/community]
  5. install dependencies [`cd ./server && yarn && cd ../client && yarn`]
    * navigate into the client folder and run `yarn`
    * navigate into the server folder and run `yarn`

# Starting Servers
  * start server
    1. start mongoDB server, see mongoDB documentation
    1. navigate into the server folder and run `yarn dev`
  * start client
    1. navigate into the server folder and run `yarn start`