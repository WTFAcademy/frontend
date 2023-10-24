export const TABS = [
  {
    value: "1",
    label: "My Quiz",
  },
  {
    value: "2",
    label: "Alex2",
  },
  {
    value: "3",
    label: "Alex3",
  },
  {
    value: "4",
    label: "Alex4",
  },
  {
    value: "5",
    label: "Alex5",
  },
  {
    value: "6",
    label: "Alex6",
  },
  {
    value: "7",
    label: "Alex7",
  },
  {
    value: "8",
    label: "Alex8",
  },
  {
    value: "9",
    label: "Alex9",
  },
  {
    value: "10",
    label: "Alex10",
  },
  {
    value: "11",
    label: "Alex11",
  },
  {
    value: "12",
    label: "Alex12",
  },
  {
    value: "13",
    label: "Alex13",
  },
];

export const DEFAULT_VALUE = `---
quiz_id: 00
course_id: 100
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


---
quiz_id: 01
course_id: 101
---

## What happens when you call \`__string()\` ?
> {index: 1, type: 'inset', answer: ['A']}

![图片](https://avatars.githubusercontent.com/u/20828177?v=4)

\`\`\`solidity
    // 用户领取代币函数
    function requestTokens() external {
        require(requestedAddress[msg.sender] == false, "Can't Request Multiple Times!"); // 每个地址只能领一次
        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象
        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了

        token.transfer(msg.sender, <<!!>>); // 发送token
        requestedAddress[msg.sender] = <<!!>>; // 记录领取地址
        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件
    }
\`\`\`

- (A) amountAllowed
- (B) true
- (C) true
- (D) true
- (E) true
- (F) true
- (G) true
---
quiz_id: 00
course_id: 100
---

## What happens when you call \`__string()\` ?
> {index: 1, type: 'multiple-select', answer: ['A','B']}

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

export const DEFAULT_QUIZZES = [
  {
    title: "quiz_id: 00\ncourse_id: 100\n---\n\n",
  },
  {
    title: "## What happens when you call `__string()` ?\n",
    meta: {
      index: 0,
      type: "select",
      answer: ["A"],
    },
    content: {
      extend: [
        {
          type: "paragraph",
          raw: "![图片](https://avatars.githubusercontent.com/u/20828177?v=4)",
          text: "![图片](https://avatars.githubusercontent.com/u/20828177?v=4)",
          tokens: [
            {
              type: "image",
              raw: "![图片](https://avatars.githubusercontent.com/u/20828177?v=4)",
              href: "https://avatars.githubusercontent.com/u/20828177?v=4",
              title: null,
              text: "图片",
            },
          ],
          start: {
            line: 12,
            column: 0,
          },
          end: {
            line: 12,
            column: 59,
          },
        },
        {
          type: "space",
          raw: "\n\n",
          start: {
            line: 13,
            column: 0,
          },
          end: {
            line: 15,
            column: 0,
          },
        },
        {
          type: "code",
          raw: '```solidity\n    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, amountAllowed); // 发送token\n        requestedAddress[msg.sender] = true; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }\n```',
          lang: "solidity",
          text: '    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, amountAllowed); // 发送token\n        requestedAddress[msg.sender] = true; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }',
          start: {
            line: 16,
            column: 0,
          },
          end: {
            line: 27,
            column: 3,
          },
        },
        {
          type: "space",
          raw: "\n\n",
          start: {
            line: 28,
            column: 0,
          },
          end: {
            line: 30,
            column: 0,
          },
        },
        {
          type: "space",
          raw: "\n\n\n",
          start: {
            line: 35,
            column: 0,
          },
          end: {
            line: 38,
            column: 0,
          },
        },
        {
          type: "hr",
          raw: "---\n",
          start: {
            line: 39,
            column: 0,
          },
          end: {
            line: 40,
            column: 0,
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
    title: "quiz_id: 01\ncourse_id: 101\n---\n\n",
  },
  {
    title: "## What happens when you call `__string()` ?\n",
    meta: {
      index: 1,
      type: "inset",
      answer: ["A"],
    },
    content: {
      extend: [
        {
          type: "paragraph",
          raw: "![图片](https://avatars.githubusercontent.com/u/20828177?v=4)",
          text: "![图片](https://avatars.githubusercontent.com/u/20828177?v=4)",
          tokens: [
            {
              type: "image",
              raw: "![图片](https://avatars.githubusercontent.com/u/20828177?v=4)",
              href: "https://avatars.githubusercontent.com/u/20828177?v=4",
              title: null,
              text: "图片",
            },
          ],
          start: {
            line: 51,
            column: 0,
          },
          end: {
            line: 51,
            column: 59,
          },
        },
        {
          type: "space",
          raw: "\n\n",
          start: {
            line: 52,
            column: 0,
          },
          end: {
            line: 54,
            column: 0,
          },
        },
        {
          type: "code",
          raw: '```solidity\n    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, <<!!>>); // 发送token\n        requestedAddress[msg.sender] = <<!!>>; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }\n```',
          lang: "solidity",
          text: '    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, <<!!>>); // 发送token\n        requestedAddress[msg.sender] = <<!!>>; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }',
          start: {
            line: 55,
            column: 0,
          },
          end: {
            line: 66,
            column: 3,
          },
        },
        {
          type: "space",
          raw: "\n\n",
          start: {
            line: 67,
            column: 0,
          },
          end: {
            line: 69,
            column: 0,
          },
        },
        {
          type: "hr",
          raw: "---\n",
          start: {
            line: 78,
            column: 0,
          },
          end: {
            line: 79,
            column: 0,
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
    title: "quiz_id: 00\ncourse_id: 100\n---\n\n",
  },
  {
    title: "## What happens when you call `__string()` ?\n",
    meta: {
      index: 2,
      type: "multiple-select",
      answer: ["A", "B"],
    },
    content: {
      extend: [
        {
          type: "paragraph",
          raw: "![图片](https://avatars.githubusercontent.com/u/20828177?v=4)",
          text: "![图片](https://avatars.githubusercontent.com/u/20828177?v=4)",
          tokens: [
            {
              type: "image",
              raw: "![图片](https://avatars.githubusercontent.com/u/20828177?v=4)",
              href: "https://avatars.githubusercontent.com/u/20828177?v=4",
              title: null,
              text: "图片",
            },
          ],
          start: {
            line: 90,
            column: 0,
          },
          end: {
            line: 90,
            column: 59,
          },
        },
        {
          type: "space",
          raw: "\n\n",
          start: {
            line: 91,
            column: 0,
          },
          end: {
            line: 93,
            column: 0,
          },
        },
        {
          type: "code",
          raw: '```solidity\n    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, amountAllowed); // 发送token\n        requestedAddress[msg.sender] = true; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }\n```',
          lang: "solidity",
          text: '    // 用户领取代币函数\n    function requestTokens() external {\n        require(requestedAddress[msg.sender] == false, "Can\'t Request Multiple Times!"); // 每个地址只能领一次\n        IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象\n        require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了\n\n        token.transfer(msg.sender, amountAllowed); // 发送token\n        requestedAddress[msg.sender] = true; // 记录领取地址\n        emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件\n    }',
          start: {
            line: 94,
            column: 0,
          },
          end: {
            line: 105,
            column: 3,
          },
        },
        {
          type: "space",
          raw: "\n\n",
          start: {
            line: 106,
            column: 0,
          },
          end: {
            line: 108,
            column: 0,
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
];
