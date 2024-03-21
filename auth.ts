import bcrypt from 'bcryptjs';
const jwt = require('jsonwebtoken');

const jwtConfig = {
  secret: new TextEncoder().encode(process.env.AUTH_SECRET),
}

function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

function validatePassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

function generateToken(user: any): string {
  return jwt.sign(
    { 
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role 
    }, 
    jwtConfig.secret,  
    { expiresIn: '30d' } 
  );
}

export { hashPassword, validatePassword, generateToken };