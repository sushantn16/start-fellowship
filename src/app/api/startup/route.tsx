import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';
import { getUser } from '@/lib/jwtTokenControl';
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    const data = await req.json();
    
    const { name, website, founder, description, city, country, stage } = data;
    const token = req.cookies.get('token')?.value || '';

    const user = await getUser(token);

    if (!user || !user.userId || typeof user.userId !== 'number') {
        return NextResponse.json(new Error('Invalid userId'), { status: 500 });
    }

    const startup = await prisma.startup.create({
        data: {
            name,
            website,
            founder,
            description,
            city,
            country,
            stage,
            users: {
                connect: { id: user.userId }
            }
        }
    });

    return NextResponse.json(startup, { status: 201 });
}

export async function GET() {
    const userStartups = await prisma.startup.findMany();
    return NextResponse.json(userStartups);
}
