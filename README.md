###To run locally

1. Install postgresSQL https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
2. Clone this repo
3. Install both server and web dependecies by running npm install or yarn install
4. Run PSQL Console and paste this code `CREATE DATABASE 'swupp-local-dev-db'`
5. Lastly run this command 'npm run dev' on both server and web folder.

###Deployment
**For SERVER DEPLOYMENT RUN THIS ON ROOT FOLDER CONSOLE**
`git subtree push --prefix server heroku-server master`

**For WEB DEPLOYMENT RUN THIS ON ROOT FOLDER CONSOLE**
`git subtree push --prefix web heroku-web master`
