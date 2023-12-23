import { TokensList } from "Tokens";
import { TPosition, TTokenList } from "@site/src/components/editor/type";

const cleanHeadAndLastNewlineChar = (str: string) => {
  return str.replace(/^\n/, "").replace(/\n$/, "");
};

export const endowWithPosition = (tokens: TokensList, initialLine: number) => {
  let curLine = initialLine || 0;
  return tokens.map(token => {
    const raw = cleanHeadAndLastNewlineChar(token.raw);

    const start = curLine;
    const end = start + raw.split("\n").length - 1;

    const position = {
      startLine: start,
      endLine: end,
      lineColumns: [],
    };

    const lines = raw.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineColumn = {
        line: start + i,
        column: line.length,
      };
      position.lineColumns.push(lineColumn);
    }

    curLine = end + 1;

    return {
      ...token,
      position,
    };
  });
};

export const transformMonacoPosition = (position: {
  lineNumber: number;
  column: number;
}): TPosition => {
  return {
    line: position.lineNumber,
    column: position.column,
  };
};

export const findTokenByPosition = (
  tokens: TTokenList,
  position: TPosition,
) => {
  const { line } = position;
  return tokens.find(token => {
    const { startLine, endLine } = token.position;
    if (line < startLine || line > endLine) {
      return false;
    }

    const lineColumns = token.position.lineColumns;
    const lineColumn = lineColumns.find(lineColumn => {
      return lineColumn.line === line;
    });

    return !!lineColumn;
  });
};
