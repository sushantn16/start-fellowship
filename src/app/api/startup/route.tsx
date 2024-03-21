import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server';
const prisma = new PrismaClient()

export async function POST(req: NextRequest) {
    const data = await req.json();
    
    const { name, website, founder, description, city, country, stage, userId } = data;
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
                connect: { id: userId }
            }
        }
    });
    return NextResponse.json(startup, { status: 201 });
}

export async function GET(req: NextRequest & { query: { userId: number } }) {
    const { userId } = req.query;
    const userStartups = await prisma.startup.findMany({
        where: {
            users: {
                some: {
                    id: userId
                }
            }
        }
    });
    return NextResponse.json(userStartups);
}
