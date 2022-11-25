"use strict";
const tables = require("../tables");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(tables.PRODUCT, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      amountAvailable: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.INTEGER,
      },
      cost: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      productName: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.STRING,
      },
      sellerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: tables.USER, key: "id" },
        onDelete: "CASCADE",
      },
    });

    await queryInterface.addIndex(tables.PRODUCT, {
      fields: ["sellerId", Sequelize.fn("lower", Sequelize.col("productName"))],
      unique: true,
    });

    await queryInterface.addConstraint(tables.PRODUCT, {
      fields: ["productName"],
      type: "check",
      where: {
        productName: {
          [Sequelize.Op.regexp]: "^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$",
        },
      },
    });

    await queryInterface.addConstraint(tables.PRODUCT, {
      fields: ["cost", "amountAvailable"],
      type: "check",
      where: {
        [Sequelize.Op.and]: [
          { cost: Sequelize.where(Sequelize.literal("cost % 5"), "=", 0) },
          {
            cost: {
              [Sequelize.Op.gt]: 0,
            },
            amountAvailable: {
              [Sequelize.Op.gte]: 0,
            },
          },
        ],
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable(tables.PRODUCT);
  },
};
