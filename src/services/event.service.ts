import { toast } from "sonner";

interface Event {
    id: string;
    title: string;
    description: string;
    location: string;
    date: Date;
}

export async function createEvent(title: string, description: string, location: string, date: Date): Promise<Event> {
    const response = await fetch('/api/event', {
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
    toast
    return data;
}

export async function getEvents(){
    const response = await fetch('/api/event', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch events');
    }

    const data = await response.json();
    return data;
}

export async function enrollUser(eventId: number): Promise<Event> {
    const response = await fetch('/api/event/enroll', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ eventId })
    });

    if (!response.ok) {
        throw new Error('Failed to enroll user in event');
    }

    const data: Event = await response.json();
    toast.success('Enrolled in event');
    return data;
}
