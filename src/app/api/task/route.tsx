import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';
import { getUser } from '@/lib/jwtTokenControl';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();

    const task = await prisma.task.create({
        data: {
            name: data.name,
            startup: {
                connect: { id: parseInt(data.startupId) }
            }
        }
    });
    return NextResponse.json(task, { status: 201 });

}

export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    const id = req.nextUrl.searchParams.get("id") ?? "";
    const task = await prisma.task.findMany({
        where: {
            startupId: parseInt(id)
        }
    });
    return NextResponse.json(task);
}


export async function PATCH(req: NextRequest) {
    const { taskId, done } = await req.json();
    const task = await prisma.task.update({
        where: { id: taskId },
        data: { done }
    });
    return NextResponse.json(task);

}
