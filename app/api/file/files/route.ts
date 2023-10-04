import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
      const prisma = new PrismaClient();
      const pad = await prisma.file.findMany({
        where: {
          authorId: user.id,
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
