'use client'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table";
import Sidebar from "@/components/sidebar";
import DashboardHeader from "@/components/dashboardHeader";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { getUser } from "@/services/auth.service";
import UserView from "@/components/userView";
import { getStartup } from "@/services/startup.service";

interface Startup {
    id: number;
    name: string;
    website: string;
    founder: string;
    description: string;
    city: string;
    country: string;
    stage: string;
}

export default function Dashboard({ params }: { params: { id: number } }) {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [startups, setStartups] = useState<Startup[]>([]);
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
        const fetchStartupData = async () => {
            try {
                const startupData = await getStartup();
                setStartups(startupData);
            } catch (error) {
                console.error('Error fetching startup data:', error);
            }
        };

        fetchUser();
        fetchStartupData();
    }, []);

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
                                {startups.map((startup) => (
                                    <TableRow key={startup.id} onClick={() => handleRowClick(startup.id)} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                                        <TableCell>{startup.id}</TableCell>
                                        <TableCell className="font-medium">{startup.name}</TableCell>
                                        <TableCell className="hidden md:table-cell">{startup.country}</TableCell>
                                        <TableCell className="hidden md:table-cell">{startup.stage}</TableCell>
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
