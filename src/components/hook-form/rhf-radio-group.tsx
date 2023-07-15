// form
import * as Form from "@radix-ui/react-form"
import { RadioGroupProps } from "@radix-ui/react-radio-group"
import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import { ControllerRenderProps } from "react-hook-form/dist/types/controller"

import { Label } from "@site/src/components/ui/Label"
import { RadioGroup, RadioGroupItem } from "@site/src/components/ui/RadioGroup"

// ----------------------------------------------------------------------

type TProps = {
  name: string
  label: string
  onChange?: (value: string) => void
  options: { value: string; label: string }[]
  errorMessage?: string
} & RadioGroupProps

export default function RHFInput({
  name,
  onChange,
  label,
  errorMessage,
  options,
}: TProps) {
  const { control } = useFormContext()

  const handleChange = (e: string, field: ControllerRenderProps) => {
    field.onChange(e)
    onChange?.(e)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Field className="grid mb-[10px]" name={name}>
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px]">
              {label}
            </Form.Label>
            {(error?.message || errorMessage) && (
              <Form.Message className="text-[13px] text-red-500">
                {error?.message || errorMessage}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <RadioGroup
              {...field}
              onValueChange={(value) => handleChange(value, field)}
            >
              {options.map((option, index) => (
                <div
                  key={`${index}_${option.value}`}
                  className="flex items-center space-x-2"
                >
                  <RadioGroupItem value={option.value} id={option.label} />
                  <Label htmlFor={option.label}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </Form.Control>
        </Form.Field>
      )}
    />
  )
}
