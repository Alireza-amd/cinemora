import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "@/components/ui/combobox";

import { Field, FieldError, FieldLabel } from "@/components/ui/field";

import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type PathValue,
} from "react-hook-form";

type StringArrayPath<T extends FieldValues> = {
  [K in Path<T>]: PathValue<T, K> extends string[] ? K : never;
}[Path<T>];

type MultiSelectOption = {
  label: string;
  value: string | number;
};

type MultiSelectFormFieldProps<
  T extends FieldValues,
  TName extends StringArrayPath<T>,
> = {
  label: string;
  control: Control<T>;
  name: TName;
  options: readonly MultiSelectOption[];
  placeholder: string;
};

export function MultiSelectFormField<
  T extends FieldValues,
  TName extends StringArrayPath<T>,
>({
  label,
  control,
  name,
  options,
  placeholder,
}: MultiSelectFormFieldProps<T, TName>) {
  const items = options.map((option) => option.value);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedValues = (field.value ?? []) as string[];

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={name}>{label}</FieldLabel>

            <Combobox
              multiple
              items={items}
              value={selectedValues}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            >
              <ComboboxChips id={name} aria-invalid={fieldState.invalid}>
                <ComboboxValue>
                  {(values: string[]) => (
                    <>
                      {values.map((value) => {
                        const option = options.find(
                          (item) => item.value === value,
                        );

                        return (
                          <ComboboxChip key={value}>
                            {option?.label ?? value}
                          </ComboboxChip>
                        );
                      })}

                      <ComboboxChipsInput
                        placeholder={
                          selectedValues.length === 0
                            ? placeholder
                            : "Add another..."
                        }
                      />
                    </>
                  )}
                </ComboboxValue>
              </ComboboxChips>

              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>

                <ComboboxList>
                  {(item: string) => {
                    const option = options.find(
                      (entry) => entry.value === item,
                    );

                    return (
                      <ComboboxItem key={item} value={item}>
                        {option?.label ?? item}
                      </ComboboxItem>
                    );
                  }}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
