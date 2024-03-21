import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const prisma = new PrismaClient()
    const message = await prisma.message.create({
        data: {
            content: data.content,
            startup: {
                 connect: { id: data.userId }
            }
        }
    });
    return NextResponse.json(message, { status: 201 });
}

export async function GET() {
    const prisma = new PrismaClient()
    const messages = await prisma.message.findMany()
    return NextResponse.json(messages);
}
