import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { Button } from "@site/src/components/ui/Button";
import Link from "@docusaurus/Link";

function Quiz() {
  const options = [
    {
      id: 1,
      label:
        "A. Two Strings are printed: “The current time is 3 pm” and “The mood is good”",
    },
    { id: 2, label: "B. One Strings is printed: “The current time is 3 pm”" },
    { id: 3, label: "C. No String is printed" },
    { id: 4, label: "D. All of above are correct." },
  ];

  const [selectedId, setSelectedId] = useState(null);

  const handleItemClick = (id: number) => {
    setSelectedId(id);
  };

  return (
    <Layout>
      <div className="relative">
        <div className="relative mx-auto mt-8 w-[960px] min-h-[1080px]">
          <div className="mb-8">
            <span className="text-content">Solidity 101</span> /{" "}
            <span className="text-content">3. Function</span> /{" "}
            <span className="opacity-50 text-content">Quiz</span>
          </div>
          <div className="mb-8">
            <p className="text-2xl font-medium text-content">
              What happens when you call{" "}
              <span className="text-[#F85800]">report()</span>?
            </p>
          </div>
          <div className="w-full px-4 mb-8 border border-solid border-content-faint rounded-md py-[18px] bg-bg-faint">
            <div className="flex">
              <div>
                <span className="text-content-muted">1</span>
              </div>
              <div className="ml-3">
                <p>SPDX-License-Identifier: MIT</p>
              </div>
            </div>
            <div className="flex">
              <div>
                <span className="text-content-muted">2</span>
              </div>
              <div className="ml-3">
                <p>pragma solidity ^0.8.4;</p>
              </div>
            </div>
          </div>
          <div className="mb-4">
            <span className="text-xs opacity-50 text-content">
              Choose an answer
            </span>
          </div>
          <div className="flex flex-col mb-8 space-y-4">
            {options.map(option => (
              <div
                key={option.id}
                onClick={() => handleItemClick(option.id)}
                className={
                  selectedId === option.id
                    ? "px-4 py-4 rounded-md shadow-sm border border-solid border-blue-600 cursor-pointer bg-blue-600 text-white"
                    : "px-4 py-4 bg-bg rounded-md shadow-sm border border-solid border-content-faint cursor-pointer hover:bg-bg-faint"
                }
              >
                <p>{option.label}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end w-full mt-5 mb-12">
            <Button variant="outline">Back</Button>
            <Link to="/quiz/score">
              <Button className="ml-3">Continue</Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Quiz;
