import React from "react";
import { cn } from "@/utils/cn";

const Label = React.forwardRef(({ 
  className, 
  required = false,
  children,
  ...props 
}, ref) => {
  return (
    <label
      className={cn(
        "text-sm font-medium text-gray-700 mb-1.5 block",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
});

Label.displayName = "Label";

export default Label;