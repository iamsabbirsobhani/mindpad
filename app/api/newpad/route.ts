import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';

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
      body &&
      body.note &&
      body.color &&
      body.hover
    ) {
      const pad = await prisma.pad.create({
        data: {
          authorEmail: user.email,
          authorName: user.given_name,
          authorProfilePhoto: user.picture || '',
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
