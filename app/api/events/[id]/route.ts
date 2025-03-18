import { NextRequest, NextResponse } from "next/server";
import { events, Event } from "../events.data";
import { EventsPutDTO } from "../dto/event-put-dto";
import { PatchEventsDTO } from "../dto/events-patch-dto";
import { validateDto } from "../validate";

type Params = { params: { id: string } };

export async function GET(req: NextRequest, { params }: Params) {
  const event = events.find((e) => e.id === params.id);

  if (!event) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Selected event", event });
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const eventIndex = events.findIndex((e) => e.id === params.id);

    if (eventIndex === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const body = await req.json();
    const { errors, validatedData } = await validateDto(EventsPutDTO, body);

    if (errors) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const updatedEvent: Event = {
      ...events[eventIndex],
      ...validatedData,
      id: params.id,
    };

    events[eventIndex] = updatedEvent;
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: Params) {
  try {
    const eventIndex = events.findIndex((e) => e.id === params.id);

    if (eventIndex === -1) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    const body = await req.json();
    const { errors, validatedData } = await validateDto(PatchEventsDTO, body);

    if (errors) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const updatedEvent: Event = {
      ...events[eventIndex],
      ...validatedData,
      id: params.id,
    };

    events[eventIndex] = updatedEvent;
    return NextResponse.json(updatedEvent);
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  const eventIndex = events.findIndex((e) => e.id === params.id);

  if (eventIndex === -1) {
    return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  events.splice(eventIndex, 1);
  return NextResponse.json({ success: true, message: `Event id:${params.id} has been deleted` });
}