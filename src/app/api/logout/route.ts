import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    let response = NextResponse.json({ status: 'success' }, { status: 200 })
    response.cookies.set('token', '');

    return response;
}
