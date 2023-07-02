// form
import * as Form from "@radix-ui/react-form"
import { SwitchProps } from "@radix-ui/react-switch"
import React, { ChangeEvent } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { ControllerRenderProps } from "react-hook-form/dist/types/controller"

import Switch from "@site/src/components/ui/switch"

// ----------------------------------------------------------------------

type TProps = {
  name: string
  label: string
  onChange?: (value: boolean) => void
  errorMessage?: string
} & SwitchProps

export default function RHFSwitch({
  name,
  onChange,
  label,
  errorMessage,
  ...other
}: TProps) {
  const { control } = useFormContext()

  const handleChange = (e: boolean, field: ControllerRenderProps) => {
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
            <Switch
              {...field}
              onCheckedChange={(e) => handleChange(e, field)}
              {...other}
            />
          </Form.Control>
        </Form.Field>
      )}
    />
  )
}
