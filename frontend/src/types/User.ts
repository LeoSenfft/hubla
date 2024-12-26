import type { IPartner } from "./Partner";
import type { IProduct } from "./Product";
import type { ISale } from "./Sales";

export interface IUser {
  id: number;
  name: string;
  balance: number;
  sales: Array<ISale>;
  products: Array<IProduct>;
  partners: Array<IPartner>;
  createdAt: Date;
  updatedAt: Date;
}
