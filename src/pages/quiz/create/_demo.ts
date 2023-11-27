import { convertCourseToMd } from "@site/src/components/editor/utils/convert";
import { EExerciseType } from "@site/src/constants/quiz";

export const DEFAULT_QUIZ = {
  meta: {
    lesson_id: "xxxx",
  },
  exercises: [
    {
      title: "## What happens when you call `__string()` ?\n",
      meta: {
        index: 1,
        type: EExerciseType.SELECT,
        answer: ["A"],
        score: 1,
      },
      content: {
        extend: [
          {
            type: "paragraph",
            raw: "![图片](    https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG)",
            text: "![图片](    https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG)",
            tokens: [
              {
                type: "image",
                raw: "![图片](    https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG)",
                href: "https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG",
                title: null,
                text: "图片",
              },
            ],
            start: {
              line: 8,
            },
            end: {
              line: 8,
            },
          },
          {
            type: "space",
            raw: "\n\n",
            start: {
              line: 9,
            },
            end: {
              line: 9,
            },
          },
          {
            type: "code",
            raw: '```solidity\n    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, amountAllowed); // 发送token\n        requestedAddress[msg.sender] = true; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }\n```',
            lang: "solidity",
            text: '    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, amountAllowed); // 发送token\n        requestedAddress[msg.sender] = true; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }',
            start: {
              line: 10,
            },
            end: {
              line: 21,
            },
          },
          {
            type: "space",
            raw: "\n\n",
            start: {
              line: 22,
            },
            end: {
              line: 22,
            },
          },
          {
            type: "space",
            raw: "\n\n",
            start: {
              line: 27,
            },
            end: {
              line: 27,
            },
          },
        ],
        options: [
          {
            label:
              'Two Strings are printed: "The current time is 3 pm" and aThe mood is good"',
            value: "A",
          },
          {
            label: 'One Strings is printed: "The current time is 3 pm"',
            value: "B",
          },
          {
            label: "No String is printed",
            value: "C",
          },
          {
            label: "All of above are correct.",
            value: "D",
          },
        ],
      },
    },
    {
      title: "## What happens when you call `__string()` ?\n",
      meta: {
        index: 2,
        type: EExerciseType.INSET,
        answer: ["A"],
        score: 1,
      },
      content: {
        extend: [
          {
            type: "paragraph",
            raw: "![图片](    https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG)",
            text: "![图片](    https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG)",
            tokens: [
              {
                type: "image",
                raw: "![图片](    https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG)",
                href: "https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG",
                title: null,
                text: "图片",
              },
            ],
            start: {
              line: 31,
            },
            end: {
              line: 31,
            },
          },
          {
            type: "space",
            raw: "\n\n",
            start: {
              line: 32,
            },
            end: {
              line: 32,
            },
          },
          {
            type: "code",
            raw: '```solidity\n    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, <<!!>>); // 发送token\n        requestedAddress[msg.sender] = <<!!>>; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }\n```',
            lang: "solidity",
            text: '    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, <<!!>>); // 发送token\n        requestedAddress[msg.sender] = <<!!>>; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }',
            start: {
              line: 33,
            },
            end: {
              line: 44,
            },
          },
          {
            type: "space",
            raw: "\n\n",
            start: {
              line: 45,
            },
            end: {
              line: 45,
            },
          },
          {
            type: "space",
            raw: "\n\n",
            start: {
              line: 53,
            },
            end: {
              line: 53,
            },
          },
        ],
        options: [
          {
            label: "amountAllowed",
            value: "A",
          },
          {
            label: "true",
            value: "B",
          },
          {
            label: "true",
            value: "C",
          },
          {
            label: "true",
            value: "D",
          },
          {
            label: "true",
            value: "E",
          },
          {
            label: "true",
            value: "F",
          },
          {
            label: "true",
            value: "G",
          },
        ],
      },
    },
    {
      title: "## What happens when you call `__string()` ?\n",
      meta: {
        index: 3,
        type: EExerciseType.MULTIPLE_SELECT,
        answer: ["A", "B"],
        score: 1,
      },
      content: {
        extend: [
          {
            type: "paragraph",
            raw: "![图片(https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG)",
            text: "![图片(https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG)",
            tokens: [
              {
                type: "image",
                raw: "![图片](https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG)",
                href: "https://user-images.githubusercontent.com/3956472/112517347-97f0ed00-8d6e-11eb-9415-e0ed06e69f9a.PNG",
                title: null,
                text: "图片",
              },
            ],
            start: {
              line: 57,
            },
            end: {
              line: 57,
            },
          },
          {
            type: "space",
            raw: "\n\n",
            start: {
              line: 58,
            },
            end: {
              line: 58,
            },
          },
          {
            type: "code",
            raw: '```solidity\n    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, amountAllowed); // 发送token\n        requestedAddress[msg.sender] = true; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }\n```',
            lang: "solidity",
            text: '    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, amountAllowed); // 发送token\n        requestedAddress[msg.sender] = true; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }',
            start: {
              line: 59,
            },
            end: {
              line: 70,
            },
          },
          {
            type: "space",
            raw: "\n\n",
            start: {
              line: 71,
            },
            end: {
              line: 71,
            },
          },
        ],
        options: [
          {
            label:
              'Two Strings are printed: "The current time is 3 pm" and aThe mood is good"',
            value: "A",
          },
          {
            label: 'One Strings is printed: "The current time is 3 pm"',
            value: "B",
          },
          {
            label: "No String is printed",
            value: "C",
          },
          {
            label: "All of above are correct.",
            value: "D",
          },
        ],
      },
    },
  ],
};

export const DEMO_MD = convertCourseToMd(DEFAULT_QUIZ as any);
