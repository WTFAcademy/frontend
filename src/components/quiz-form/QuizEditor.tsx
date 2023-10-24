import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

import Editor, { TQuizEditorProps } from "../editor";

const QuizEditor = ({
  onQuizChange,
  onError,
  ...rest
}: UseControllerProps & Pick<TQuizEditorProps, "onQuizChange" | "onError">) => {
  const { field } = useController(rest);

  const { value = "", onChange } = field;

  return (
    <Editor
      height="75vh"
      value={value}
      onChange={onChange}
      onQuizChange={onQuizChange}
      onError={onError}
    />
  );
};

export default QuizEditor;
