---
title: 07. 接口
tags:
  - huff
  - interface
  - bytecode
---

# WTF Huff极简入门: 07. 接口

我最近在重新学Huff，巩固一下细节，也写一个“Huff极简入门”，供小白们使用（编程大佬可以另找教程），每周更新1-3讲。

推特：[@0xAA_Science](https://twitter.com/0xAA_Science)

社区：[Discord](https://discord.gg/5akcruXrsk)｜[微信群](https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link)｜[官网 wtf.academy](https://wtf.academy)

所有代码和教程开源在github: [github.com/AmazingAng/WTF-Huff](https://github.com/AmazingAng/WTF-Huff)

-----

这一讲，我们将介绍Huff中的接口，它可以用来生成Solidity接口合约/ABI，并且方便我们在合约中使用函数选择器（function selector）和事件哈希（event hash）。

## 接口

类似Solidity，你可以在Huff合约的接口中定义函数`functions`，事件`events`，和错误`errors`。接口主要有两个作用：

1. 定义接口后，函数名可以用作内置函数`__FUNC_SIG`（获取函数选择器），`__EVENT_HASH`（事件选择器），和`__ERROR`（错误选择器）的参数
2. 生成 Solidity 接口/合约 ABI。

接口中的函数可以是`view`、`pure`、`payable`或`nonpayable`类型。并且，只有外部可见的函数需要在接口中定义，内部函数不需要。接口中的事件可以包含索引值（使用`indexed`关键字）和非索引值。

Huff接口的例子：

```c
#define function testFunction(uint256, bytes32) view returns (bytes memory)

#define event TestEvent(address indexed, uint256)
```

## Simple Store合约

现在，让我们重温第一讲中介绍的`Simple Store`合约。学到这里，你应该能看懂它了。

我们把合约分为两部分，第一部分定义了合约的接口，存储槽，并用宏实现了接口中定义的`SET_VALUE()`和`GET_VALUE`方法。

- `SET_VALUE()`: 先使用`calldataload`从`calldata`读出了新值，然后使用`sstore`将值保存在存储槽`VALUE_LOCATION`中。注意，第一行`0x04 calldataload`读取值的时候略去了前`4`字节，因为它们是函数选择器。

- `GET_VALUE()`: 先使用`sload`读取存储槽`VALUE_LOCATION`的值，使用`mstore`将值存入内存，再使用`return`返回。

> 注意，一定要确保每个方法被正确的结束，代码以`return`，`revert`，`stop`，`invalid`指令结尾，不然可能会有漏洞。

```c
/* 接口 */
#define function setValue(uint256) nonpayable returns ()
#define function getValue() view returns (uint256)

/* 存储槽位 */
#define constant VALUE_LOCATION = FREE_STORAGE_POINTER()

/* 方法 */
#define macro SET_VALUE() = takes (0) returns (0) {
    0x04 calldataload   // [value]
    [VALUE_LOCATION]    // [ptr, value]
    sstore              // []
    stop                // []
}

#define macro GET_VALUE() = takes (0) returns (0) {
    // 从存储中加载值
    [VALUE_LOCATION]   // [ptr]
    sload                // [value]

    // 将值存入内存
    0x00 mstore

    // 返回值
    0x20 0x00 return
}
```

第二部分是Main宏，合约的主入口，判断外部调用的是哪个函数。

```c
// 合约的主入口，判断调用的是哪个函数
#define macro MAIN() = takes (0) returns (0) {
    // 通过selector判断要调用哪个函数
    0x00 calldataload 0xE0 shr
    dup1 __FUNC_SIG(setValue) eq set jumpi
    dup1 __FUNC_SIG(getValue) eq get jumpi
    // 如果没有匹配的函数，就revert
    0x00 0x00 revert

    set:
        SET_VALUE()
    get:
        GET_VALUE()
}
```

1. 第一行，我们使用`0x00 calldataload 0xE0 shr`读取`calldata`中前`4`字节，也就是函数选择器。这段代码我们会经常使用，你可以想一想它是怎么工作的。

2. 获取`selector`后，我们要通过比对`setValue()`和`getValue()`进行跳转，如果没有匹配的函数，则`revert`。由于我们在接口中定义了这两个函数，我们可以使用内置函数`__FUNC_SIG()`获取他们的`selector`并推入堆栈，然后使用`eq`进行比对。不然的话，就要使用`__FUNC_SIG("function setValue(uint256) nonpayable returns ()")`，很繁琐。

3. 在`set`和`get`两个跳转标签之后，我们分别运行`SET_VALUE()`和`GET_VALUE()`方法，执行相应的逻辑。

## 输出Solidity接口/ABI

我们可以使用`huffc -g`命令将Huff合约的接口转为Solidity合约接口/ABI:

```shell
huffc src/07_Interface.huff -g
```

输出的接口将保存在和`07_Interface.huff`相同的文件夹下，例如`src/I07_Iterface.sol`，内容：

```solidity
interface I07_Interface {
	function getValue() external view returns (uint256);
	function setValue(uint256) external;
}
```

## 分析合约字节码

我们可以使用`huffc`命令获取上面合约的runtime code:

```shell
huffc src/07_Interface.huff -r
```

打印出的bytecode为：

```
5f3560e01c8063552410771461001e5780632096525514610025575f5ffd5b6004355f55005b5f545f5260205ff3
```

转换成格式化的表格：

| pc   | op     | opcode         | stack              |
|------|--------|----------------|--------------------|
| [00] | 5f     | PUSH0          | 0x00               |
| [01] | 35     | CALLDATALOAD   | calldata           |
| [02] | 60e0 | PUSH1 0xE0     | 0xE0 calldata      |
| [04] | 1c     | SHR            | selector           |
| [05] | 80     | DUP1           | selector selector |
| [06] | 63 55241077 | PUSH4 0x55241077 | 0x55241077 selector selector |
| [0a] | 14     | EQ             | suc selector  |
| [0b] | 61 001e| PUSH2 0x001E   | 0x001E suc selector |
| [0e] | 57     | JUMPI          | selector      |
| [0f] | 80     | DUP1           | selector selector |
| [10] | 63 209652 | PUSH4 0x20965255 | 0x20965255 selector selector |
| [14] | 14     | EQ             | suc selector  |
| [15] | 61 0024| PUSH2 0x0024   | 0x0024 suc selector |
| [18] | 57     | JUMPI          | selector      |
| [19] | 5f     | PUSH0          | 0x00 selector              |
| [1a] | 5f     | PUSH0          | 0x00 0x00 selector          |
| [1b] | fd     | REVERT         | selector                   |
| [1c] | 5b     | JUMPDEST       | selector                   |
| [1d] | 60 04  | PUSH1 0x04     | 0x04 selector              |
| [1f] | 35     | CALLDATALOAD   | calldata@0x04 selector           |
| [20] | 5f     | PUSH0          | 0x00 calldata@0x04 selector     |
| [21] | 55     | SSTORE         | selector                |
| [22] | 00     | STOP           | selector                |
| [23] | 5b     | JUMPDEST       | selector                   |
| [24] | 5f     | PUSH0          | 0x00 selector              |
| [25] | 54     | SLOAD          | value selector             |
| [26] | 5f     | PUSH0          | 0x00 value selector        |
| [27] | 52     | MSTORE         | selector                   |
| [28] | 60 20  | PUSH1 0x20     | 0x20 selector               |
| [2a] | 5f     | PUSH0          | 0x00 0x20 selector         |
| [2b] | f3     | RETURN         | selector                  |

我们可以看到，这段字节码的功能：

1. 使用`CALLDATALOAD`从`calldata`中读取值，然后使用`SHR`获取前`4`字节的函数选择器。
2. 用`EQ`对比`calldata`中的函数选择器是否为`0x55241077`或`0x20965255`，若匹配，则将PC跳转到相应的`JUMPDEST`，执行`SET_VALUE()`或`GET_VALUE()`方法。


## 总结

这一讲，我们介绍了Huff中的接口，它可以用来生成Solidity接口合约/ABI，并且方便我们在合约中使用函数选择器和事件哈希。