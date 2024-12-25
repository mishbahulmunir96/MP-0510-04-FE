import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FC } from "react";

interface GenderRadioGroupProps {
  value: string;
  onChange: (value: string) => void;
}

const GenderRadioGroup: FC<GenderRadioGroupProps> = ({ value, onChange }) => {
  return (
    <RadioGroup
      value={value}
      onValueChange={onChange}
      className="mt-2 flex gap-8 text-slate-900"
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Male" id="gender-male" />
        <Label htmlFor="gender-male">Male</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="Female" id="gender-female" />
        <Label htmlFor="gender-female">Female</Label>
      </div>
    </RadioGroup>
  );
};

export default GenderRadioGroup;
