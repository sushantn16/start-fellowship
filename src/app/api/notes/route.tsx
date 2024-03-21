import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const prisma = new PrismaClient()
    const note = await prisma.note.create({
        data: {
            content: data.content,
            startup: {
                 connect: { id: data.userId }
            }
        }
    });
    return NextResponse.json(note, { status: 201 });
}

export async function GET() {
    const prisma = new PrismaClient()
    const notes = await prisma.note.findMany()
    return NextResponse.json(notes);
}
