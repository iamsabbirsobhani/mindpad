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
      const pad = await prisma.pad.findMany({
        where: {
          authorEmail: user.email,
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          padStyles: true,
        },
      });

      await prisma.$disconnect();

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
