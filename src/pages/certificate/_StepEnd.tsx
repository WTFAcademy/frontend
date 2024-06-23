import React, { useContext, useMemo } from "react";
import { get } from "lodash-es";
import {
  CourseIdAndNameMap,
  CourseIdAndSuffixLinkMap,
} from "@site/src/constants/course";
import { CertificateContext } from "@site/src/contexts/CertificateContext";
import { OS_LINK } from "@site/src/constants/nft";
import { EyeIcon, TwitterIcon } from "lucide-react";
import { buttonVariants } from "@site/src/components/ui/Button";
import { cn } from "@site/src/utils/class-utils";

const StepEnd = (props: { txInfo: any }) => {
  const { txInfo } = props;
  const { info } = useContext(CertificateContext);

  const donationAmount =
    Number(get(txInfo, "amount")) ||
    Number(get(info, "data.donationAmount", 0));
  const title = get(info, "course_info.course_title");
  const courseId = get(info, "courseId");

  const twLink = useMemo(() => {
    const text = `I completed the ${CourseIdAndNameMap[courseId]} course at WTF Academy and claimed a certificate on @base ! @WTFAcademy_

Join us at https://wtf.academy/${CourseIdAndSuffixLinkMap[courseId]}?v=1`;

    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  }, [courseId, title]);

  return (
    <div className="flex flex-col">
      <p className="text-xl font-medium">🎉 恭喜你在{title}课程中毕业。</p>
      {!!donationAmount && (
        <p className="mt-3 mb-2 text-base">
          感谢您为WTF团队捐赠的
          <span className="mx-3 font-bold text-primary">{donationAmount}</span>
          ETH！
        </p>
      )}
      <p className="my-4 text-base font-medium">
        <a
          className="inline-flex items-center no-underline cursor-pointer text-primary"
          target="_blank"
          href={OS_LINK}
          rel="noreferrer"
        >
          <EyeIcon className="w-5 h-5 mr-2" />
          查看你的NFT
        </a>
      </p>
      <a
        target="_blank"
        href={twLink}
        className={cn(
          buttonVariants(),
          "w-3/4 text-base font-medium h-12 !text-white",
        )}
        rel="noreferrer"
      >
        <span>点击分享至Twitter</span>
        <TwitterIcon className="w-5 h-5 ml-2" />
      </a>
    </div>
  );
};

export default StepEnd;
