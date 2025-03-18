import { NextResponse } from 'next/server';
import { orders } from '@/app/lib/types';

export async function GET(
  _request: Request,
  { params }: { params: { id: string; percent: string } }
) {
  try {
    const id = Number(params.id);
    const percent = Number(params.percent);

    if (isNaN(id) || isNaN(percent)) {
      return NextResponse.json(
        { error: 'Invalid parameters' },
        { status: 400 }
      );
    }

    if (percent > 50) {
      return NextResponse.json(
        { error: 'Maximum discount is 50%' },
        { status: 403 }
      );
    }

    const orderIndex = orders.findIndex((o) => o.id === id);
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const updatedItems = orders[orderIndex].items.map((item) => ({
      ...item,
      price: item.price * (1 - percent / 100),
    }));

    const newTotal = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    if (newTotal < 1) {
      return NextResponse.json(
        { error: 'Total cannot be less than 1' },
        { status: 400 }
      );
    }

    const updatedOrder = {
      ...orders[orderIndex],
      items: updatedItems,
      total: Number(newTotal.toFixed(2)),
    };

    orders[orderIndex] = updatedOrder;
    return NextResponse.json(updatedOrder);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}