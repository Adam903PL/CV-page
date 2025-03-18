import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Order, orders } from '@/app/lib/types';

const UpdateOrderSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      price: z.number().positive(),
      quantity: z.number().int().positive(),
    })
  ),
});

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json(
      { error: 'Invalid order ID' },
      { status: 400 }
    );
  }

  const order = orders.find((o) => o.id === id);
  if (!order) {
    return NextResponse.json(
      { error: 'Order not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(order);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validatedData = UpdateOrderSchema.parse(body);

    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const total = validatedData.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const updatedOrder: Order = {
      ...orders[orderIndex],
      items: validatedData.items,
      total,
    };

    orders[orderIndex] = updatedOrder;
    return NextResponse.json(updatedOrder);
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

export async function DELETE(
    _request: Request,
    { params }: { params: { id: string } }
  ) {
    const id = Number(params.id);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }
  
    const orderIndex = orders.findIndex((o) => o.id === id);
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
  
    
    orders.splice(orderIndex, 1);
    
    return NextResponse.json({ success: true });
  }