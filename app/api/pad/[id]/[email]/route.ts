import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import prisma from '@/app/api/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    console.log(searchParams);
    const id = searchParams.get('id');
    const email = searchParams.get('email');
    console.log(id, email);

    if (!id) {
      return NextResponse.json({
        success: false,
        message: 'You must be authenticated to get your pads',
        status: 401,
      });
    }
    if (id && email) {
      const pad = await prisma.pad.findUnique({
        where: {
          id: parseInt(id, 10),
          authorEmail: email,
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
