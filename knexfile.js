module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://developer:developer@localhost:5432/db_dev',
    debug: false,
    pool: {
      min: 1,
      max: 2,
    },
    migrations: {
      directory: `${__dirname}/server/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/server/db/seeds`,
    },
  },
  test: {
    client: 'pg',
    connection: 'postgres://developer:developer@localhost:5432/db_test',
    migrations: {
      directory: `${__dirname}/server/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/server/db/seeds`,
    },
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    debug: false,
    pool: {
      min: 1,
      max: 2,
    },
    migrations: {
      directory: `${__dirname}/server/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/server/db/seeds`,
    },
  },
};
