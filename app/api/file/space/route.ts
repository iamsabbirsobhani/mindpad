import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { PrismaClient } from '@prisma/client';

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
    console.log(body);

    if (body && body.id) {
      const prisma = new PrismaClient();

      const space = prisma.file.aggregate({
        _sum: {
          filesize: true,
        },
        where: {
          authorId: body.id,
        },
      });

      await prisma.$disconnect();
      console.log({ space });
      const totalBytesUsed = space;
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
