import { Table, Column, Unique, Model } from "sequelize-typescript";

@Table({
  tableName: "user",
  timestamps: false,
  defaultScope: {
    attributes: {
      exclude: ["password"],
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

  @Column
  deposit: number;
}
