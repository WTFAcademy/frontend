type TPosition = {
  line: number;
  column?: number;
};

export type TError = {
  message: string;
  start?: TPosition;
  end?: TPosition;
  severity?: "error" | "warning" | "info";
};

export const requireError = (statement: boolean, error: TError) => {
  if (!statement) {
    throw error;
  }
};

export const makeError = (error: TError) => {
  return {
    message: error.message,
    start: error.start || {},
    end: error.end || {},
    severity: error.severity || "error",
  };
};

export const callError = (func: () => any, error: TError) => {
  try {
    return func();
  } catch (e) {
    throw makeError(error);
  }
};
