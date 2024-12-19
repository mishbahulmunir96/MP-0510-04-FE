import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC, ForwardedRef, forwardRef } from "react";

interface InputFieldProps {
  htmlFor: string;
  label: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  accept?: string; // Tambahkan untuk file input
}

// Menggunakan forwardRef untuk meneruskan referensi
const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      htmlFor,
      label,
      type,
      placeholder,
      onChange,
      value,
      onBlur,
      className,
      accept,
    },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className="mb-1 grid w-full items-center gap-1.5">
        <Label htmlFor={htmlFor} className="text-lg">
          {label}
        </Label>
        <Input
          ref={ref} // Memasukkan ref ke Input
          name={htmlFor}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
          onBlur={onBlur}
          className={`h-12 rounded-xl !text-base placeholder:text-lg ${className}`}
          accept={accept} // Memasukkan accept
        />
      </div>
    );
  },
);

export default InputField;
