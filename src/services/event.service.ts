interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    date: Date;
}

export async function createEvent(title: string, description: string, location: string, date: Date): Promise<Event> {
    const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, location, date })
    });

    if (!response.ok) {
        throw new Error('Failed to create event');
    }

    const data: Event = await response.json();
    return data;
}

export async function getEvents(): Promise<Event[]> {
    const response = await fetch('/api/events', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    const data: Event[] = await response.json();
    return data;
}

export async function enrollUser(eventId: string, userId: string): Promise<Event> {
    const response = await fetch('/api/events/enroll', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId, userId })
    });

    if (!response.ok) {
        throw new Error('Failed to enroll user in event');
    }

    const data: Event = await response.json();
    return data;
}
