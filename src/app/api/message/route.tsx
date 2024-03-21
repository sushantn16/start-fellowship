import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const prisma = new PrismaClient()
    const message = await prisma.message.create({
        data: {
            content: data.content,
            startup: {
                 connect: { id: parseInt(data.startupId) }
            }
        }
    });
    return NextResponse.json(message, { status: 201 });
}

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    const id = req.nextUrl.searchParams.get("id") ?? "";
    const messages = await prisma.message.findMany({
        where: {
            startupId: parseInt(id)
        }
    });
    return NextResponse.json(messages);
}
