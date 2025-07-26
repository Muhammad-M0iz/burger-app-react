import type { Burger } from './burger';

export interface Order {
    orderId: string;
    burger: Burger;
    totalPrice: number;
    orderDate: string;
    address?: string;
}

export interface OrdersStorage {
    [email: string]: Order[];
}
