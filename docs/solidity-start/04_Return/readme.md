---
title: 4. 函数输出
tags:
  - solidity
  - basic
  - wtfacademy
  - return
---

# Solidity极简入门: 4. 函数输出 return

<LessonProcess meta={require('./meta.json')} />

我最近在重新学solidity，巩固一下细节，也写一个“Solidity极简入门”，供小白们使用（编程大佬可以另找教程），每周更新1-3讲

推特：[@0xAA_Science](https://twitter.com/0xAA_Science)

社区：[Discord](https://discord.gg/5akcruXrsk)｜[微信群](https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link)｜[官网 wtf.academy](https://wtf.academy)

所有代码和教程开源在github: [github.com/AmazingAng/WTFSolidity](https://github.com/AmazingAng/WTFSolidity)

-----

这一讲，我们将介绍`Solidity`函数输出，包括：返回多种变量，命名式返回，以及利用解构式赋值读取全部和部分返回值。

## 返回值 return和returns
`Solidity`有两个关键字与函数输出相关：`return`和`returns`，他们的区别在于：
- `returns`加在函数名后面，用于声明返回的变量类型及变量名；
- `return`用于函数主体中，返回指定的变量。

```solidity
    // 返回多个变量
    function returnMultiple() public pure returns(uint256, bool, uint256[3] memory){
            return(1, true, [uint256(1),2,5]);
        }
```
上面这段代码中，我们声明了`returnMultiple()`函数将有多个输出：`returns(uint256, bool, uint256[3] memory)`，接着我们在函数主体中用`return(1, true, [uint256(1),2,5])`确定了返回值。

这里`uint256[3]`声明了一个长度为`3`且类型为`uint256`的数组作为返回值。因为`[1,2,3]`会默认为`uint8(3)`，因此`[uint256(1),2,5]`中首个元素必须强转`uint256`来声明该数组内的元素皆为此类型。数组类型返回值默认必须用memory修饰，在下一个章节会细说[变量的存储和作用域](../05_DataStorage/readme.md)。

## 命名式返回
我们可以在`returns`中标明返回变量的名称，这样`solidity`会自动给这些变量初始化，并且自动返回这些函数的值，不需要加`return`。

```solidity
    // 命名式返回
    function returnNamed() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array){
        _number = 2;
        _bool = false; 
        _array = [uint256(3),2,1];
    }
```
在上面的代码中，我们用`returns(uint256 _number, bool _bool, uint256[3] memory _array)`声明了返回变量类型以及变量名。这样，我们在主体中只需要给变量`_number`，`_bool`和`_array`赋值就可以自动返回了。

当然，你也可以在命名式返回中用`return`来返回变量：
```solidity
    // 命名式返回，依然支持return
    function returnNamed2() public pure returns(uint256 _number, bool _bool, uint256[3] memory _array){
        return(1, true, [uint256(1),2,5]);
    }
```
## 解构式赋值
`solidity`使用解构式赋值的规则，支持读取函数的全部或部分返回值。
- 读取所有返回值：声明变量，并且将要赋值的变量用`,`隔开，按顺序排列。
```solidity
        uint256 _number;
        bool _bool;
        uint256[3] memory _array;
        (_number, _bool, _array) = returnNamed();
```
- 读取部分返回值：声明要读取的返回值对应的变量，不读取的留空。下面这段代码中，我们只读取`_bool`，而不读取返回的`_number`和`_array`：
```solidity
        (, _bool2, ) = returnNamed();
```

## 在remix上验证
- 部署合约后查看三种返回方式的结果
![](./img/4-1.png)


## 总结
这一讲，我们介绍函数的返回值`return`和`returns`，包括：返回多种变量，命名式返回，以及利用解构式赋值读取全部和部分返回值。

<LessonQuizStart meta={require('./meta.json')} />

