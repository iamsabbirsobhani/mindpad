import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import prisma from '@/app/api/lib/prisma';

export async function GET(request: Request) {
  try {
    const idRegex = /\/(\d+)\/([\w.-]+@[\w.-]+)/;
    const match = request.url.match(idRegex);

    if (match) {
      const id = match[1];
      const email = match[2];

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
    } else {
      return NextResponse.json({
        success: false,
        message: 'You must be authenticated to get your pads',
        status: 401,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, status: 500 });
  }
}
