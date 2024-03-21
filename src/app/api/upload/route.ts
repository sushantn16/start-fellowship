import mime from "mime";
import { randomUUID } from 'crypto'
import { join } from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client';
import { getUser } from "@/lib/jwtTokenControl";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const prisma = new PrismaClient();

    const file = formData.get("file") as Blob | null;
    const startupId = formData.get("startupId") as string;
    
    if (!file) {
        return NextResponse.json(
            { error: "File blob is required." },
            { status: 400 }
        );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const relativeUploadDir = "uploads";
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);

    const token = request.cookies.get('token')?.value || '';

    const user = await getUser(token);

    if (!user || !user.userId || typeof user.userId !== 'number') {
        return NextResponse.json(new Error('Invalid userId'), { status: 500 });
    }

    try {
        const uniqueSuffix = randomUUID();
        const filename = `${uniqueSuffix}.${mime.getExtension(file.type)}`;
        await writeFile(`${uploadDir}/${filename}`, buffer);
        const uploadedFile = await prisma.file.create({
            data: {
                name: filename,
                startup: {
                    connect: { id: parseInt(startupId) }
               },
                user: {
                    connect: { id: user.userId }
               },
            }
        });

        return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}` });
    } catch (e) {
        console.error("Error while trying to upload a file:", e);
        return NextResponse.json(
            { error: "Something went wrong." },
            { status: 500 }
        );
    }
}


export async function GET(req: NextRequest) {
    const prisma = new PrismaClient();
    const id = req.nextUrl.searchParams.get("id") ?? "";

    const messages = await prisma.file.findMany({
        where: {
            startupId: parseInt(id)
        }
    });
    return NextResponse.json(messages);
}