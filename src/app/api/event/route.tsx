import { getUser } from '@/lib/jwtTokenControl';
import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();
    const event = await prisma.event.create({
        data: {
            title: data.title,
            description: data.description,
            location: data.location,
            date: data.date
        }
    });
    return NextResponse.json(event, { status: 200 });

}

export async function GET() {
    const events = await prisma.event.findMany();
    return NextResponse.json(events);
}

export async function PATCH(req: NextRequest) {
    const { eventId } = await req.json();
    let token = req.cookies.get('token')?.value || '';

    const user = await getUser(token);

    if (!user || !user.userId || typeof user.userId !== 'number') {
        return NextResponse.json(new Error('Invalid userId'), { status: 500 });
    }
    const event = await prisma.event.update({
        where: { id: eventId },
        data: {
            users: {
                connect: { id: user.userId }
            }
        }
    });
    return NextResponse.json(event, { status: 200 });
}
