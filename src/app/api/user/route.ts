import { NextRequest, NextResponse } from 'next/server';
import { getUser } from '@/lib/jwtTokenControl';

export async function POST(req: NextRequest) {
    let token = req.cookies.get('token')?.value || '';

    const user = getUser(token);

    if(user){
        return NextResponse.json({ user: user, status: true }, { status: 200 })
    }

    return NextResponse.json({ status: false }, { status: 403 })
}
