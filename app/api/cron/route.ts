import { NextResponse } from 'next/server';
import { getPayload } from 'payload';

import config from '@payload-config';

export async function GET(req: Request) {
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    await payload.count({
      collection: 'users',
    });

    console.log('CRON: Database is up.');

    return NextResponse.json({ success: true });
  } catch (_err) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
