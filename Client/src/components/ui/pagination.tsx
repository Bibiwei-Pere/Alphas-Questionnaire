import * as React from "react";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({ className, isActive, size = "icon", ...props }: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "secondary" : "secondary",
        size,
      }),
      className
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label='Go to previous page' size='sm' className='max-w-[90px]' {...props}>
    Previous
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label='Go to next page' size='sm' className='max-w-[70px]' {...props}>
    Next
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    <MoreHorizontal className='h-4 w-4' />
    <span className='sr-only'>More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

const PaginationContainer = ({ table }: any) => {
  if (table.getPageCount() > 0)
    return (
      <div className='flex justify-between items-center w-full border-t pt-3'>
        <p>
          Showing {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </p>
        <div className='flex gap-2'>
          <PaginationPrevious onClick={() => table.previousPage()} isActive={table.getCanPreviousPage()} />
          <PaginationNext
            onClick={() => table.getCanNextPage() && table.nextPage()}
            isActive={table.getCanNextPage()}
          />
        </div>
      </div>
    );
  else return null;
};

export { PaginationEllipsis, PaginationLink, PaginationNext, PaginationPrevious, PaginationContainer };
