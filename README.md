################################### DEV NOTES ###################################

to run this app locally, first run npm install in the root, frontend, and backend.

.env is required in the backend folder with the following parameters:

NODE_ENV = either 'development' or 'production'

PORT = the port to run the express server on

MONGO_URI = the connection uri to the mongoDB database you are hosting from

JWT_SECRET = any phrase to sign your tokens with

concurrently is installed in the root folder, so run npm run dev
there to start react on port 3000 & express on process.env.PORT.
make sure NODE_ENV = development in this case.
it also connects to the mongoDB database through mongoose
via process.env.MONGO_URI.

to instead run in production mode, run npm run build in the frontend,
set NODE_ENV to production, and run npm run start in the root.
you may then access the app at localhost:process.env.PORT.

for heroku deployment, push to the heroku remote via git push heroku main.
heroku then runs the postbuild script in the root package.json.

#################################################################################
