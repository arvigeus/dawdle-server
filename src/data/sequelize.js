import Sequelize from "sequelize";

// Workaround for BIGINT types
require("pg").defaults.parseInt8 = true; // eslint-disable-line import/no-commonjs

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: "postgres",
    operatorsAliases: Sequelize.Op,
    host: process.env.DB_HOST,
    logging: true,
    define: {
      freezeTableName: true,
      underscored: true
    }
  }
);

export default sequelize;
