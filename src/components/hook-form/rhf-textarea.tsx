// form
import * as Form from "@radix-ui/react-form";
import React, { ChangeEvent } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { ControllerRenderProps } from "react-hook-form/dist/types/controller";

import { Textarea, TextareaProps } from "@site/src/components/ui/Textarea";

// ----------------------------------------------------------------------

type TProps = {
  name: string;
  label: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
  errorMessage?: string;
} & TextareaProps;

export default function RHFTextarea({
  name,
  onChange,
  onBlur,
  label,
  errorMessage,
  ...other
}: TProps) {
  const { control } = useFormContext();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps,
  ) => {
    field.onChange(e.target.value);
    onChange?.(e.target.value);
  };

  const handleBlur = (e: any, field: ControllerRenderProps) => {
    field.onBlur();
    onBlur?.(e.target.value);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Field className="grid mb-[10px]" name={name}>
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] leading-[35px]">
              {label}
            </Form.Label>
            {(error?.message || errorMessage) && (
              <Form.Message className="text-red-500 text-[13px]">
                {error?.message || errorMessage}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <Textarea
              {...field}
              onChange={(e: any) => handleChange(e, field)}
              onBlur={(e: any) => handleBlur(e, field)}
              {...other}
            />
          </Form.Control>
        </Form.Field>
      )}
    />
  );
}
