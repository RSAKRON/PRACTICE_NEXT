import { Select as ShadSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReactNode } from "react";

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  className?: string;
  placeholder? : string;
}

export function Select({ value, onChange, children, className, placeholder="Select an option" }: SelectProps) {
  return (
    <ShadSelect onValueChange={onChange} value={value}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>{children}</SelectContent>
    </ShadSelect>
  );
}

interface ItemProps {
  value: string;
  children: ReactNode;
}

export function Item({ value, children }: ItemProps) {
  return <SelectItem value={value}>{children}</SelectItem>;
}
