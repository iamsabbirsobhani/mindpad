import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';

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
    console.log(user);
    if (user && user.email && user.id) {
      const pad = await prisma.files.findMany({
        where: {
          authorEmail: user.email,
        },
        orderBy: {
          createdAt: 'desc',
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
