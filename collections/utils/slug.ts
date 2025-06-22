import crypto from 'crypto';

import slugify from 'slugify';

export function generateSlug(title: string) {
  return (
    slugify(title as string, {
      lower: true,
      strict: true,
      trim: true,
    })
    + '-'
    + crypto.randomBytes(4).toString('hex')
  );
}

export function validateSlug(slug: string) {
  if (!slug) {
    return true;
  }
  return slug.length >= 3 || 'This field must be at least 3 characters long.';
}
