# bookmarks_app
App to read, create, update, delete vimeo and flickr bookmarks.

## Server side
To launch the project's server side, please follow those instructions below :

- go to the project's server side folder
- install all dependencies with `npm install`,
- thanks to a terminal, connect you on your postgres instance and create `bookmarks_db` database with the `database.sql` script,
- add your postgres variables to `database.ts` (host, user, password and port),
- launch with `npm run dev`

## Client side
To launch the project's client side, please follow those instructions below :

- go to the project's client side folder
- install all dependencies with `npm install`,
- launch with `npm run start`

Server and client sides communicate throught port 3001 in local.
