import { getUser } from '@/lib/jwtTokenControl';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const token = req.cookies.get('token')?.value || '';

    const user = await getUser(token);

    if (!user || !user.userId || typeof user.userId !== 'number') {
        return NextResponse.json(new Error('Invalid userId'), { status: 500 });
    }
    const prisma = new PrismaClient();

    try {
        // Fetch the startups associated with the user from the database
        const startups = await prisma.startup.findMany({
            where: { users: { some: { id: Number(user.userId) } } }, // Find startups where the user ID matches
        });

        // Return the list of startups
        return NextResponse.json(startups);
    } catch (error) {
        // Handle any errors
        console.error('Error fetching startups:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
