"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  className2?: string;
  description?: any;
  children2?: any;
}

const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-cover bg-no-repeat flex flex-col gap-16 md:pt-10 lg:pt-24 pb-24 lg:px-8 xl:px-24 px-4 max-w-xl mx-auto",
        className
      )}
      {...props}
    />
  )
);
Container.displayName = "Container";

const ContainerAuth = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-cover min-h-screen bg-testimonial_bg bg-no-repeat flex items-center justify-center py-20 lg:py-24 px-4 lg:px-8 xl:px-24 max-w-screen-2xl mx-auto",
        className
      )}
      {...props}
    />
  )
);
ContainerAuth.displayName = "ContainerAuth";

const ContainerDashboard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-4 md:p-8 grid md:grid-cols-[450px,1fr] gap-10 max-w-screen-2xl mx-auto", className)}
      {...props}
    >
      <div className='hidden md:block md:fixed top-0 right-0 left-0 z-50 bg-white md:h-8'></div>
      {children}
    </div>
  )
);
ContainerDashboard.displayName = "ContainerDashboard";

const DashboardWrapper = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, className2, title, children, description, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-5 relative overflow-hidden rounded-xl sm:border sm:px-4 dark:border-white dark:bg-white sm:bg-dashboard py-6",
        className
      )}
      {...props}
    >
      {title && (
        <div className={`flex justify-between gap-6 w-full`}>
          <div className='flex flex-col gap-4'>
            <div className='flex gap-[6px] items-center'>
              <h4 className={`w-full "text-foreground-opp "}`}>{title}</h4>
            </div>
            {description && <span>{description}</span>}
          </div>
        </div>
      )}
      <div className={`${className2}`}>{children && children}</div>
    </div>
  )
);
DashboardWrapper.displayName = "DashboardWrapper";

const DashboardHeader = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ title, children2, className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "py-2 shadow-sm flex justify-between gap-6 items-center sticky z-20 bg-white top-0 md:top-4",
        className
      )}
      {...props}
    >
      {title && (
        <div className='space-y-2'>
          <h2 className='font-bold my-0 md:block text-black'>{title}</h2>
          <div>{children2 && children2}</div>
        </div>
      )}
      {children && children}
    </div>
  )
);
DashboardHeader.displayName = "DashboardHeader";

const NavigateBack = ({ children }: { children: React.ReactNode }) => {
  const navigation = useRouter();
  return (
    <div onClick={() => navigation.back()} className={cn("cursor-pointer flex items-center gap-3")}>
      {children}
    </div>
  );
};

NavigateBack.displayName = "NavigateBack";

export { Container, ContainerAuth, ContainerDashboard, DashboardHeader, NavigateBack, DashboardWrapper };
