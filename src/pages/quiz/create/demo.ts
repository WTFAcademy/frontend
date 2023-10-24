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
