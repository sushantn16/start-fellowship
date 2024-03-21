import { PrismaClient } from '@prisma/client'
import { hashPassword, generateToken } from '../../../../auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { name, email, password, role } = data;
    const prisma = new PrismaClient()
    const hashedPassword: string = await hashPassword(password);

    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
        },
    });

    const token: string = generateToken(newUser);
    NextResponse.json({ token }, { status: 200 });
}
