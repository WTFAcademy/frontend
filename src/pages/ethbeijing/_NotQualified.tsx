import React from "react";

const NotQualified = () => {
  return (
    <div className="container">
      <div className="text-center">
        <div className="inline-flex w-16 h-16">
          <img className="w-full h-full" src="/img/ethbeijing-hourglass.png" alt="ETH Beijing"/>
        </div>
        <p className="relative font-bold text-[24px] mt-6 leading-[1.3] text-content">
          You Have Not Been Selected Yet <br/>Please Wait
        </p>
      </div>
    </div>
  );
};

export default NotQualified;
