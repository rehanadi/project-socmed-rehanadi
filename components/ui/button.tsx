import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  'flex justify-center items-center shrink-0 disabled:pointer-events-none disabled:opacity-50 cursor-pointer outline-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary-300 font-bold text-sm md:text-md rounded-full hover:bg-primary-200 transition-colors',
        outline:
          'bg-transparent font-bold text-sm md:text-md border border-neutral-900 rounded-full hover:bg-neutral-900 transition-colors',
        secondary:
          'bg-neutral-900 font-medium text-sm md:text-md rounded-lg hover:bg-neutral-950 transition-colors',
        danger:
          'bg-neutral-900 font-medium text-accent-red text-sm md:text-md rounded-lg hover:bg-neutral-950 transition-colors',
      },
      size: {
        default: 'h-10 md:h-11 px-2',
        icon: 'size-10 md:size-12',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
