import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex h-11 items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-primary/90",
        outline: "border border-border bg-background text-foreground hover:border-primary hover:text-primary",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
        accent: "bg-accent text-accent-foreground hover:-translate-y-0.5 hover:bg-accent/90",
        sponsor: "border border-sponsor/60 bg-sponsor/10 text-sponsor hover:-translate-y-0.5 hover:bg-sponsor/20",
      },
      size: {
        default: "h-11 px-5",
        icon: "size-10 px-0",
        sm: "h-9 px-4 text-xs",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />;
  },
);

export { Button, buttonVariants };