import * as jose from 'jose'
import { NextRequest } from 'next/server'

const jwtConfig = {
    secret: new TextEncoder().encode(process.env.AUTH_SECRET),
}

const getUser = async (token: string) => {

    if (token) {
        const decoded = await jose.jwtVerify(token, jwtConfig.secret)

        if (decoded.payload?.userId) {
            return decoded;
        }
    }
    return false;
}

const isAuthenticated = async (req: NextRequest) => {
    let token = req.cookies.get('token')

    if (token) {
        try {
            const decoded = await jose.jwtVerify(token.value, jwtConfig.secret)

            if (decoded.payload?.userId) {
                return true
            }
        } catch (err) {
            console.error('jwt error: ', err)

            return false
        }
    }
    return false;
}

export { getUser, isAuthenticated };