export interface IProduct {
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  sales?: number;
  discount: number;
  isDeleted?: boolean;
}
