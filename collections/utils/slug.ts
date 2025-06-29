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

export function isSlugChanged(title: string, slug: string) {
  const originalTitleSlug = slug.slice(0, slug.lastIndexOf('-'));
  const newTitleSlug = slugify(title, { lower: true, strict: true, trim: true });

  return originalTitleSlug !== newTitleSlug;
}

export function validateSlug(slug: string) {
  if (!slug) {
    return true;
  }
  return slug.length >= 3 || 'This field must be at least 3 characters long.';
}

export function validateImageUrl(url: string) {
  if (!url) {
    return true;
  }
  try {
    const parsed = new URL(url);
    if (/\.(jpe?g|png|gif|webp|bmp)$/i.test(parsed.pathname)) {
      return true;
    } else {
      return 'Invalid image type. Accepted formats: .jpg, .jpeg, .gif, .webp, .bmp';
    }
  } catch (_) {
    return 'Invalid URL';
  }
}
