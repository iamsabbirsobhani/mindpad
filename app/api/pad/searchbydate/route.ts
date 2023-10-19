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

    if (user && user.email && body && body.date) {
      const pads = await prisma.pad.findMany({
        where: {
          authorEmail: user.email,
          AND: [
            {
              createdAt: {
                gte: body.date,
              },
            },
            {
              createdAt: {
                lte: new Date(new Date(body.date).getTime() + 86400000),
              },
            },
          ],
        },
        include: {
          padStyles: true,
        },
      });

      await prisma.$disconnect();

      return NextResponse.json({
        success: true,
        pads,
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
