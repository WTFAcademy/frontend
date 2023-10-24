import { TabsList, TabsTrigger } from "@site/src/components/ui/Tabs";
import Translate from "@docusaurus/Translate";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Tabs } from "@radix-ui/react-tabs";
import { TABS } from "@site/src/pages/quiz/create/demo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@site/src/components/ui/DropdownMenu";
import { clone } from "lodash-es";
const EditorTabs = () => {
  const [tab, setTab] = useState("1");
  const tabRef = useRef<HTMLElement>();
  const [maxLength, setMaxLength] = useState(TABS.length);

  const [tabs, setTabs] = useState(TABS);

  const calcTabsLength = () => {
    const rect = tabRef.current.getBoundingClientRect();
    const maxlength = [...tabRef.current.childNodes].reduce(
      (prev, next) => {
        const style = window.getComputedStyle(next);
        const marginRight = style.marginRight.replace("px", "");
        const nodeRect = next?.getBoundingClientRect();
        if (nodeRect.width + Number(marginRight) + prev.width < rect.width) {
          prev.max += 1;
          prev.width += nodeRect.width + Number(marginRight);
        }
        return prev;
      },
      { max: 0, width: 50 },
    );
    return maxlength.max;
  };

  const onHandleResize = () => {
    setMaxLength(TABS.length);
    const maxlength = calcTabsLength();
    setMaxLength(maxlength);
  };

  useEffect(() => {
    window.addEventListener("resize", onHandleResize);

    return () => {
      window.removeEventListener("resize", onHandleResize);
    };
  }, []);

  useLayoutEffect(() => {
    if (tabRef.current) {
      const maxlength = calcTabsLength();
      setMaxLength(maxlength);
    }
  }, [tabRef.current]);

  const onFoldTabClick = (tab, index) => {
    setTabs(prev => {
      prev.splice(index + maxLength, 1);
      prev.splice(1, 0, tab);
      return prev;
    });

    setTab(tab.value);
  };

  return (
    <Tabs
      key={tab}
      className="w-full overflow-hidden"
      value={tab}
      onValueChange={setTab}
    >
      <TabsList ref={tabRef} className="relative">
        {tabs.slice(0, maxLength).map(tab => (
          <TabsTrigger
            className="flex items-center h-10 mr-8 pb-2.5"
            value={tab.value}
            key={tab.value}
          >
            {tab.label}
          </TabsTrigger>
        ))}
        {maxLength < tabs.length && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="absolute top-0 flex items-end justify-end overflow-hidden text-2xl font-bold leading-snug border-none cursor-pointer pb-2.5 mr-[0] w-[50px] h-[30px] right-3.5">
                ...
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {tabs.slice(maxLength, tabs.length).map((tab, index) => (
                <>
                  <DropdownMenuItem
                    key={tab.value}
                    onClick={() => {
                      console.log(tab);
                      onFoldTabClick(tab, index);
                    }}
                  >
                    <Translate id="profile.Account.button">
                      {tab.label}
                    </Translate>
                  </DropdownMenuItem>
                  {index !== tabs.slice(maxLength, tabs.length).length - 1 && (
                    <DropdownMenuSeparator />
                  )}
                </>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </TabsList>
    </Tabs>
  );
};

export default EditorTabs;
