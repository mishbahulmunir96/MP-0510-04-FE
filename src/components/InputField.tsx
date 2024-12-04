import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FC } from "react";

interface InputFieldProps {
  htmlfor: string;
  label: string;
  type: string;
  id: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const InputField: FC<InputFieldProps> = ({
  htmlfor,
  label,
  type,
  id,
  placeholder,
  onChange,
  value,
  onBlur,
}) => {
  return (
    <div className="grid w-full items-center gap-1.5">
      <Label htmlFor={htmlfor}>{label}</Label>
      <Input
        type={type}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
    </div>
  );
};

export default InputField;
