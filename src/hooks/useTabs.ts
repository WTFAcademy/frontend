import { TModelWrapper } from "@site/src/components/editor/type";
import { useEffect, useRef, useState, useMemo } from "react";

const useTabs = ({
  modelWrappers = [],
}: {
  modelWrappers: TModelWrapper[];
}) => {
  const tabRef = useRef<HTMLElement>(null);

  const [maxLength, setMaxLength] = useState();

  const calcTabsLength = () => {
    const rect = tabRef.current.getBoundingClientRect();
    const maxLength = [...tabRef.current.childNodes].reduce(
      (prev, next) => {
        const style = window.getComputedStyle(next);
        const marginRight = style.marginRight.replace("px", "");
        const nodeRect = next?.getBoundingClientRect();
        if (
          nodeRect.width + Number(marginRight) + prev.width <
          // reduce page padding.
          rect.width - 40
        ) {
          prev.max += 1;
          prev.width += nodeRect.width + Number(marginRight);
        }
        return prev;
      },
      { max: 0, width: 50 },
    );
    return maxLength.max;
  };

  const onHandleResize = () => {
    const maxLength = calcTabsLength();
    setMaxLength(maxLength);
  };

  useEffect(() => {
    window.addEventListener("resize", onHandleResize);
    return () => {
      window.removeEventListener("resize", onHandleResize);
    };
  }, []);

  useEffect(() => {
    if (tabRef.current) {
      const maxLength = calcTabsLength();
      setMaxLength(maxLength);
    }
  }, [tabRef.current]);

  const hideTabs = useMemo(() => {
    return modelWrappers?.slice(maxLength, modelWrappers.length);
  }, [maxLength, modelWrappers]);

  const calculatedData = useMemo(() => {
    return modelWrappers?.slice(0, maxLength || modelWrappers.length);
  }, [maxLength, modelWrappers]);

  return { calculatedData, hideTabs, tabRef, maxLength };
};

export default useTabs;
