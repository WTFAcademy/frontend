import { TokensList } from "Tokens";

const cleanHeadAndLastNewlineChar = (str: string) => {
  return str.replace(/^\n/, "").replace(/\n$/, "");
};

export const endowWithPosition = (tokens: TokensList, initialLine: number) => {
  let curLine = initialLine || 0;
  return tokens.map(token => {
    const raw = token.raw;
    let clearRaw = raw;

    while (clearRaw.endsWith("\n")) {
      curLine++;
      clearRaw = cleanHeadAndLastNewlineChar(clearRaw);
    }

    const lines = clearRaw.split("\n");
    const startLine = curLine;
    const endLine = curLine + lines.length - 1;
    curLine = endLine + 1;

    return {
      ...token,
      start: {
        line: startLine,
      },
      end: {
        line: endLine,
      },
    };
  });
};
