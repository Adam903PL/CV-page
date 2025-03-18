import { NextResponse } from "next/server";
import { v4 } from "uuid";
import { events, Event } from "./events.data";
import { CreateEventsDTO } from "./dto/events-dto";
import { validateDto } from "./validate";

export async function GET() {
  return NextResponse.json(events);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { errors, validatedData } = await validateDto(CreateEventsDTO, body);

    if (errors) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    // Sprawdzamy, czy validatedData istnieje i ma wszystkie wymagane pola
    if (!validatedData || !validatedData.name || !validatedData.date || !validatedData.location || validatedData.capacity === undefined) {
      return NextResponse.json(
        { error: "All fields (name, date, location, capacity) are required" },
        { status: 400 }
      );
    }

    const newEvent: Event = {
      id: v4(),
      name: validatedData.name,
      date: validatedData.date,
      location: validatedData.location,
      capacity: validatedData.capacity,
    };



    events.push(newEvent);

    return NextResponse.json({message:"New Event Added",newEvent}, { status: 201 });
  } catch (error) {

    console.error("Error in POST /events:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}