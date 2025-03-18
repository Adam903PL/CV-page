export type OrderItem = {
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id: number;
  items: OrderItem[];
  total: number;
};

export const orders: Order[] = [
  {
    id: 1,
    items: [
      { name: "Pizza", price: 1, quantity: 1 },
      { name: "Cola", price: 0.2, quantity: 2 },
    ],
    total: 40,
  },
  {
    id: 2,
    items: [
      { name: "Burger", price: 20, quantity: 2 },
      { name: "Fries", price: 10, quantity: 1 },
    ],
    total: 50,
  },
  {
    id: 3,
    items: [
      { name: "Pasta", price: 25, quantity: 1 },
      { name: "Juice", price: 8, quantity: 2 },
    ],
    total: 41,
  },
];
