// form
import * as Form from "@radix-ui/react-form"
import React, { ChangeEvent } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { ControllerRenderProps } from "react-hook-form/dist/types/controller"

import { Input } from "@site/src/components/ui/Input"
import {cn} from "@site/src/utils/class-utils"

// ----------------------------------------------------------------------

interface IProps {
  name: string
  label: string
  onChange?: (value: string) => void
  onBlur?: (value: string) => void
  errorMessage?: string
  warningMessage?: string
  horizontal?: boolean
}

type Props = IProps & React.InputHTMLAttributes<HTMLInputElement>

export default function RHFInput({
  name,
  onChange,
  onBlur,
  label,
  errorMessage,
  warningMessage, horizontal,
  ...other
}: Props) {
  const { control } = useFormContext()

  const handleChange = (e: any, field: ControllerRenderProps) => {
    field.onChange(e.target.value)
    onChange?.(e)
  }

  const handleBlur = (e: any, field: ControllerRenderProps) => {
    field.onBlur()
    onBlur?.(e.target.value)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Form.Field className={cn("mb-[10px] grid", {"flex justify-between items-center gap-2": horizontal})} name={name}>
          <div className={cn("flex items-baseline justify-between", {"justify-start gap-2": horizontal})}>
            <Form.Label className="text-[15px] leading-[35px]">
              {label}
            </Form.Label>
            {(error?.message || errorMessage) && (
              <Form.Message className="text-[13px] text-red-500">
                {error?.message || errorMessage}
              </Form.Message>
            )}
          </div>
          <Form.Control asChild>
            <Input
              {...field}
              onChange={(e) => handleChange(e, field)}
              onBlur={(e) => handleBlur(e, field)}
              className={cn("w-full", {"w-auto min-w-[100px] shrink-0": horizontal})}
              {...other}
            />
          </Form.Control>
        </Form.Field>
      )}
    />
  )
}
