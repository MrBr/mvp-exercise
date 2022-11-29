"use strict";
const tables = require("../tables");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(tables.USER, "tokenValidFrom", {
      allowNull: false,
      defaultValue: 0,
      type: Sequelize.BIGINT,
    });
    await queryInterface.addColumn(
      tables.USER,
      "lastTokenExpiry",
      Sequelize.BIGINT
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn(tables.USER, "tokenValidFrom");
    await queryInterface.removeColumn(tables.USER, "lastTokenExpiry");
  },
};
