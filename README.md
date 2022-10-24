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

