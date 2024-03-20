import Link from "next/link"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"
import { ArrowLeftIcon, MapPinIcon } from "lucide-react"

export default function Component() {
    return (
        <div className="grid lg:grid-cols-[250px_1fr] min-h-screen w-full lg:min-h-0">
            <Sidebar />
            <div className="flex flex-col">
                <div className="mx-auto px-12 py-4 grid gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/events"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back to Events
                        </Link>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 items-start gap-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Event 1</h1>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    <MapPinIcon className="h-4 w-4" />
                                    New York, NY
                                </div>
                            </div>
                            <div className="flex items-start flex-col gap-2 text-right">
                                <div className="flex items-center gap-2">
                                    <div className="text-sm font-medium">Date</div>
                                    <div className="text-sm font-medium">Mar 25, 2024</div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-sm font-medium">Time</div>
                                    <div className="text-sm font-medium">10:00 AM</div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 items-start gap-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Description</h2>
                                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Event 1 is a special occasion where we gather to celebrate our achievements and plan for the future.
                                    Join us for a day filled with excitement and inspiration. Don't miss out on this incredible
                                    opportunity to connect with like-minded individuals and learn from industry experts. Save the date
                                    and be part of something extraordinary!
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Location</h2>
                                <div className="grid grid-cols-2 items-start gap-4">
                                    <div className="space-y-2">
                                        <div className="text-sm font-medium">Venue</div>
                                        <div className="text-sm font-medium">Address</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm font-medium">Central Park Pavilion</div>
                                        <div className="text-sm font-medium">123 Main Street, New York, NY</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border rounded-lg p-4">
                            <div className="w-full grid justify-end items-end gap-2">
                                <Button type="submit">RSVP</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
