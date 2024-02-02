---
title: 08. 事件
tags:
  - huff
  - interface
  - event
  - bytecode
---

# WTF Huff极简入门: 08. 事件

我最近在重新学Huff，巩固一下细节，也写一个“Huff极简入门”，供小白们使用（编程大佬可以另找教程），每周更新1-3讲。

推特：[@0xAA_Science](https://twitter.com/0xAA_Science)

社区：[Discord](https://discord.gg/5akcruXrsk)｜[微信群](https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link)｜[官网 wtf.academy](https://wtf.academy)

所有代码和教程开源在github: [github.com/AmazingAng/WTF-Huff](https://github.com/AmazingAng/WTF-Huff)

-----

这一讲，我们将介绍Huff中的事件，和Solidity中的事件一样，它可以将数据存储在`EVM`的日志中。

## 事件

在Solidity中，我们常常使用`event`来定义和触发事件。当这些事件被触发时，它们会生成日志，将数据永久存储在区块链上。日志分为主题（`topic`）和数据（`data`）。第一个主题通常是事件签名的哈希值，后面的主题是由`indexed`修饰的事件参数。如果你对`event`不了解，请阅读WTF Solidity的[相应章节](https://github.com/AmazingAng/WTF-Solidity/tree/main/12_Event)。

EVM中的`LOG`指令用于创建这些日志。指令`LOG0`到`LOG4`的区别在于它们包含的主题数量。例如，`LOG0`没有主题，而`LOG4`有四个主题。如果你不了解它们，请阅读[WTF EVM Opcodes第15讲](https://github.com/WTFAcademy/WTF-EVM-Opcodes/blob/main/15_LogOp/readme.md)。

## Huff中的事件

下面我们改造上一讲的`Simple Store`合约，在调用`SET_VALUE()`方法改变值的时候，会释放一个`ValueChanged`事件，将新值记录到EVM日志中。

首先你可以在Huff接口中定义合约的事件：

```c
#define event ValueChanged(uint256 indexed)
```

接下来我们在`SET_VALUE()`方法中释放`ValueChanged`事件。首先，要确定我们要用哪个`LOG`指令来释放事件。因为我们事件只有一个被索引的数据，再加上事件哈希，就是`2`个主题，应使用`log2`，输入堆栈为`[0, 0, sig, value]`。接下来，我们只需要在方法中构造所需的堆栈，再在结尾使用`log2`输出日志即可。我们可以使用内置函数`__EVENT_HASH()`将事件哈希压入堆栈。

```c
#define macro SET_VALUE() = takes (0) returns (0) {
    0x04 calldataload   // [value]
    dup1                // [value, value]
    [VALUE_LOCATION]    // [ptr, value, value]
    sstore              // [value]
    // 释放事件
    __EVENT_HASH(ValueChanged) // [sig, value]
    push0 push0         // [0, 0, sig, value]
    log2                // []
    stop                // []
}
```

## 输出Solidity接口/ABI

我们可以使用`huffc -g`命令将Huff合约的接口转为Solidity合约接口/ABI:

```shell
huffc src/08_Event.huff -g
```

输出的接口将保存在和`08_Event.huff`相同的文件夹下，例如`src/I08_Event.sol`。可以看到，我们定义的事件已经被包含在接口中：

```solidity
interface I08_Event {
	event ValueChanged(uint256 indexed);
	function getValue() external view returns (uint256);
	function setValue(uint256) external;
}
```

## 分析合约字节码

我们可以使用`huffc`命令获取上面合约的runtime code:

```shell
huffc src/08_Events.huff -r
```

打印出的bytecode为：

```
5f3560e01c8063552410771461001e578063209652551461004a575f5ffd5b600435805f557fd9ce50fb8c432a73c4ed7e62e6128c95e62f29d3ee56042781a0368f192ccdb45f5fa2005b5f545f5260205ff3
```

转换成格式化的表格（后半部分在`stack`中省略了一个用不上的`selector`）：

| pc   | op         | opcode                   | stack                          |
|------|------------|--------------------------|--------------------------------|
| [00] | 5f         | PUSH0                    | 0x00                           |
| [01] | 35         | CALLDATALOAD             | calldata                       |
| [02] | 60 e0      | PUSH1 0xE0               | 0xE0 calldata                  |
| [04] | 1c         | SHR                      | selector                       |
| [05] | 80         | DUP1                     | selector selector              |
| [06] | 63 55241077| PUSH4 0x55241077         | 0x55241077 selector selector   |
| [0a] | 14         | EQ                       | suc selector                   |
| [0b] | 61 001e    | PUSH2 0x001E             | 0x001E suc selector            |
| [0e] | 57         | JUMPI                    | selector                       |
| [0f] | 80         | DUP1                     | selector selector              |
| [10] | 63 209652  | PUSH4 0x20965255         | 0x20965255 selector selector   |
| [14] | 14         | EQ                       | suc selector                   |
| [15] | 61 0049    | PUSH2 0x0049             | 0x0049 suc selector            |
| [18] | 57         | JUMPI                    | selector                       |
| [19] | 5f         | PUSH0                    | 0x00                           |
| [1a] | 5f         | PUSH0                    | 0x00 0x00                      |
| [1b] | fd         | REVERT                   |                                |
| [1c] | 5b         | JUMPDEST                 |                                |
| [1d] | 60 04      | PUSH1 0x04               | 0x04                           |
| [1f] | 35         | CALLDATALOAD             | calldata@0x04                  |
| [20] | 5f         | PUSH0                    | 0x00 calldata@0x04             |
| [21] | 55         | SSTORE                   |                                |
| [22] | 5b         | JUMPDEST                 |                                |
| [23] | 60 04      | PUSH1 0x04               | 0x04                           |
| [25] | 35         | CALLDATALOAD             | calldata@0x04                  |
| [26] | 80         | DUP1                     | calldata@0x04 calldata@0x04    |
| [27] | 5f         | PUSH0                    | 0x00 calldata@0x04 calldata@0x04 |
| [28] | 55         | SSTORE                   | calldata@0x04                  |
| [29] | 7f d9ce50. | PUSH32 0xd9ce50..        | 0xd9ce50.. calldata@0x04       |
| [46] | 5f         | PUSH0                    | 0x00 0xd9ce50 calldata@0x04    |
| [47] | 5f         | PUSH0                    | 0x00 0x00 0xd9ce50 calldata@0x04 |
| [48] | a2         | LOG2                     |                                |
| [49] | 00         | STOP                     |                                |
| [4a] | 5b         | JUMPDEST                 |                                |
| [4b] | 5f         | PUSH0                    | 0x00                           |
| [4c] | 54         | SLOAD                    | value                          |
| [4d] | 5f         | PUSH0                    | 0x00 value                     |
| [4e] | 52         | MSTORE                   |                                |
| [4f] | 60 20      | PUSH1 0x20               | 0x20                           |
| [51] | 5f         | PUSH0                    | 0x00 0x20                      |
| [52] | f3         | RETURN                   |                                |

其中，`[22]-[49]`是`SET_VALUE()`方法的字节码。我们可以看到，这段代码在准备好堆栈`[0x00 0x00 0xd9ce50 calldata@0x04]`之后，使用`log2`释放事件。

## 总结

这一讲，我们介绍了Huff中的事件，它与Solidity的事件一样，可以将数据记录在EVM日志中。Huff提供了内置方法`__EVENT_HASH()`，方便我们计算事件哈希并将它压入堆栈。