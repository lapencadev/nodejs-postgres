const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const sequelize = new Sequelize(
  config.dbName, 
  config.dbUser, 
  config.dbPassword, 
  {
    host: config.dbHost,
    port: config.dbPort,
    dialect: 'postgres',
    logging: console.log,  // Para ver los logs SQL
  }
);

// Verificar conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Inicializamos los modelos
setupModels(sequelize);

// Sincronizamos los modelos y creamos tablas
sequelize.sync({ alter: true })  // Usa force: true si quieres recrear tablas
  .then(() => {
    console.log('Database & tables created!');
  })
  .catch(err => {
    console.error('Error syncing the database:', err);
  });

module.exports = sequelize;
