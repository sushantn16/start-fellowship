import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const prisma = new PrismaClient()
    const milestone = await prisma.milestone.create({
        data: {
            title: data.title,
            description: data.description,
            startup: {
                 connect: { id: parseInt(data.startupId) }
            }
        }
    });
    return NextResponse.json(milestone, { status: 201 });
}

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    const id = req.nextUrl.searchParams.get("id") ?? "";
    const milestone = await prisma.milestone.findMany({
        where: {
            startupId: parseInt(id)
        }
    });
    return NextResponse.json(milestone);
}

