import { Table, Column, Unique, Model, Validate } from "sequelize-typescript";

@Table({
  tableName: "user",
  timestamps: false,
  defaultScope: {
    attributes: {
      exclude: ["password", "tokensValidFrom", "lastTokenExpiry"],
    },
  },
  scopes: {
    withSensitiveData: {},
    withTokenData: {
      attributes: {
        exclude: ["password"],
      },
    },
  },
  hooks: {
    afterCreate: (record) => {
      delete record.dataValues.password;
    },
  },
})
export default class User extends Model {
  @Unique
  @Column
  username: string;

  @Column
  password: string;

  @Column
  role: "buyer" | "seller";

  @Validate({ min: 0 })
  @Column
  deposit: number;

  @Column
  tokenValidFrom: number;

  @Column
  lastTokenExpiry?: number;
}
