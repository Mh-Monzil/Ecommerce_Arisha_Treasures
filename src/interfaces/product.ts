export interface IProduct {
  _id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  sales?: number;
  discount: number;
  rating: number;
  ratingCount: number;
  isDeleted?: boolean;
  createdAt: string;
}
