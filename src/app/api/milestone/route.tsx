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
                 connect: { id: data.userId }
            }
        }
    });
    return NextResponse.json(milestone, { status: 201 });
}

export async function GET() {
    const prisma = new PrismaClient()
    const milestones = await prisma.milestone.findMany()
    return NextResponse.json(milestones);
}
