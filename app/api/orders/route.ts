import { NextResponse } from 'next/server';
import { z } from 'zod';
import { OrderItem, Order, orders } from '@/app/lib/types';

const OrderItemSchema = z.object({
  name: z.string(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema),
});

export async function GET() {
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = CreateOrderSchema.parse(body);
    
    const total = validatedData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    
    const newOrder: Order = {
      id: orders.length + 1,
      items: validatedData.items,
      total,
    };
    
    orders.push(newOrder);
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}