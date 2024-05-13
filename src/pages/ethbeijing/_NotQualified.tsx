import React from "react";
import Translate from "@docusaurus/Translate";

const NotQualified = () => {
  return (
    <div className="container">
      <div className="text-center">
        <div className="inline-flex w-16 h-16">
          <img className="w-full h-full" src="/img/ethbeijing-hourglass.png" alt="ETH Beijing"/>
        </div>
        <p className="relative font-bold text-[24px] mt-6 leading-[1.3] text-content">
          <Translate id="hackathon.deposit.notqualified.intro02">
            您还没有被选中
          </Translate>
          <br/>
          <Translate id="hackathon.deposit.notqualified.intro02">
            请稍等
          </Translate>
        </p>
      </div>
    </div>
  );
};

export default NotQualified;
