import React from "react";
import * as Form from "@radix-ui/react-form";
import {
  FormProvider as RHFFormProvider,
  UseFormReturn,
} from "react-hook-form";
import { cn } from "@site/src/utils/class-utils";

// ----------------------------------------------------------------------

interface Props {
  children: any;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
  className?: string;
}

export default function FormProvider({
  children,
  onSubmit,
  methods,
  className,
}: Props) {
  return (
    <RHFFormProvider {...methods}>
      <Form.Root
        className={cn("w-full text-black", className)}
        onSubmit={onSubmit}
      >
        {children}
      </Form.Root>
    </RHFFormProvider>
  );
}
