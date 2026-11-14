import type { ReactElement } from "react";

export interface ButtonProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  disabled?: boolean;
}

const sizeStyles = {
  sm: "h-8 px-3 text-xs",
  md: "h-9 px-4 text-sm",
  lg: "h-11 px-6 text-base",
};

const variantStyles = {
  primary:
    "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white border-transparent shadow-sm",
  secondary:
    "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 active:bg-gray-300 dark:active:bg-gray-600 border-gray-200 dark:border-gray-700 shadow-sm",
  danger:
    "bg-red-50 text-red-600 hover:bg-red-100 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 dark:border-red-800 shadow-sm",
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
        rounded-lg border
        font-medium
        transition-all duration-150
        hover:scale-[1.02] active:scale-[0.98]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${disabled ? "opacity-50 cursor-not-allowed hover:scale-100" : "cursor-pointer"}
      `}
    >
      {startIcon ? <div className="flex items-center">{startIcon}</div> : null}
      <span>{text}</span>
      {endIcon ? <div className="flex items-center">{endIcon}</div> : null}
    </button>
  );
}
