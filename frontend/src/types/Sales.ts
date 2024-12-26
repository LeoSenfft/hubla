import type { IProduct } from "./Product";
import type { IUser } from "./User";

export interface ISale {
  id: number;
  type: ISaleType;
  typeId: number;
  saleDate: Date;
  product: IProduct;
  productId: number;
  value: number;
  user: IUser;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISaleType {
  id: number;
  description: string;
  nature: string;
}
