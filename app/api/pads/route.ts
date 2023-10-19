import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import prisma from '../lib/prisma';

export async function POST(request: Request) {
  try {
    const user = await request.json();

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'You must be authenticated to get your pads',
        status: 401,
      });
    }
    if (user && user.email) {
      const padQueryExecute = prisma.pad.findMany({
        where: {
          authorEmail: user.email,
        },
        skip: user.page * 20,
        take: 20,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          padStyles: true,
        },
      });

      const pad = await prisma.$transaction([
        prisma.pad.count({
          where: {
            authorEmail: user.email,
          },
        }),
        padQueryExecute,
      ]);

      await prisma.$disconnect();

      return NextResponse.json({
        success: true,
        pad: pad && pad.length > 0 && pad[1],
        page: pad && pad.length > 0 && Math.ceil(pad[0] / 20),
        status: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, status: 500 });
  }
}
