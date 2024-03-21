'use client'
import React, { useState } from 'react';
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboardHeader";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { createEvent } from '@/services/event.service';

export default function Event() {
    const router = useRouter();

    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState<Date>(new Date()); // Make eventDate optional and of type Date
    const [eventDescription, setEventDescription] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleRowClick = (id: number) => {
        router.push(`/events/${id}`);
    };

    const sampleData = [
            { id: 1, name: "Event 1", location: "New York, NY", date: "Mar 25, 2024" },
            { id: 2, name: "Event 2", location: "London, United Kingdom", date: "Apr 10, 2024" },
            { id: 3, name: "Event 3", location: "Berlin, Germany", date: "May 5, 2024" },
        ];
        
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // Call the createEvent function from the service
            await createEvent(eventName, eventDescription, eventLocation, eventDate);
            // Reset the form fields after successful event creation
            setEventName('');
            setEventLocation('');
            setEventDate(new Date()); // Reset eventDate to undefined
            setEventDescription('');
            // Close the dialog
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const onDialogChange = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    // Function to handle change in the event date input
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Parse the input value to a Date object
        const selectedDate = e.target.value ? new Date(e.target.value): new Date();
        setEventDate(selectedDate);
    };

    return (
        <div className="grid lg:grid-cols-[250px_1fr] min-h-screen w-full lg:min-h-0">
            <Sidebar />
            <div className="flex flex-col">
                <DashboardHeader />
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-8">
                        {sampleData.map((event) => (
                                                    <div key={event.id} className="relative group" onClick={() => handleRowClick(event.id)}>
                                                        <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md transition-transform transform-gpu group-hover:scale-105">
                                                            <h3 className="font-semibold">{event.name}</h3>
                                                            {event.location && <p className="text-sm text-gray-500">{event.location}</p>}
                                                            {event.date && <p className="text-sm text-gray-500">{event.date}</p>}
                                                        </div>
                                                    </div>
                                                ))}
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={onDialogChange}>
                        <DialogTrigger>
                            Add Event
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Add Event</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col space-y-4">
                                    <Label htmlFor="eventName">Event Name</Label>
                                    <Input type="text" id="eventName" name="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Enter event name" required />
                
                                    <Label htmlFor="eventLocation">Event Location</Label>
                                    <Input type="text" id="eventLocation" name="eventLocation" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="Enter event location" required />
                
                                    <Label htmlFor="eventDate">Event Date</Label>
                                    <Input type="date" id="eventDate" name="eventDate" value={eventDate ? eventDate.toISOString().split('T')[0] : ''} onChange={handleDateChange} required />
                
                                    <Label htmlFor="eventDescription">Event Description</Label>
                                    <Input type="text" id="eventDescription" name="eventDescription" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder="Enter event description" />
                
                                    <div className="flex justify-end">
                                        <Button type="submit">Create Event</Button>
                                    </div>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </main>
            </div>
        </div>
    );
}
