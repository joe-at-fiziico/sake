const fs = require('fs')
const path = require('path')

const Sequelize = require('sequelize')

const config = require('../../config')

const {
  db: {
    postgres
  }
} = config

const sequelize = new Sequelize(postgres.database, postgres.username, postgres.password, {
  host: postgres.host,
  port: postgres.port || 5432,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const db = {}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db)
//   }
// })

// sequelize
//   .sync()
//   .then(() => {
//     console.log('Connection has been established successfully.')
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err)
//   })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
