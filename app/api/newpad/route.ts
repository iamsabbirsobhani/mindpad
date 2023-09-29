import { NextResponse } from 'next/server';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/app/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
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

    const pad = await prisma.pad.create({
      data: {
        authorEmail: user.email || '',
        authorName: user.given_name || '',
        authorProfilePhoto: user.picture || '',
        note: body.note || '',
      },
    });

    const padStyle = await prisma.padStyle.create({
      data: {
        color: body.color,
        hover: body.hover,
        padId: pad.id,
      },
    });

    return NextResponse.json({
      success: true,
      pad,
      padStyle,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error, status: 500 });
  }
}
