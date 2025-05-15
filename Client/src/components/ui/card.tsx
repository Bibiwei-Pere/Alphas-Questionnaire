import * as React from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/app/components/animations/Text";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
);
CardFooter.displayName = "CardFooter";

interface CardWalletProp {
  title: string;
  header: string;
}

const CardWallet = ({ title, header }: CardWalletProp) => {
  return (
    <div className='cardWallet relative flex flex-col p-[12px] gap-[10px] rounded-[8px] border border-gray-200'>
      <h4>{title}</h4>
      <h2>{header}</h2>
    </div>
  );
};

const LandingTitle = ({ text, title, header }: any) => {
  return (
    <div className='flex mx-auto flex-col justify-between items-center gap-[10px]'>
      {text && <p className='text-[12px] md:text-[14px] text-gray-700'>{text}</p>}
      <h2 className='text-center'>{title}</h2>
      <Reveal>
        <p className='max-w-[522px] text-center'>{header}</p>
      </Reveal>
    </div>
  );
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, CardWallet, LandingTitle };
