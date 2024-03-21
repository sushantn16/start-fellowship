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

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    const id = req.nextUrl.searchParams.get("id") ?? "";
    const note = await prisma.note.findMany({
        where: {
            startupId: parseInt(id)
        }
    });
    return NextResponse.json(note);
}
