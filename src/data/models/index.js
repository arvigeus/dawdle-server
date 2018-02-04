import Sequelize from "sequelize";
import sequelize from "../sequelize";

import sleep from "lib/sleep";

import CalendarEvent from "./CalendarEvent.js";
import Device from "./Device.js";
import Friend from "./Friend.js";
import Message from "./Message.js";
import Note from "./Note.js";
import Todo from "./Todo.js";
import User from "./User.js";

// Workaround for BIGINT types
require("pg").defaults.parseInt8 = true; // eslint-disable-line import/no-commonjs

export default async () => {
  let maxReconnects = 20;
  let connected = false;

  while (!connected && maxReconnects) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await sequelize.authenticate();
      connected = true;
    } catch (err) {
      console.info("reconnecting in 5 seconds");
      // eslint-disable-next-line no-await-in-loop
      await sleep(5000);
      maxReconnects -= 1;
    }
  }

  if (!connected) throw new Error("Could not connect to database");

  const models = {
    CalendarEvent,
    Device,
    Friend,
    Message,
    Note,
    Todo,
    User
  };

  Object.keys(models).forEach(modelName => {
    if ("associate" in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  await sequelize.sync({});

  models.sequelize = sequelize;
  models.Sequelize = Sequelize;
  models.op = Sequelize.Op;

  return models;
};
