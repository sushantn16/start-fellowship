import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPinIcon, ArrowLeftIcon } from "lucide-react"
import Sidebar from "@/components/sidebar"


export default function DashboardDetail() {
    return (
        <div className="grid lg:grid-cols-[250px_1fr] min-h-screen w-full lg:min-h-0">
            <Sidebar />
            <div className="flex flex-col">
                <div className="mx-auto px-12 py-4 grid gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            href="/dashboard"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                            Back to Startups
                        </Link>
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 items-start gap-4">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Acme Inc</h1>
                                <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                    <MapPinIcon className="h-4 w-4" />
                                    San Francisco, CA
                                </div>
                            </div>
                            <div className="flex items-start flex-col gap-2 text-right">
                                <div className="flex items-center gap-2">
                                    <div className="text-sm font-medium">Stage</div>
                                    <Badge className="h-6">Series A</Badge>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="text-sm font-medium">Employees</div>
                                    <div className="text-sm font-medium">25</div>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 items-start gap-4">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Description</h2>
                                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                                    Acme Inc is a technology company that specializes in creating innovative solutions for the modern
                                    world. Our team of experts is dedicated to pushing the boundaries of what is possible, and we are
                                    committed to delivering high-quality products that make a difference. Whether you are looking for
                                    cutting-edge software, state-of-the-art hardware, or the latest in digital innovation, Acme Inc has
                                    you covered. We are passionate about using technology to solve real-world problems, and we believe
                                    that with the right tools, anything is possible. Let us help you reimagine the future and unlock the
                                    full potential of your business.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Contact</h2>
                                <div className="grid grid-cols-2 items-start gap-4">
                                    <div className="space-y-2">
                                        <div className="text-sm font-medium">Email</div>
                                        <div className="text-sm font-medium">Phone</div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="text-sm font-medium">contact@acmeinc.com</div>
                                        <div className="text-sm font-medium">+1 415-123-4567</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border rounded-lg p-4">
                            <form className="grid grid-cols-2 items-start gap-4">
                                <div className="space-y-2">
                                    <Label className="text-sm" htmlFor="name">
                                        Subject
                                    </Label>
                                    <Input id="subject" placeholder="Enter your message subject..." required />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm" htmlFor="message">
                                        Message
                                    </Label>
                                    <Textarea className="min-h-[200px]" id="message" placeholder="Enter your message..." required />
                                </div>
                                <div className="w-full grid justify-end items-end gap-2">
                                    <Button type="submit">Send Message</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}