module.exports = {
  api: {
    port: 5555
  },
  db: {
    postgres: {
      host: process.env.DB_PG_HOST || '',
      port: process.env.DB_PG_PORT || 5432,
      username: process.env.DB_PG_USERNAME || '',
      password: process.env.DB_PG_PASSWORD || '',
      database: process.env.DB_PG_DATABASE || 'sake'
    }
  }
}
