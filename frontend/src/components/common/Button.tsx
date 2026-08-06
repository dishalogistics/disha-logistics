import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/helpers";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "danger";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    fullWidth?: boolean;
}

export function Button({
    children,
    variant = "primary",
    size = "md",
    isLoading,
    fullWidth,
    className,
    ...props
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed";
    const variants = {
        primary:
            "bg-brand-blue text-white hover:bg-brand-blueHover focus:ring-brand-blue",
        secondary:
            "bg-brand-navy text-white hover:bg-brand-navyLight focus:ring-brand-navy",
        outline:
            "border-2 border-gray-300 text-brand-navy hover:border-brand-blue hover:text-brand-blue",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };
    const sizes = {
        sm: "px-4 py-1.5 text-sm",
        md: "px-6 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
    };
    return (
        <button
            className={cn(
                base,
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className,
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
}
