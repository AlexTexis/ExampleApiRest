require('dotenv').config()

const config = {
  dev : process.env.NODE_ENV !== 'production',
  dbUser : process.env.DB_USER,
  dbPassword : process.env.DB_PASSWORD,
  dbHost : process.env.DB_HOST,
  dbPort : process.env.DB_PORT,
  dbName : process.env.DB_NAME,
  secretKey : process.env.AUTH_SECRET_JWT,
  adminUser : process.env.ADMIN_USER,
  adminPassword : process.env.ADMIN_PASSWORD
}

module.exports = {
  config
}