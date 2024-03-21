import { PrismaClient } from '@prisma/client'
import { validatePassword, generateToken } from '../../../../auth';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { email, password } = data;
    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({ where: { email: email } });
    console.log(user)
    if (!user) {
        NextResponse.json({ error: 'Invalid login.' });
        return;
    }

    const passwordValid: boolean = await validatePassword(password, user.password);
    if (!passwordValid) {
        NextResponse.json({ error: 'Invalid login.' });
        return;
    }

    const token: string = generateToken(user);
    return NextResponse.json({token});
}
