module.exports = {
    development: {
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'employee_directory',
      host: process.env.DB_HOST || 'mysql',
      dialect: 'mysql',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    }
  };