import React, { useState, useEffect } from "react";
import Layout from "@theme/Layout";
import { Button } from "@site/src/components/ui/Button";
import Link from "@docusaurus/Link";
import Confettiful from "@site/src/components/Confettiful";

function QuizScore() {
  const [score, setScore] = useState(60);

  const handleClick = () => {
    setScore(100);
  };

  return (
    <Layout>
      <div className="relative">
        {score == 100 && <Confettiful />}
        <div className="relative mx-auto mt-8 w-[960px] min-h-[1080px]">
          <div className="mb-8">
            <span className="text-content">Solidity 101</span> /{" "}
            <span className="text-content">3. Function</span> /{" "}
            <span className="opacity-50 text-content">Quiz</span>
          </div>
          {score == 100 ? (
            <div>
              <div className="text-center mb-[42px]">
                <p className="text-[64px]">🎉</p>
                <p className="mt-4 text-sm font-normal text-content">
                  Congratulations on passing this quiz.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-medium text-center text-content">
                  The score is
                </p>
              </div>

              <div className="flex items-center justify-center px-6 py-2 mx-auto border border-green-200 border-solid rounded-sm w-[150px] h-[100px] box-content bg-green-50 dark:bg-green-950 dark:border-green-800">
                <p className="font-bold leading-none text-center text-green-500 text-[80px]">
                  {score}
                </p>
              </div>

              <div className="flex justify-center w-full mb-12 mt-14">
                <Link to="/quiz">
                  <Button>Back to Tutorials</Button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-[42px]">
                <p className="text-[64px]">🚧</p>
                <p className="mt-4 text-sm font-normal text-content">
                  There are <span className="text-lg font-bold">3</span> wrong
                  answers.
                </p>
              </div>

              <div className="mb-4">
                <p className="text-lg font-medium text-center text-content">
                  The score is
                </p>
              </div>

              <div className="flex items-center justify-center px-6 py-2 mx-auto border border-blue-200 border-solid rounded-sm w-[150px] h-[100px] box-content bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                <p className="font-bold leading-none text-center text-blue-600 text-[80px] dark:text-blue-400">
                  {score}
                </p>
              </div>

              <div className="flex justify-center w-full mb-12 mt-14">
                {/* <Link to="/quiz/score"> */}
                <Button variant="outline" onClick={handleClick}>
                  Try Again
                </Button>
                {/* </Link> */}
                <Link to="/quiz">
                  <Button className="ml-3">Back to Tutorials</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default QuizScore;
