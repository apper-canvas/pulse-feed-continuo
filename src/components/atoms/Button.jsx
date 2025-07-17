import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  disabled = false,
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "gradient-button text-white shadow-lg",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white",
    ghost: "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;