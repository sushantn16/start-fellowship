'use client'

import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboardHeader";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { getUser } from "@/services/auth.service";
import UserView from "@/components/userView";

export default function Dashboard({ params }: { params: { id: number } }) {
    const [userRole, setUserRole] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const resp = await getUser();
                setUserRole(resp.user.role);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUser();
    }, []);

    const sampleData = [
        { id: 1, startup: "Acme Inc", location: "San Francisco, CA", stage: "Series A" },
        { id: 2, startup: "Bolt", location: "New York, NY", stage: "Seed" },
        { id: 3, startup: "Crisp", location: "London, United Kingdom", stage: "Pre-Seed" },
        { id: 4, startup: "Dusk", location: "Berlin, Germany", stage: "Series B" },
        { id: 5, startup: "Ember", location: "Oslo, Norway", stage: "Seed" },
    ];

    const handleRowClick = (id: number) => {
        router.push(`/dashboard/${id}`);
    };

    return (
        <div className="grid lg:grid-cols-[250px_1fr] min-h-screen w-full lg:min-h-0">
            <Sidebar />
            <div className="flex flex-col">
                <DashboardHeader search={false}/>
                <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                    <div>
                        {userRole === 'USER' && <UserView />}
                    </div>
                    <div className="border shadow-sm rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">ID</TableHead>
                                    <TableHead>Startup</TableHead>
                                    <TableHead className="hidden md:table-cell">Location</TableHead>
                                    <TableHead className="hidden md:table-cell">Stage</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {sampleData.map((data) => (
                                    <TableRow key={data.id} onClick={() => handleRowClick(data.id)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <TableCell>{data.id}</TableCell>
                                        <TableCell className="font-medium">{data.startup}</TableCell>
                                        <TableCell className="hidden md:table-cell">{data.location}</TableCell>
                                        <TableCell className="hidden md:table-cell">{data.stage}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </main>
            </div>
        </div>
    );
}
