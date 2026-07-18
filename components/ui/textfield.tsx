"use client";

import {
  forwardRef,
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { Eye, EyeOff } from "lucide-react";

export interface TextFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  // Teks label di atas input
  label?: string;
  // id untuk input & htmlFor label. Jika tidak diisi, akan digenerate otomatis
  id?: string;
  // Elemen opsional di kanan label, misal link "Forgot Password?"
  labelAction?: ReactNode;
  // Pesan error, membuat border jadi merah dan menampilkan teks di bawah input
  error?: string;
  // Teks bantuan di bawah input (tidak tampil kalau ada error)
  helperText?: string;
  // Class tambahan untuk wrapper paling luar
  containerClassName?: string;
  // Ikon di sisi kanan input (diabaikan jika type="password", karena slot itu dipakai toggle show/hide)
  icon?: ReactNode;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      label,
      id,
      labelAction,
      error,
      helperText,
      containerClassName = "",
      type = "text",
      className = "",
      icon,
      ...inputProps
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const generatedId = useId();
    const inputId = id ?? generatedId;

    const isPassword = type === "password";
    const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;
    const hasRightSlot = isPassword || !!icon;

    return (
      <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
        {(label || labelAction) && (
          <div className="flex items-center justify-between">
            {label && (
              <label htmlFor={inputId} className="text-sm font-medium text-text">
                {label}
              </label>
            )}
            {labelAction}
          </div>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={resolvedType}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={`w-full rounded-xl border bg-neutral-100 px-4 py-3 text-sm text-text placeholder:text-text-secondary/60 outline-none transition ${
              hasRightSlot ? "pr-11" : ""
            } ${
              error
                ? "border-danger focus:border-danger focus:ring-2 focus:ring-danger/20"
                : "border-border focus:border-primary-400 focus:ring-2 focus:ring-primary-200"
            } ${className}`}
            {...inputProps}
          />

          {isPassword ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          ) : (
            icon && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none">
                {icon}
              </span>
            )
          )}
        </div>

        {error ? (
          <p id={`${inputId}-error`} className="text-xs text-danger">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className="text-xs text-text-secondary">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export default TextField;