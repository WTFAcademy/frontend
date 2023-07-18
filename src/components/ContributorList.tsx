import useBreakpoint from "@site/src/hooks/useBreakpoint";
import React, { useMemo, useState } from "react";
import { getContributors } from "@site/src/api/contributor";
import { chunk } from "lodash-es";
import { Button } from "@site/src/components/ui/Button";

import { cn } from "@site/src/utils/class-utils";
import { useQuery } from "react-query";

const ContributorList = () => {
  const size = useBreakpoint();
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const toggelContributeList = () => setIsExpand((x: boolean) => !x);

  const { data, isLoading } = useQuery("contributors", () => getContributors());

  const showCount = useMemo(() => {
    switch (size) {
      case "md":
      case "sm":
      case "xs":
        return 4;
      default:
        return 8;
    }
  }, [size]);

  const showColumnCount = useMemo(() => {
    switch (size) {
      case "md":
      case "sm":
      case "xs":
        return 3;
      default:
        return 2;
    }
  }, [size]);

  const userChunks = useMemo(() => {
    return chunk(data, showCount);
  }, [data, showCount]);

  return (
    <div className="bg-background border-border border rounded-md overflow-hidden">
      <table className="border-collapse overflow-hidden">
        <tbody>
          {isLoading
            ? new Array(showColumnCount).fill("").map((_, index) => (
                <tr key={index} className="border-none">
                  {new Array(showCount).fill("").map((_, i) => (
                    <td
                      key={i}
                      className="w-[95px] h-[120px] bg-card border-none"
                    >
                      <div className="w-[64px] h-[64px] rounded-full bg-gray-200"></div>
                      <div className="w-[64px] mt-2 h-2 rounded-full bg-gray-200"></div>
                    </td>
                  ))}
                </tr>
              ))
            : (isExpand
                ? userChunks
                : userChunks.slice(0, showColumnCount)
              ).map((chunk, index) => (
                <tr key={`tr_${index}`} className="border-0">
                  {chunk.map((user, index) => (
                    <td
                      key={user.id}
                      className={cn(
                        "w-[95px] mx-auto h-[120px] bg-card border-r-0 border-b border-t-0 border-l-0 border-border",
                        { "border-r": index !== chunk.length - 1 }
                      )}
                    >
                      <img
                        className="w-[64px] h-[64px] rounded-full"
                        src={user.avatar_url}
                        alt={user.login}
                      />
                      <div className="w-[64px] mt-[6px] text-sm truncate">
                        {user.login}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
      <div className="flex justify-center mb-4">
        {userChunks && userChunks.length ? (
          <Button
            className="bg-other1 text-other1-foreground"
            onClick={toggelContributeList}
          >
            {isExpand ? "Collapse Contributors" : "Expand All Contributors"}
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ContributorList;
