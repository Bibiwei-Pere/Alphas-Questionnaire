import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox, CircleCheckbox } from "../ui/checkbox";

export type DynamicType = "select" | "input" | "circleCheckbox" | "squareCheckbox";

interface DynamicFieldProps {
  index?: number;
  name: string;
  label: string;
  type: DynamicType;
  form: any;
  options?: string[];
}

export const DynamicField = ({ name, label, type, form, options, index }: DynamicFieldProps) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className='font-medium'>
            {index && `${index}.`} {label}
          </FormLabel>

          {type === "input" && <Input placeholder={`Enter ${label.toLowerCase()}`} {...field} />}

          {type === "select" && (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder={field?.value ? field.value : "Select option"} />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {type === "squareCheckbox" &&
            options?.map((option, index: number) => {
              const id = `${name}-${option}`;
              const isChecked = field.value?.includes(option);

              const handleChange = (checked: boolean) => {
                const newValue = checked
                  ? [...(field.value || []), option]
                  : field.value?.filter((v: string) => v !== option);
                field.onChange(newValue);
              };

              return (
                <FormItem key={index} className='flex items-center gap-2 pb-1'>
                  <Checkbox id={id} checked={isChecked} onCheckedChange={handleChange} />
                  <FormLabel htmlFor={id} className='cursor-pointer relative bottom-1'>
                    {option}
                  </FormLabel>
                </FormItem>
              );
            })}

          {type === "circleCheckbox" &&
            options?.map((option, index: number) => {
              const id = `${name}-${option}`;
              return (
                <FormItem key={index} className='flex items-center gap-2 pb-1'>
                  <CircleCheckbox
                    id={id}
                    checked={field.value === option}
                    onCheckedChange={() => field.onChange(field.value === option ? "" : option)}
                  />
                  <FormLabel htmlFor={id} className='cursor-pointer relative bottom-1'>
                    {option}
                  </FormLabel>
                </FormItem>
              );
            })}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};
