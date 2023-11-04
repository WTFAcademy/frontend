import React from "react";
import * as Form from "@radix-ui/react-form";
import {
  FormProvider as RHFFormProvider,
  UseFormReturn,
} from "react-hook-form";

// ----------------------------------------------------------------------

interface Props {
  children: any;
  methods: UseFormReturn<any>;
  onSubmit?: VoidFunction;
}

export default function FormProvider({ children, onSubmit, methods }: Props) {
  return (
    <RHFFormProvider {...methods}>
      <Form.Root className="w-full text-black" onSubmit={onSubmit}>
        {children}
      </Form.Root>
    </RHFFormProvider>
  );
}
