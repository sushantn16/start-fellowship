'use client'
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboardHeader";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Component() {
    const router = useRouter();

    const sampleData = [
        { id: 1, name: "Event 1", location: "New York, NY", date: "Mar 25, 2024" },
        { id: 2, name: "Event 2", location: "London, United Kingdom", date: "Apr 10, 2024" },
        { id: 3, name: "Event 3", location: "Berlin, Germany", date: "May 5, 2024" },
    ];

    const handleRowClick = (id: number) => {
        router.push(`/events/${id}`);
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
                        <div className="relative group">
                            <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md transition-transform transform-gpu group-hover:scale-105">
                                <h3 className="font-semibold">Add New Event</h3>
                                <p className="text-sm text-gray-500">Click here to create a new event</p>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}
