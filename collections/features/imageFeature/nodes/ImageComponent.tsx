'use client';

import type { NodeKey } from 'lexical';
import { JSX, Suspense, useRef } from 'react';

const imageCache = new Set();

function useSuspenseImage(src: string) {
  if (!imageCache.has(src)) {
    throw new Promise((resolve) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.add(src);
        resolve(null);
      };
    });
  }
}

function LazyImage({
  className,
  src,
  altText,
  width,
  height,
  imageRef,
}: {
  altText: string;
  className: string | null;
  height: 'inherit' | number;
  imageRef: { current: null | HTMLImageElement };
  src: string;
  width: 'inherit' | number;
}): JSX.Element {
  useSuspenseImage(src);
  return (
    <img
      className={className || undefined}
      src={src}
      alt={altText}
      ref={imageRef}
      style={{
        height,
        width,
        marginInline: 'auto',
        marginTop: '0',
        marginBottom: '0',
      }}
    />
  );
}

export default function ImageComponent({
  src,
  altText,
  width,
  height,
}: {
  src: string;
  altText: string;
  width: 'inherit' | number;
  height: 'inherit' | number;
  nodeKey: NodeKey;
}): JSX.Element {
  const imageRef = useRef<null | HTMLImageElement>(null);

  return (
    <Suspense fallback={null}>
      <LazyImage className="max-w-full" src={src} altText={altText} width={width} height={height} imageRef={imageRef} />
    </Suspense>
  );
}
