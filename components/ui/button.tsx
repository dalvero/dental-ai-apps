import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                primary: "bg-primary text-white hover:bg-primary-dark",
                secondary: "bg-secondary text-white",
                outline:
                "border border-primary text-primary bg-white hover:bg-primary/5",
                ghost: "bg-transparent hover:bg-gray-100",
                gradient:
                "bg-gradient-to-r from-primary to-secondary text-white",
            },

            size: {
                sm: "h-9 px-4 text-sm",
                md: "h-11 px-6 text-base",
                lg: "h-14 px-8 text-lg",
            },

            rounded: {
                sm: "rounded-md",
                md: "rounded-xl",
                lg: "rounded-2xl",
                full: "rounded-full",
            },

            width: {
                auto: "w-auto",
                full: "w-full",
            },

            shadow: {
                none: "",
                md: "shadow-md",
                lg: "shadow-lg",
                primary:
                "shadow-[0_10px_25px_-8px_rgba(16,185,129,0.6)]",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
            rounded: "full",
            width: "auto",
            shadow: "none",
        },
    }
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({
    className,
    variant,
    size,
    rounded,
    width,
    shadow,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(
                buttonVariants({
                variant,
                size,
                rounded,
                width,
                shadow,
                }),
                className
            )}
            {...props}
        />
    );
}