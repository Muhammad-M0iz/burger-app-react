export type Burger={
    ingredients: Array<{
        name: string;
        price: number;
        quantity: number;
    }>,
    totalPrice: number;
}