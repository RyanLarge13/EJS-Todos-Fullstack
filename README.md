# Todo-Fullstack
A fullstack todo application made with EJS for clientside rendering, and Nodejs as the backend. 

# Dependencies
## Auth
* bcryptjs
* passport
* passport-local
* express-session
* cors

## Server
* express
* body-parser
* ejs
* dotenv 

## Database
* mongoose

# Logic
## MongoDB
For the database I used a collective configuration in my collections storing all users, todos, and finished todos in their own collection. Authentication and mongoose implementation sorts through the collection and finds each user specific document.

## Server
Node.js was utalized for this project. Express as the framework to handle routing. A single homepage route was implemented in the main server file, the rest were split into different express.Router variables for each subject. Mainly for the ease of scalability and readability. 

## Routes 
Most routes given are directly correlated to a view via ejs in the client folder. Although some routes, specifically logging out and manipulating todos were designed for the fetch api from client side. 

## Structure
This application structure was built for scalability as I plan to evolve the project and continue building better, greater, and buggless functionality. 

# API Routes
## "/" 
### GET
**Returns the main index.ejs file. This route searches for a user and if present also renders the profile button link**

## "/signup"
### GET
**Returns the signup ejs template**

## "/signup"
### POST
**Sends request body with from data to add a new new user to the database**

## "/signin"
### GET
**Returns the signin ejs template**

## "/signin"
### POST
**Send the requested body to the server and queries the database for a username that matches the body**

## "/profile"
### GET
**This is a protected route. This renders the profile ejs template with user data**

## "/add"
### POST
**This is a protected route. This will upload a new todo to the database with information from the request body and tie it to the user**

## "delete/:todo"
### DELETE
**Returns the todo title with request query searches the database, removes the found todo tied to the request user and adds it to the removed todos list, also tied to the user**

## "remove/:todo"
### DELETE
**Grabs the request query todo as a title to search MongoDB and delete a todo tied to the user from the database**
