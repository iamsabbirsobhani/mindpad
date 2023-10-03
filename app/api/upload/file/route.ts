import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PrismaClient } from '@prisma/client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { getUser, isAuthenticated } = getKindeServerSession();
    const user = await getUser();
    const authenticated = await isAuthenticated();

    if (!authenticated) {
      return NextResponse.json({
        success: false,
        message: 'You must be authenticated to create a pad',
        status: 401,
      });
    }

    console.log(body);

    if (
      user &&
      user.email &&
      user.id &&
      user.given_name &&
      body &&
      body.fileName &&
      body.url &&
      body.filesize &&
      body.fileType
    ) {
      const prisma = new PrismaClient();
      const pad = await prisma.file.create({
        data: {
          authorId: user.id,
          authorEmail: user.email,
          authorName: user.given_name,
          fileName: body.fileName,
          url: body.url,
          filesize: body.filesize,
          fileType: body.fileType,
        },
      });

      await prisma.$disconnect();

      return NextResponse.json({
        success: true,
        pad,
        status: 200,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'You must provide all required fields',
        status: 400,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, status: 500 });
  }
}
