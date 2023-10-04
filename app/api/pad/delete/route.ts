import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';

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

    if (user && user.email && body && body.id) {
      const padStyles = prisma.padStyle.delete({
        where: {
          id: body.padStyleId,
          padId: body.id,
        },
      });

      const pad = prisma.pad.delete({
        where: {
          authorEmail: user.email,
          id: body.id,
        },
      });

      const transaction = await prisma.$transaction([padStyles, pad]);

      await prisma.$disconnect();

      return NextResponse.json({
        success: true,
        pad: transaction,
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
