'use client';

import { BreadcrumbItem, Breadcrumbs } from '@heroui/react';
import { usePathname } from 'next/navigation';

export default function Breadrumb() {
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  return (
    <div className="pb-4">
      <Breadcrumbs>
        {pathNames.map((link, index) => (
          <BreadcrumbItem href={`/${pathNames.slice(0, index + 1).join('/')}`}>
            {link
              .split('-')
              .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
              .join(' ')}
          </BreadcrumbItem>
        ))}
      </Breadcrumbs>
    </div>
  );
}
