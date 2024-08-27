import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-stone-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-stone-300",
  {
    variants: {
      variant: {
        default:
          "font-poppins border border-primary bg-primary text-primary-foreground shadow hover:bg-transparent hover:text-foreground hover:border",
        destructive:
          "font-poppins bg-red-500 text-stone-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-stone-50 dark:hover:bg-red-900/90",
        outline:
          "font-poppins border border-accent text-accent-foreground bg-transparent shadow hover:bg-gradient-to-tr hover:from-primary hover:to-accent hover:text-primary-foreground hover:border-background duration-0",
        secondary:
          "font-poppins border border-secondary bg-secondary text-secondary-foreground shadow hover:bg-transparent hover:text-foreground hover:border",
        ghost: "font-poppins hover:bg-primary hover:text-primary-foreground ",
        link: "text-stone-900 underline-offset-4 hover:underline dark:text-stone-50",
        rainbow:
          "font-poppins bg-gradient-to-bl from-primary to-accent text-primary-foreground hover:bg-gradient-to-br",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
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
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
