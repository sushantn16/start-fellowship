"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MapPinIcon, ArrowLeftIcon } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Messages from "@/components/messages"
import Tasks from "@/components/tasks"
import Notes from "@/components/notes"
import { useEffect, useState } from "react"
import { getUser } from "@/services/auth.service"
import Timeline from "@/components/timeline"
import Files from "@/components/files"
import DashboardHeader from "@/components/dashboardHeader"
import { getStartupById } from "@/services/startup.service"


export default function DashboardDetail({ params }: { params: { id: number } }) {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [startup, setStartup] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await getUser();
                setUserRole(resp.user.role);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        getStartup();

        fetchUser();
    }, []);

    const getStartup = async () => {
        const startup = await getStartupById(params.id);
        setStartup(startup);
    }


    return (
        <div className="grid lg:grid-cols-[250px_1fr] min-h-screen w-full lg:min-h-0">
            <Sidebar />
            <div className="flex flex-col">
                <DashboardHeader search={false} />
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
                    {startup &&
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 items-start gap-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{startup.title}</h1>
                                    <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                                        <MapPinIcon className="h-4 w-4" />
                                        {startup.city}, {startup.country}
                                    </div>
                                </div>
                                <div className="flex items-start flex-col gap-2 text-right">
                                    <div className="flex items-center gap-2">
                                        <div className="text-sm font-medium">{startup.stage}</div>
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
                                        {startup.description}
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
                                            <div className="text-sm font-medium">{startup.phone}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Timeline startupId={params.id} />
                            <div className="border rounded-lg p-4">
                                <Tabs defaultValue="messages" className="w-[400px]">
                                    <TabsList className="">
                                        <TabsTrigger value="messages">Messages</TabsTrigger>
                                        {userRole === 'ADMIN' && <TabsTrigger value="tasks">Tasks</TabsTrigger>}
                                        {userRole === 'ADMIN' && <TabsTrigger value="notes">Notes</TabsTrigger>}
                                        <TabsTrigger value="files">Files</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="messages"><Messages startupId={params.id} /></TabsContent>
                                    {userRole === 'ADMIN' &&
                                        <>
                                            <TabsContent value="tasks"><Tasks startupId={params.id} /></TabsContent>
                                            <TabsContent value="notes"><Notes startupId={params.id} /></TabsContent>
                                        </>
                                    }
                                    <TabsContent value="files"><Files startupId={params.id} /></TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}