import { Tabs, TabsList, TabsTrigger } from "@site/src/components/ui/Tabs";
import React from "react";
import { TModelWrapper } from "@site/src/components/editor/type";
import Translate from "@docusaurus/Translate";
import useTabs from "@site/src/hooks/useTabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@site/src/components/ui/DropdownMenu";
import { cn } from "@site/src/utils/class-utils";

type TProps = {
  modelWrappers: TModelWrapper[];
  activeModelIndex: number;
  onActiveModelChange: (index: number) => void;
};

const _EditorTabs = ({
  modelWrappers,
  activeModelIndex,
  onActiveModelChange,
}: TProps) => {
  const { calculatedData, hideTabs, tabRef, maxLength } = useTabs({
    modelWrappers,
  });

  console.log(hideTabs, "+++++++++++++++++");
  return (
    <Tabs
      className="w-full overflow-hidden"
      value={String(activeModelIndex)}
      onValueChange={v => {
        onActiveModelChange(Number(v));
      }}
    >
      <TabsList className="relative" ref={tabRef}>
        {calculatedData.map((tab, index) => (
          <TabsTrigger
            className="flex items-center h-10 mr-8 pb-2.5"
            value={String(index)}
            key={index}
          >
            {tab.filename}
          </TabsTrigger>
        ))}
        {hideTabs?.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="absolute top-0 flex items-end justify-end overflow-hidden text-2xl font-bold leading-snug border-none cursor-pointer pb-2.5 mr-[0] w-[50px] h-[30px] right-3.5">
                ...
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {hideTabs.map((tab, index) => (
                <DropdownMenuItem
                  key={tab.value}
                  className={cn({
                    "text-brand": activeModelIndex === maxLength + index,
                  })}
                  onClick={() => {
                    onActiveModelChange(maxLength + index);
                  }}
                >
                  <Translate id="profile.Account.button">
                    {tab.filename}
                  </Translate>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TabsList>
    </Tabs>
  );
};

export default _EditorTabs;
