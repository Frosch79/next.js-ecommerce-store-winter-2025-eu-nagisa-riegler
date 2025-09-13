import { NextResponse } from 'next/server';
import { userSchema } from '../../migrations/00000-createTableUsers';

export type RootResponseBodyGet =
  | {
      users: string;
    }
  | { error: string };

export function GET(): NextResponse<RootResponseBodyGet> {
  return NextResponse.json({ users: '/api/users' });
}

export async function POST(
  request: Request,
): Promise<NextResponse<RootResponseBodyGet>> {
  const body = await request.json();

  const result = userSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'You need to send an object with user property.',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ users: '/api/users' });
}
