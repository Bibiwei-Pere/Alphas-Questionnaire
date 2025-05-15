import { cn } from "@/lib/utils";
import React from "react";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded-md bg-gray-200", className)} {...props} />;
}

function SkeletonDemo() {
  return (
    <div className='grid max-w-[250px] grid-cols-[50px,1fr] items-center p-4'>
      <Skeleton className='h-12 w-12 rounded-full' />
      <div className='space-y-2'>
        <Skeleton className='h-4' />
        <Skeleton className='h-4' />
      </div>
    </div>
  );
}
function SkeletonSidebar() {
  return (
    <div className='flex w-[240px] px-4 pb-20 pt-4 flex-col gap-4 relative'>
      {[...Array(12)].map((_, idx: number) => (
        <Skeleton key={idx} className='h-8 w-full rounded' />
      ))}
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className='w-full mt-4'>
      {/* Table Header Skeleton */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 px-4 py-2'>
        <Skeleton className='h-8 w-full rounded' />
        <Skeleton className='h-8 w-full rounded' />
        <Skeleton className='h-8 w-full rounded' />
        <Skeleton className='h-8 w-full rounded' />
      </div>

      {/* Table Rows Skeleton */}
      <div className='space-y-4'>
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className='grid grid-cols-2 sm:grid-cols-4 gap-3 px-4 py-2'>
            <Skeleton className='h-8 w-full rounded' />
            <Skeleton className='h-8 w-full rounded' />
            <Skeleton className='h-8 w-full rounded' />
            <Skeleton className='h-8 w-full rounded' />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonTable;

function SkeletonCard1() {
  return (
    <div className='grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-wrap px-4 gap-5 overflow-hidden mt-4'>
      {[...Array(10)].map((_, idx) => (
        <div key={idx} className='flex flex-col space-y-3'>
          <Skeleton className='h-[165px] w-full rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonCard2() {
  return (
    <div className='grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 flex-wrap px-4 gap-5 overflow-hidden mt-24'>
      {[...Array(10)].map((_, idx) => (
        <div key={idx} className='flex flex-col space-y-3'>
          <Skeleton className='h-[165px] w-full rounded-xl' />
          <div className='space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-[200px]' />
          </div>
        </div>
      ))}
    </div>
  );
}

export { Skeleton, SkeletonCard1, SkeletonSidebar, SkeletonCard2, SkeletonDemo };
