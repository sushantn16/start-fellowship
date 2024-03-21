'use client'
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button";
import { Calendar, ChevronUp, Package2, PackageIcon } from "lucide-react";

export default function Sidebar() {
    const pathname = usePathname()
    return (
        <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-6">
                    <Link className="flex items-center gap-2 font-semibold" href="#">
                        <ChevronUp className="w-6 h-6" />
                        <span className="">Start FELLOWSHIP</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                    <nav className="grid items-start px-4 text-sm font-medium">
                        <Link
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/dashboard" ? "text-gray-900 dark:text-gray-50" : ""}`}
                            href="/dashboard"
                        >
                            <PackageIcon className="h-4 w-4" />
                            Startups
                        </Link>
                        <Link
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/events" ? "text-gray-900 dark:text-gray-50" : ""}`}
                            href="/events"
                        >
                            <Calendar className="h-4 w-4" />
                            Events
                        </Link>
                        <Link
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 ${pathname === "/events" ? "text-gray-900 dark:text-gray-50" : ""}`}
                            href="/investors"
                        >
                            <Package2 className="h-4 w-4" />
                            Investors
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
}
