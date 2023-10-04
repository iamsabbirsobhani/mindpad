import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PrismaClient } from '@prisma/client';
import prisma from '@/app/api/lib/prisma';

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

    if (body && body.email) {
      const totalDataUsageQuery = await prisma.$queryRaw<
        [
          {
            total_bytes_used: any;
          },
        ]
      >`
      SELECT SUM(LENGTH("note")) AS total_bytes_used
      FROM "Pad"
      WHERE "authorEmail" = ${body.email}
    `;

      await prisma.$disconnect();
      console.log({ totalDataUsageQuery });
      const totalBytesUsed = totalDataUsageQuery[0].total_bytes_used;
      const totalMegabytesUsed = Number(totalBytesUsed) / 1000000;
      const totalKilobytesUsed = Number(totalBytesUsed) / 1000;

      return NextResponse.json({
        success: true,
        space: totalKilobytesUsed,
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
