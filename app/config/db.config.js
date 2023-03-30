module.exports = {
  HOST: "localhost",
  USER: process.env.USER,
  PASSWORD: process.env.PASSWORD,
  DB: "dev_bondo",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
