// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { v4 } from 'uuid';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateEventsDTO } from './dto/events-dto';
import { EventsPutDTO } from './dto/event-put-dto';
import { PatchEventsDTO } from './dto/events-patch-dto';
import { getEvents, saveEvents } from '@/app/api/data/events/events-store';

export async function GET(request: NextRequest) {
  const events = getEvents();
  
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  if (id) {
    const event = events.find(event => event.id === id);
    if (event) {
      return NextResponse.json({ event }, { status: 200 });
    }
    return NextResponse.json({ message: 'Event not found' }, { status: 404 });
  }
  
  return NextResponse.json({ events }, { status: 200 });
}

// POST /api/events - Create a new event
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const eventDto = plainToInstance(CreateEventsDTO, body, { excludeExtraneousValues: true });
    const errors = await validate(eventDto);
    
    if (errors.length > 0) {
      return NextResponse.json(
        { message: 'Validation failed', errors },
        { status: 400 }
      );
    }
    
    const events = getEvents();
    const newEvent = {
      id: v4(),
      ...body,
    };
    
    const updatedEvents = [...events, newEvent];
    saveEvents(updatedEvents);
    
    return NextResponse.json({ data: newEvent }, { status: 201 });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { message: 'Error creating event', error: String(error) },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {

    const searchParams = request.nextUrl.searchParams;
    const eventId = searchParams.get('id');

    if (!eventId) {
      return NextResponse.json(
        { message: 'Missing ID parameter' },
        { status: 400 }
      );
    }

  
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      return NextResponse.json(
        {
          message: 'Invalid JSON format in request body',
          error: String(jsonError),
        },
        { status: 400 }
      );
    }


    const eventDto = plainToInstance(EventsPutDTO, body, {
      excludeExtraneousValues: true,
    });
    const errors = await validate(eventDto);

    if (errors.length > 0) {
      return NextResponse.json(
        {
          message: 'Validation failed',
          errors: errors.map((err) => ({
            property: err.property,
            constraints: err.constraints,
          })),
        },
        { status: 400 }
      );
    }


    const events = getEvents();
    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex === -1) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }

    const updatedEvents = [...events];
    updatedEvents[eventIndex] = {
      id: eventId,
      ...eventDto, 
    };

    saveEvents(updatedEvents);

    return NextResponse.json(
      { data: updatedEvents[eventIndex] },
      { status: 200 }
    );
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      {
        message: 'Error updating event',  
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const eventId = searchParams.get('id');
    
    if (!eventId) {
      return NextResponse.json(
        { message: 'Missing ID parameter' },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    

    const eventDto = plainToInstance(PatchEventsDTO, body, { excludeExtraneousValues: true });
    const errors = await validate(eventDto);
    
    if (errors.length > 0) {
      return NextResponse.json(
        { message: 'Validation failed', errors },
        { status: 400 }
      );
    }
    
    const events = getEvents();
    const eventIndex = events.findIndex(event => event.id === eventId);
    
    if (eventIndex === -1) {
      return NextResponse.json(
        { message: 'Event not found' },
        { status: 404 }
      );
    }
    
    const updatedEvents = [...events];
    updatedEvents[eventIndex] = { ...events[eventIndex], ...body };
    
    saveEvents(updatedEvents);
    
    return NextResponse.json(
      { success: true, data: updatedEvents[eventIndex] },
      { status: 200 }
    );
  } catch (error) {
    console.error('PATCH error:', error);
    return NextResponse.json(
      { message: 'Error updating event', error: String(error) },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const eventId = searchParams.get('id');
  
  if (!eventId) {
    return NextResponse.json(
      { message: 'Missing ID parameter' },
      { status: 400 }
    );
  }
  
  const events = getEvents();
  const filteredEvents = events.filter((event) => event.id !== eventId);
  
  if (filteredEvents.length === events.length) {
    return NextResponse.json(
      { message: 'Event not found' },
      { status: 404 }
    );
  }
  
  saveEvents(filteredEvents);
  
  return NextResponse.json(
    { events: filteredEvents, message: 'Event successfully deleted' },
    { status: 200 }
  );
}