import type { ReactElement } from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  disabled?: boolean;
}

const sizeStyles = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const variantStyles = {
  primary:
    "bg-blue-600 text-white hover:bg-blue-700 border-blue-600",
  secondary:
    "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200",
};

export default function Button({
  variant = "primary",
  size = "md",
  text,
  startIcon,
  endIcon,
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-lg border shadow
        transition-all duration-300
        hover:scale-105 hover:rounded-2xl
        active:scale-95
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : "cursor-pointer"}
      `}
    >
        {startIcon ? <div>{startIcon}</div> : null} {text} {endIcon ? <div>{endIcon}</div> : null}
      
    </button>
  );
}