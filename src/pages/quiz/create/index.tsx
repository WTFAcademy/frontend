import Editor from "@site/src/components/editor";
import Layout from "@theme/Layout";
import React, {useState} from "react";
import PreviewForm from "@site/src/components/quiz-form/Preview";
import {IQuiz} from "@site/src/typings/quiz";


const quizzes: IQuiz[] = [{
    title: 'What happens when you call `__string()?`',
    meta: {
        type: 'select',
        index: 1,
        answer: ['A']
    },
    content: {
        extend: [{
            type:'paragraph',
            raw:`![](https://avatars.githubusercontent.com/u/20828177?v=4)`
        },{
            type:'code',
            raw:    `
        // 用户领取代币函数
        function requestTokens() external {
            require(requestedAddress[msg.sender] == false, "Can't Request Multiple Times!"); // 每个地址只能领一次
            IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象
            require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了

            token.transfer(msg.sender, amountAllowed); // 发送token
            requestedAddress[msg.sender] = true; // 记录领取地址
            emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件
        }`
        }],
        options: [
            {label: 'Two Strings are printed: `"The current time is 3 pm"` and aThe mood is good"', value: 'A'},
            {label: 'One Strings is printed: `"The current time is 3 pm"`', value: 'B'},
            {label: 'No String is printed', value: 'C'},
            {label: 'All of above are correct.', value: 'D'},
        ]
    }
},
    {
        title: 'What happens when you call `__string()?`',
        meta: {
            type: 'multiple-select',
            index: 1,
            answer: ['A','B','C']
        },
        content: {
            extend: [{
                type:'paragraph',
                raw:`![](https://avatars.githubusercontent.com/u/20828177?v=4)`
            },{
                type:'code',
                raw:    `
        // 用户领取代币函数
        function requestTokens() external {
            require(requestedAddress[msg.sender] == false, "Can't Request Multiple Times!"); // 每个地址只能领一次
            IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象
            require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了

            token.transfer(msg.sender, amountAllowed); // 发送token
            requestedAddress[msg.sender] = true; // 记录领取地址
            emit SendToken(msg.sender, amountAllowed); // 释放SendToken事件
        }`
            }],
            options: [
                {label: 'Two Strings are printed: `"The current time is 3 pm"` and aThe mood is good"', value: 'A'},
                {label: 'One Strings is printed: `"The current time is 3 pm"`', value: 'B'},
                {label: 'No String is printed', value: 'C'},
                {label: 'All of above are correct.', value: 'D'},
            ]
        }
    },
    {
        title: 'What happens when you call `__string()?`',
        meta: {
            type: 'inset',
            index: 1,
            answer: ['B','A','C']
        },
        content: {
            extend: [{
                type:'paragraph',
                raw:`![](https://avatars.githubusercontent.com/u/20828177?v=4)<<!!>>`
            },{
                type:'code',
                raw:    `
        // 用户领取代币函数
        function requestTokens() external {
            require(requestedAddress[msg.sender] == false, "Can't Request Multiple Times!"); // 每个地址只能领一次
            IERC20 token = IERC20(tokenContract); // 创建IERC20合约对象
            require(token.balanceOf(address(this)) >= amountAllowed, "Faucet Empty!"); // 水龙头空了

            token.transfer(123, amountAllowed); // 发送token
            requestedAddress[msg.sender] = <<!!>>; // 记录领取地址
            emit SendToken(msg.sender, <<!!>>); // 释放SendToken事件
        }`
            }],
            options: [
                {label: 'msg.sender', value: 'A'},
                {label: 'true', value: 'B'},
                {label: 'amountAllowed', value: 'C'},
            ]
        }
    },
]


const QuizCreate = () => {
    const [quiz, setQuiz] = useState(quizzes);
    const handleChange = (quiz) => {
        setQuiz(quiz)
    }

    return (
        <Layout
            title={`Hello from`}
            description="Description will go into a meta tag in <head />"
            noFooter
        >
            <div className="flex">
                <Editor className="flex-1" onChange={handleChange} />
                <div className="flex-1 flex flex-col">
                    <PreviewForm quizzes={quiz} />
                </div>
            </div>
        </Layout>
    )
}


export default QuizCreate;
