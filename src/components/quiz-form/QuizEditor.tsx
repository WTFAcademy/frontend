import React from "react";
import {
  Controller,
  UseControllerProps,
  useFormContext,
} from "react-hook-form";

import Editor, { IQuizEditorValue, TQuizEditorProps } from "../editor";
import { ControllerRenderProps } from "react-hook-form/dist/types/controller";

const QuizEditor = ({
  onQuizChange,
  name,
  ...rest
}: UseControllerProps & TQuizEditorProps) => {
  const { control } = useFormContext();

  const handleChange = (e: IQuizEditorValue, field: ControllerRenderProps) => {
    console.log(e);
    field.onChange(e);
    onQuizChange?.(e);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Editor
          height="77vh"
          onQuizChange={e => handleChange(e, field)}
          {...field}
          {...rest}
        />
      )}
    />
  );
};

export default QuizEditor;
