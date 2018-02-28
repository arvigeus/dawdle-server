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
    // eslint-disable-next-line no-console
    logging: process.env.NODE_ENV === "production" ? false : console.log, // TODO: Find better logging solution
    define: {
      freezeTableName: true,
      underscored: true
    }
  }
);

export default sequelize;
