import * as React from "react"
import { cn } from "../../lib/utils"

const buttonVariants = {
  default: "bg-green-600 text-white hover:bg-green-700",
  outline: "border border-green-600 bg-white hover:bg-green-50 text-green-600",
  ghost: "hover:bg-gray-100 text-gray-900",
  link: "text-green-600 underline-offset-4 hover:underline",
}

const buttonSizes = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 text-sm",
  lg: "h-11 px-8 text-lg",
  icon: "h-10 w-10",
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonVariants
  size?: keyof typeof buttonSizes
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClass = buttonVariants[variant]
    const sizeClass = buttonSizes[size]
    const baseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    return (
      <button
        className={cn(baseClass, variantClass, sizeClass, className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
