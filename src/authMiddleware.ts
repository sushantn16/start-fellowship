// middleware/authMiddleware.ts
import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';

const APP_SECRET = 'appsecret321';

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

export default function authMiddleware(handler: (req: NextRequest, res: NextResponse) => void) {
  return async (req: NextRequest, res: NextResponse) => {
    const token = req.headers.authorization||'';
      
    const decodedToken = jwt.verify(token, APP_SECRET) as CustomJwtPayload;

    if (!decodedToken || decodedToken.role !== 'admin') {
        return NextResponse.json(
              { success: false, message: 'You need admin privileges to perform this action.' },
              { status: 401 }
            )
    }
    return NextResponse.next();
  };
};