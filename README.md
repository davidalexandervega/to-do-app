######################### DEV NOTES #########################

to run this app locally, first run npm install in the root,
frontend, and backend folders.

.env is required in the backend folder with the following parameters:
NODE_ENV = either 'development' or 'production'
PORT = the port to run the express server on
MONGO_URI = the connection uri to the mongoDB database you are hosting from
JWT_SECRET = any phrase to sign your tokens with

concurrently is installed in the root folder, so run npm run dev
there to start react on port 3000 & express on process.env.PORT.

it also connects to the mongoDB database through mongoose 
via process.env.MONGO_URI.

#############################################################