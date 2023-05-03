const { Sequelize } = require('sequelize');

// Create a Sequelize instance with the database credentials
const sequelize = new Sequelize('tubes3_stima', 'root', 'Agilham301202', {
  host: 'localhost',
  dialect: 'mysql'
});

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
