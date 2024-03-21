import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';
import { getUser } from '@/lib/jwtTokenControl';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const prisma = new PrismaClient()
    let token = req.cookies.get('token')?.value || '';
    const user = await getUser(token);
    if (!user || !user.userId || typeof user.userId !== 'number') {
        return NextResponse.json(new Error('Invalid userId'), { status: 500 });
    }

    const message = await prisma.message.create({
        data: {
            content: data.content,
            startup: {
                 connect: { id: parseInt(data.startupId) }
            },
            user: {
                connect: { id: user.userId }
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
