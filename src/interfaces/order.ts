import { IProduct } from "./interface";
import { IUser } from "./user";

export interface IOrderItem {
  productId: IProduct;
  quantity: number;
}

export interface IOrder {
  _id: string;
  orderId: string;
  user?: IUser | null;
  name: string;
  email: string;
  phoneNumber: string;
  totalPrice: number;
  discount: number;
  status: "pending" | "processing" | "delivered" | "cancelled";
  shippingAddress: {
    street: string;
    city: string;
    state?: string;
    country: string;
    zipCode?: string;
  };
  orderItems: IOrderItem[];
  paymentMethod: "cash on delivery";
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
