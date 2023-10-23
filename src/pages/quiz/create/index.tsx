import { IQuizEditorValue } from "@site/src/components/editor";
import Layout from "@theme/Layout";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import FormProvider from "@site/src/components/hook-form/form-provider";
import QuizEditor from "@site/src/components/quiz-form/QuizEditor";
import QuizItem from "@site/src/components/quiz-form/QuizItem";

const DEFAULT_VALUE = `---
quiz_id: xxx
course_id: xxx
---

## What happens when you call \`__string()\` ?
> {index: 1, type: 'select', answer: ['A']}

![图片](https://avatars.githubusercontent.com/u/20828177?v=4)

\`\`\`solidity
    // 用户领取代币函数
    function requestTokens() external {
        require(requestedAddress[msg.sender] == false, "Can't Request Multiple Times!"); // 每个地址只能领一次
        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象
        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了

        token.transfer(msg.sender, amountAllowed); // 发送token
        requestedAddress[msg.sender] = true; // 记录领取地址
        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件
    }
\`\`\`

- (A) Two Strings are printed: "The current time is 3 pm" and aThe mood is good"
- (B) One Strings is printed: "The current time is 3 pm"
- (C) No String is printed
- (D) All of above are correct.

`;

const QuizCreate = () => {
  const [quiz, setQuiz] = useState<IQuizEditorValue>();
  const methods = useForm<FieldValues>({
    mode: "onChange",
    defaultValues: {
      quiz: DEFAULT_VALUE,
    },
  });

  return (
    <Layout
      title={`Hello from`}
      description="Description will go into a meta tag in <head />"
      noFooter
    >
      <FormProvider
        methods={methods}
        onSubmit={() => {
          console.log(123);
        }}
      >
        <div className="flex space-x-2">
          <div className="flex-1 h-full">
            <QuizEditor name="quiz" onQuizChange={setQuiz} />
          </div>
          <div>
            {(quiz?.content || []).map((item, index) => (
              <QuizItem
                key={`${item.type}-${index}`}
                control={methods.control}
                quiz={item}
                name={`${item.type}-preview-${index}`}
              />
            ))}
          </div>
        </div>
      </FormProvider>
    </Layout>
  );
};

export default QuizCreate;
