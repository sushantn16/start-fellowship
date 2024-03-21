import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server';


export async function GET(req: NextRequest) {
    // Extract the startup ID from the request parameters
    const id = req.nextUrl.searchParams.get("id");
    const prisma = new PrismaClient();


    try {
        // Fetch the startup by its ID from the database
        const startup = await prisma.startup.findUnique({
            where: { id: Number(id) }, // Convert ID to a number
        });

        // Check if the startup exists
        if (!startup) {
            return NextResponse.json({ error: 'Startup not found' }, { status: 404 });
        }

        // Return the startup data
        return NextResponse.json(startup);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching startup:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}