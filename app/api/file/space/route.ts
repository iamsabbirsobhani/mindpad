import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PrismaClient } from '@prisma/client';
import prisma from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json({
        success: false,
        message: 'You must be authenticated to create a pad',
        status: 401,
      });
    }

    if (body && body.id) {
      const totalFileSizeQuery = await prisma.$queryRaw<
        [
          {
            total_file_size: number;
          },
        ]
      >`
  SELECT SUM("filesize") AS total_file_size
  FROM "files"
  WHERE "authorEmail" = ${body.email}
`;
      const totalBytesUsed = totalFileSizeQuery[0].total_file_size || 0;
      const totalMegabytesUsed = Number(totalBytesUsed) / 1000000;
      const totalKilobytesUsed = Number(totalBytesUsed) / 1000;

      await prisma.$disconnect();

      return NextResponse.json({
        success: true,
        space: totalMegabytesUsed,
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
