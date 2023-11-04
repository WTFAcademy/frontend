import { TabsList, TabsTrigger } from "@site/src/components/ui/Tabs";
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Tabs } from "@radix-ui/react-tabs";
import { TModelWrapper } from "@site/src/components/editor/type";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import Translate from "@docusaurus/Translate";

type TProps = {
  modelWrappers: TModelWrapper[];
  activeModelIndex: string;
  onActiveModelChange: (index: string) => void;
};

const EditorTabs = ({
  modelWrappers,
  activeModelIndex,
  onActiveModelChange,
}: TProps) => {
  const tabRef = useRef<HTMLElement | undefined>();
  const [maxLength, setMaxLength] = useState(modelWrappers.length);

  const hideTabs = useMemo(() => {
    return modelWrappers.slice(maxLength, modelWrappers.length);
  }, [maxLength, modelWrappers]);

  const calcTabsLength = () => {
    const rect = tabRef.current.getBoundingClientRect();
    const maxlength = [...(tabRef.current.childNodes as any)].reduce(
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
    setMaxLength(modelWrappers.length);
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

  // const onFoldTabClick = (tab, index) => {
  //     setTabs(prev => {
  //         prev.splice(index + maxLength, 1);
  //         prev.splice(1, 0, tab);
  //         return prev;
  //     });
  //
  //     setTab(tab.value);
  // };

  return (
    <Tabs
      className="w-full overflow-hidden"
      value={activeModelIndex}
      onValueChange={onActiveModelChange}
    >
      <TabsList className="relative">
        {modelWrappers.map((tab, index) => (
          <TabsTrigger
            className="flex items-center h-10 mr-8 pb-2.5"
            value={index}
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
            <DropdownMenuContent>
              {hideTabs.slice(maxLength, hideTabs.length).map((tab, index) => (
                <>
                  <DropdownMenuItem
                    key={tab.value}
                    onClick={() => {
                      onActiveModelChange(index);
                    }}
                  >
                    <Translate id="profile.Account.button">
                      {tab.filename}
                    </Translate>
                  </DropdownMenuItem>
                  {index !==
                    hideTabs.slice(maxLength, hideTabs.length).length - 1 && (
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
