import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
const APP_SECRET: string = 'appsecret321';

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
      role: user.role 
    }, 
    APP_SECRET,  
    { expiresIn: '30d' } 
  );
}

export { APP_SECRET, hashPassword, validatePassword, generateToken };