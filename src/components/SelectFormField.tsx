// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// import {
//   Controller,
//   type Control,
//   type FieldValues,
//   type Path,
//   type PathValue,
// } from "react-hook-form";
// import { Field, FieldLabel } from "@/components/ui/field";

// type SelectFormFieldProps<T extends FieldValues> = {
//   label: string;
//   control: Control<T>;
//   name: Path<T>;
//   options: readonly PathValue<T, Path<T>>[];
//   placeholder: string;
// };

// export function SelectFormField<T extends FieldValues>({
//   label,
//   control,
//   name,
//   options,
//   placeholder,
// }: SelectFormFieldProps<T>) {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field, fieldState }) => (
//         <Field data-invalid={fieldState.invalid}>
//           <FieldLabel htmlFor={name}>{label}</FieldLabel>
//           <Select
//             onValueChange={(val) =>
//               field.onChange(val as PathValue<T, Path<T>>)
//             }
//             defaultValue={field.value}
//           >
//             <SelectTrigger>
//               <SelectValue />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectItem value="">{placeholder}</SelectItem>
//                 {options.map((option) => (
//                   <SelectItem key={option} value={option}>
//                     {option}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </Field>
//       )}
//     />
//   );
// }

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

type SelectOption = {
  label: string;
  value: string | number;
};

type SelectOptionInput = string | number | SelectOption;

type SelectFormFieldProps<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  name: Path<T>;
  options: readonly SelectOptionInput[];
  placeholder: string;
};

function isSelectOption(option: SelectOptionInput): option is SelectOption {
  return typeof option === "object" && option !== null;
}

export function SelectFormField<T extends FieldValues>({
  label,
  control,
  name,
  options,
  placeholder,
}: SelectFormFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedValue = field.value == null ? "" : String(field.value);

        const selectedOption = options.find((option) =>
          isSelectOption(option)
            ? String(option.value) === selectedValue
            : String(option) === selectedValue,
        );

        const selectedLabel =
          selectedOption === undefined
            ? undefined
            : isSelectOption(selectedOption)
              ? selectedOption.label
              : String(selectedOption);

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>

            <Select
              name={field.name}
              value={selectedValue}
              onValueChange={(value) => {
                const option = options.find((item) =>
                  isSelectOption(item)
                    ? String(item.value) === value
                    : String(item) === value,
                );

                if (option === undefined) {
                  field.onChange(value);
                } else if (isSelectOption(option)) {
                  field.onChange(option.value);
                } else {
                  field.onChange(option);
                }
              }}
              onOpenChange={(open) => {
                if (!open) field.onBlur();
              }}
            >
              <SelectTrigger id={name} aria-invalid={fieldState.invalid}>
                <SelectValue placeholder={placeholder}>
                  {selectedLabel}
                </SelectValue>
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectItem value="">{placeholder}</SelectItem>
                  {options.map((option) => {
                    const value = String(
                      isSelectOption(option) ? option.value : option,
                    );

                    const label = String(
                      isSelectOption(option) ? option.label : option,
                    );

                    return (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
