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
    <div>
      <Editor
        value={value}
        onChange={onChange}
        onQuizChange={onQuizChange}
        onError={onError}
      />
    </div>
  );
};

export default QuizEditor;
