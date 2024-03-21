import { PrismaClient } from '@prisma/client'
import { validatePassword, generateToken } from '../../../../auth';
import { serialize } from 'cookie';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const data = await req.json();
    const { email, password } = data;
    const prisma = new PrismaClient()

    const user = await prisma.user.findUnique({ where: { email: email } });
    if (!user) {
        NextResponse.json({ error: 'Invalid login.' });
        return;
    }

    if (user.password) {
        const passwordValid: boolean = await validatePassword(password, user.password);

        if (!passwordValid) {
            NextResponse.json({ error: 'Invalid login.' });
            return;
        }
    }

    const token: string = generateToken(user);

    let response = NextResponse.json({ status: 'success' }, { status: 200 })
    response.cookies.set('token', token);

    return response;
}
