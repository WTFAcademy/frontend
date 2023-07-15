import * as Form from "@radix-ui/react-form"
import {SelectProps} from "@radix-ui/react-select"
import React from "react"
// form
import {Controller, useFormContext} from "react-hook-form"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@site/src/components/ui/Select"
import {cn} from "@site/src/utils/class-utils";

// ----------------------------------------------------------------------

type IProps = {
  name: string
  label: string | React.ReactNode
  onChange?: (value: string, option: any) => void
  errorMessage?: string
  options: { label: string; value: string }[]
  horizontal?: boolean
} & SelectProps &
  React.HTMLAttributes<HTMLDivElement>

const RHFSelect = (
  {
    name,
    label,
    onChange,
    options,
    errorMessage,
    horizontal,
    ...other
  }: IProps) => {
  const {control} = useFormContext()

  const handleChange = (e: any, field: any) => {
    field.onChange(e)
    onChange && onChange(e)
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState: {error}}) => (
        <Form.Field className={cn("mb-[10px] grid", {"flex justify-between items-center gap-2": horizontal})} name={name}>
          <div className={cn("flex items-baseline justify-between", {"justify-start": horizontal})}>
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
            <Select {...field} onValueChange={(e) => handleChange(e, field)} {...other}>
              <SelectTrigger className={cn("w-full", {"w-auto min-w-[100px] flex-shrink-0": horizontal})}>
                <SelectValue placeholder="请输入" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option, index) => (
                    <SelectItem key={`${index}_${option.value}`} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Form.Control>
        </Form.Field>
      )}
    />
  )
}

export default RHFSelect
