import type { IPartner } from "./Partner";
import type { ISale } from "./Sales";
import type { IUser } from "./User";

export interface IProduct {
  id: number;
  description: string;
  vendorId: number;
  vendor: IUser;
  partners: IPartner;
  createdAt: Date;
  updatedAt: Date;
  Sale: Array<ISale>;
}
