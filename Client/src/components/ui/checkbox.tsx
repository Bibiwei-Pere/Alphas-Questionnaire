"use client";
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-5 sm:h-6 w-5 sm:w-6 shrink-0 rounded-sm border border-gray-400 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-brown-700 data-[state=checked]:bg-brown-700 data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
      <Check className='h-5 sm:h-6 w-5 sm:w-6' />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

const CircleCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "relative p-2 h-5 sm:h-6 w-5 sm:w-6 border border-gray-400 flex items-center justify-center rounded-full",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn(
        "absolute p-[5px] flex items-center rounded-full justify-center text-current data-[state=checked]:border-brown-700 data-[state=checked]:bg-brown-700 data-[state=checked]:text-primary-foreground"
      )}
    ></CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
CircleCheckbox.displayName = "CircleCheckbox";

export { Checkbox, CircleCheckbox };
