import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "flex w-full items-center mx-auto justify-center whitespace-nowrap text-sm sm:text-[17px] font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent text-brown-700 w-fit border border-brown-700 hover:bg-brown-700 hover:text-white",
        secondary: "bg-white text-black shadow-gray-400 hover:shadow-blue-700 hover:text-blue-700",
        outline:
          "bg-brown-700 max-w-[300px] w-full text-white border border-brown-700 hover:bg-white hover:text-brown-700",
        destructive: "bg-destructive text-destructive-foreground hover:bg-red-600",
        combobox:
          "bg-white justify-between font-normal text-black border border-gray-200 rounded-xl shadow-sm shadow-gray-300 hover:border-black w-full max-w-full",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4 sm:px-10 py-2",
        sm: "h-11 rounded-xl px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn("bg-[#0017A0]", buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
