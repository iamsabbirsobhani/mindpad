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

    if (
      user &&
      user.email &&
      user.given_name &&
      user.picture &&
      body &&
      body.note &&
      body.color &&
      body.hover
    ) {
      const prisma = new PrismaClient();
      const pad = await prisma.pad.create({
        data: {
          authorEmail: user.email,
          authorName: user.given_name,
          authorProfilePhoto: user.picture,
          note: body.note,
          isImportant: false,
          padStyles: {
            create: {
              color: body.color,
              hover: body.hover,
            },
          },
        },
      });

      return NextResponse.json({
        success: true,
        pad,
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, status: 500 });
  }
}
