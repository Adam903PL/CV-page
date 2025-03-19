

const initialEvents = [
    {
      id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
      name: "Tech Conference 2025",
      date: "2025-06-15",
      location: "Warsaw",
      capacity: 500,
    },
    {
      id: "7e9162e7-90a8-4a55-8d71-5424124afdcb",
      name: "Something",
      date: "2026-07-25",
      location: "Lublin",
      capacity: 210,
    },
  ];
  

  
  interface Event {
    id: string;
    name: string;
    date: string;
    location: string;
    capacity: number;
  }
  

  const store: { events: Event[] } = { events: [...initialEvents] };
  
  export function getEvents(): Event[] {
    return [...store.events];
  }
  
  export function saveEvents(events: Event[]): void {
    store.events = [...events];
  }
