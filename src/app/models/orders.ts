import { Customer } from './customer';
import { Product } from './product';
export interface Orders {
  orderId?: number;
  customer: Customer;
  product: Product;
  amount: number;
  total: number;
  orderDate: Date;
  status: string;
}
