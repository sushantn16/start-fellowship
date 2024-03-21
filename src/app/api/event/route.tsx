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
    const { eventId, userId } = await req.json();
    const event = await prisma.event.update({
        where: { id: eventId },
        data: {
            users: {
                connect: { id: userId }
            }
        }
    });
    return NextResponse.json(event, { status: 200 });
}
