'use client'
import React, { useState } from 'react';
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboardHeader";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function Event() {
    const router = useRouter();

    const sampleData = [
        { id: 1, name: "Event 1", location: "New York, NY", date: "Mar 25, 2024" },
        { id: 2, name: "Event 2", location: "London, United Kingdom", date: "Apr 10, 2024" },
        { id: 3, name: "Event 3", location: "Berlin, Germany", date: "May 5, 2024" },
    ];

    const handleRowClick = (id: number) => {
        router.push(`/events/${id}`);
    };

    const [eventName, setEventName] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSubmit = (e:React.SyntheticEvent) => {
        e.preventDefault();
        // Here you can implement the logic to create a new event with the provided data
        console.log('Creating event:', eventName, eventLocation, eventDate);
        // Reset the form fields after submission
        setEventName('');
        setEventLocation('');
        setEventDate('');
        // Close the dialog
        setIsDialogOpen(false);
    };

    const onDialogChange = () => {
        setIsDialogOpen(!isDialogOpen);
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
                        <Dialog open={isDialogOpen} onOpenChange={onDialogChange}>
                            <DialogTrigger>
                                <div className="relative group">
                                    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md transition-transform transform-gpu group-hover:scale-105">
                                        <h3 className="font-semibold">Add New Event</h3>
                                        <p className="text-sm text-gray-500">Click here to create a new event</p>
                                    </div>
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add Event</DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will permanently delete your account
                                        and remove your data from our servers.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleSubmit}>
                                    <div className="flex flex-col space-y-4">
                                        <Label htmlFor="eventName">Event Name</Label>
                                        <Input type="text" id="eventName" name="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder="Enter event name" required />
                
                                        <Label htmlFor="eventLocation">Event Location</Label>
                                        <Input type="text" id="eventLocation" name="eventLocation" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} placeholder="Enter event location" required />
                
                                        <Label htmlFor="eventDate">Event Date</Label>
                                        <Input type="date" id="eventDate" name="eventDate" value={eventDate} onChange={(e) => setEventDate(e.target.value)} required />
                
                                        <div className="flex justify-end">
                                            <Button type="submit">Create Event</Button>
                                        </div>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </main>
            </div>
        </div>
    );
}
