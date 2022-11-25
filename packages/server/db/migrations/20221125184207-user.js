"use strict";
const tables = require("../tables");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tables.USER, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 0,
      },
      deposit: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });

    await queryInterface.addIndex(tables.USER, {
      fields: [Sequelize.fn("lower", Sequelize.col("username"))],
      unique: true,
    });

    const queryRoleEnum = `
    CREATE TYPE "enum_UserRole" AS ENUM ('buyer', 'seller');
    ALTER TABLE "${tables.USER}" ADD COLUMN IF NOT EXISTS "role" "enum_UserRole" NOT NULL;`;

    await queryInterface.sequelize.query(queryRoleEnum);

    await queryInterface.addConstraint(tables.USER, {
      fields: ["deposit"],
      type: "check",
      where: {
        [Sequelize.Op.and]: [
          {
            deposit: Sequelize.where(Sequelize.literal("deposit % 5"), "=", 0),
          },
          {
            deposit: {
              [Sequelize.Op.gte]: 0,
            },
          },
        ],
      },
    });

    await queryInterface.addConstraint(tables.USER, {
      fields: ["username"],
      type: "check",
      where: {
        username: {
          [Sequelize.Op.regexp]: "^[a-zA-Z0-9]+([a-zA-Z0-9]+)*$",
        },
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(tables.USER);
    const query = `DROP TYPE IF EXISTS "enum_UserRole";`;

    return queryInterface.sequelize.query(query);
  },
};
