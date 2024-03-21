import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();
    const task = await prisma.task.create({
        data: {
            name: data.name,
            startup: {
                connect: { id: data.userId }
            }
        }
    });
    return NextResponse.json(task, { status: 201 });

}

export async function GET() {
    const tasks = await prisma.task.findMany();
    return NextResponse.json(tasks);
}

export async function PATCH(req: NextRequest) {
    const { taskId, done } = await req.json();
    const task = await prisma.task.update({
        where: { id: taskId },
        data: { done }
    });
    return NextResponse.json(task);

}
