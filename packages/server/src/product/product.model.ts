import {
  Table,
  Column,
  Model,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import User from "../user/user.model";

@Table({
  tableName: "product",
  timestamps: false,
})
export default class Product extends Model {
  @Column
  productName: string;

  @Column
  cost: number;

  @Column
  amountAvailable: number;

  @ForeignKey(() => User)
  sellerId: number;

  @BelongsTo(() => User)
  seller: User;
}
