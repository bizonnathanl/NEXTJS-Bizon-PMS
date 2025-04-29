'use client'
import React from 'react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface PageHeaderProps {
  breadcrumbs: { label: string; href?: string }[];
  title: string;
  subtitle?: string;
}

export function PageHeader({ breadcrumbs, title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-16">
        <div className='flex items-center justify-between mb-12 gap-2'>
            <div className='flex gap-sm items-center w-1/2'>
                <img src="/icons/SVG_Sidebar-left.svg" alt="Close sidebar" className='w-7 aspect-square text-dark'/>
                <hr className='w-7 bg-[#09002F] rotate-90 h-[2px]'/>
                <Breadcrumb aria-label="breadcrumb" className='breadcrumbs-links w-full'>
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
            </div>

            <form className="flex items-center gap-1 w-1/2 max-w-[400px]" onSubmit={e => e.preventDefault()}>
                <Input
                placeholder="Rechercher un client ou un collaborateur..."
                className="w-full flex-1 border-2 border-[#09002F] rounded-md py-2 text-[12px] h-[32px]"
                aria-label="Recherche"
                />
                <Button variant="outline" type="submit" className="w-[40px] p-0 aspect-square border-0 bg-transparent cursor-pointer">
                  <img
                      src="/icons/SVG_Search-square.svg"
                      alt="Lancer la recherche"
                      className="h-[36px] aspect-square"
                  />
                </Button>
            </form>
        </div>
      
      <h1 className="text-4xl font-bold font-anton">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500  font-os">{subtitle}</p>}
    </header>
    )
}
