import { redirectToPreviewURL } from '@prismicio/next';
import { NextRequest } from 'next/server';

import { draftMode } from 'next/headers';
import { createClient } from '../../../prismicio';

export async function GET(request: NextRequest) {
  const client = createClient();

  // draftMode().enable();

  return await redirectToPreviewURL({ client, request });
}
