const { Sequelize } = require("sequelize");
const config = require("./config.json");

const environment = process.env.NODE_ENV || "development";
const dbConfig = config[environment];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port,
    logging: false,
    dialectOptions: {
      connectTimeout: 60000,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công với cơ sở dữ liệu.");
  } catch (error) {
    console.error("Không thể kết nối với cơ sở dữ liệu:", error.message);
  }
};

module.exports = connectDB;
