import { Token, TokensList } from "Tokens";

export const endowWithPosition = (tokens: TokensList) => {
  let curLine = 0;
  return tokens.map(token => {
    const raw = token.raw;
    const lines = raw.split("\n");
    const startLine = curLine;
    const endLine = curLine + lines.length - 1;
    curLine = endLine + 1;
    return {
      ...token,
      start: {
        line: startLine,
        column: 0,
      },
      end: {
        line: endLine,
        column: lines[lines.length - 1].length,
      },
    };
  });
};
