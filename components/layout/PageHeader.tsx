import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

interface PageHeaderProps {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
}

export function PageHeader({ breadcrumbs, title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-6">
      <Breadcrumb aria-label="breadcrumb">
        <BreadcrumbList>
          {breadcrumbs.map((bc, idx) => (
            <React.Fragment key={idx}>
              <BreadcrumbItem>
                {bc.href ? (
                  <BreadcrumbLink href={bc.href}>{bc.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{bc.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {idx < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
    </header>
    )
}
