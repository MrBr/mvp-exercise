# MVP exercise
A few notes

## Server

- run `npm install` (in the root project folder)
- create `.env` file
- create `config/database.json` file (look at server/.database.template)
- run `npx sequelize db:migrate`
- run `npm start`

### Testing

- create `.env.test` file (look at server/.env.template)
- create `config/database.json` file (look at server/.database.template)
- add `test` configuration to `config/database.json` file
- run `docker image build . -t preloaded_db:latest --no-cache` in server folder
- run `npm test` in server folder

## Server

- run `npm install` (in the root project folder)
- create `.env` file (look at web/.env.template)
- run `npm start`
