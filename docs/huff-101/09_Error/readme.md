---
title: 09. Error
tags:
  - huff
  - interface
  - error
  - bytecode
---

# WTF Huff极简入门: 09. Error

我最近在重新学Huff，巩固一下细节，也写一个“Huff极简入门”，供小白们使用（编程大佬可以另找教程），每周更新1-3讲。

推特：[@0xAA_Science](https://twitter.com/0xAA_Science)

社区：[Discord](https://discord.gg/5akcruXrsk)｜[微信群](https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link)｜[官网 wtf.academy](https://wtf.academy)

所有代码和教程开源在github: [github.com/AmazingAng/WTF-Huff](https://github.com/AmazingAng/WTF-Huff)

-----

Huff允许你在合约自定义错误`Error`，这一讲我们将介绍它。

## Error

Solidity中有三种抛出异常的方法`error`，`require`和`assert`，他们都是基于`EVM`的`revert`指令。在Huff中，我们可以直接使用`revert`指令来抛出错误并返回错误信息。

### 定义错误

你可以在合约接口中定义错误：

```c
/* 接口 */
#define function getError() view returns (uint256)
#define error CustomError(uint256)
```

### 使用错误

在方法中，你可以使用内置函数`__ERROR()`将错误选择器（error selector）推到堆栈上。

```c
#define macro GET_ERROR() = takes (0) returns (0) {
    __ERROR(PanicError)   // [panic_error_selector, panic_code]
    0x00 mstore           // [panic_code]
    0x04 mstore           // []
    0x24 0x00 revert
}
```

然后我们写一个Main宏作为合约的入口：

```c
// 合约的主入口，判断调用的是哪个函数
#define macro MAIN() = takes (0) returns (0) {
    // 通过selector判断要调用哪个函数
    0x00 calldataload 0xE0 shr
    dup1 __FUNC_SIG(GET_ERROR) eq get_error jumpi
    // 如果没有匹配的函数，就revert
    0x00 0x00 revert

    get_error:
        GET_ERROR()
}
```

## 分析合约字节码

我们可以使用`huffc`命令获取上面合约的runtime code:

```shell
huffc src/09_Error.huff -r
```

打印出的bytecode为：

```
5f3560e01c8063ee23e35814610013575f5ffd5b60697f110b3655000000000000000000000000000000000000000000000000000000005f5260045260245ffd
```

转换成格式化的表格（后半部分在`stack`中省略了一个用不上的`selector`）：

| pc   | op         | opcode                   | stack                             |
|------|------------|--------------------------|-----------------------------------|
| [00] | 5f         | PUSH0                    | 0x00                              |
| [01] | 35         | CALLDATALOAD             | calldata                          |
| [02] | 60 e0      | PUSH1 0xE0               | 0xE0 calldata                     |
| [04] | 1c         | SHR                      | selector                          |
| [05] | 80         | DUP1                     | selector selector                 |
| [06] | 63 ee23e358| PUSH4 0xEE23E358         | 0xEE23E358 selector selector      |
| [0b] | 14         | EQ                       | suc selector                      |
| [0c] | 61 0013    | PUSH2 0x0013             | 0x0013 suc selector               |
| [0f] | 57         | JUMPI                    | selector                          |
| [10] | 5f         | PUSH0                    | 0x00 selector                     |
| [11] | 5f         | PUSH0                    | 0x00 0x00 selector                |
| [12] | fd         | REVERT                   | selector                          |
| [13] | 5b         | JUMPDEST                 |                                   |
| [14] | 60 69      | PUSH1 0x69               | 0x69                              |
| [16] | 7f 0x110b... | PUSH32 0x110b...       | 0x69  0x110b...                   |
| [2d] | 5f         | PUSH0                    | 0x00 0x69  0x110b...              |
| [2e] | 52         | MSTORE                   | 0x110b...                         |
| [2f] | 60 04      | PUSH1 0x04               | 0x04 0x110b...                    |
| [31] | 52         | MSTORE                   |                                   |
| [32] | 60 24      | PUSH1 0x24               | 0x24                              |
| [34] | 5f         | PUSH0                    | 0x00 0x24                         |
| [35] | fd         | REVERT                   |                                   |

从`[16]`可以看到，目前内置函数`__ERROR`并没有被优化的很好，因为它会先计算出`4`字节的`error selector`（此处为`0x110b3655`），然后再将它转换为`32`字节的数据（右填充`0`，变为`110b365500000000000000000000000000000000000000000000000000000000`），最后使用`PUSH32`压入堆栈。但实际上，我们需要的只是前`4`字节，这样造成了gas浪费。

## 总结

这一讲，我们介绍了如何在Huff中自定义错误并使用它。Huff提供了内置函数`__ERROR`来获取错误选择器，但它没有被很好的优化。