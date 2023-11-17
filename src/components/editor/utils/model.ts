import { Monaco } from "@monaco-editor/react";
import { TModelWrapper } from "@site/src/components/editor/type";

export const formatModels = (
  monaco: Monaco,
  newModelWrappers: TModelWrapper[],
  curModelWrappers: TModelWrapper[],
  overWriteExisting = false,
) => {
  const formatModelWrappers: any[] = [];

  for (const modelWrapper of newModelWrappers) {
    let curModel = monaco.editor.getModel(
      monaco.Uri.file(modelWrapper.filename),
    );

    // If model not exist create, otherwise replace value (for editor resets).
    if (curModel === null) {
      curModel = monaco.editor.createModel(
        modelWrapper.value,
        modelWrapper.language,
        monaco.Uri.file(modelWrapper.filename),
      );
      // monaco.editor.setModelLanguage(curModel, modelWrapper.language);
    } else if (overWriteExisting) {
      curModel.setValue(modelWrapper.value);
    }
    curModel.updateOptions({ tabSize: 2 });
    formatModelWrappers.push({
      ...modelWrapper,
      model: curModel,
    });
  }

  return formatModelWrappers;
};
