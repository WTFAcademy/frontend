---
title: 03. 常量
tags:
  - huff
  - storage
  - FREE_STORAGE_POINTER
  - bytecode
---

# WTF Huff极简入门: 03. 常量

我最近在重新学Huff，巩固一下细节，也写一个“Huff极简入门”，供小白们使用（编程大佬可以另找教程），每周更新1-3讲。

推特：[@0xAA_Science](https://twitter.com/0xAA_Science)

社区：[Discord](https://discord.gg/5akcruXrsk)｜[微信群](https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link)｜[官网 wtf.academy](https://wtf.academy)

所有代码和教程开源在github: [github.com/AmazingAng/WTF-Huff](https://github.com/AmazingAng/WTF-Huff)

-----

这一讲，我们将介绍Huff中的常量和`constant`关键字。

## 常量

Huff的常量和Solidity中的相似，它们不会被包含在存储（storage）中，而是在编译时在合约内调用（包含在字节码中）。常量可以是最多32字节的数据或是`FREE_STORAGE_POINTER()`关键字（代表合约中尚未使用的存储槽）。

### 声明常量

你可以使用`constant`关键字在合约中声明常量：

```c
#define constant NUM = 0x69
#define constant STORAGE_SLOT0 = FREE_STORAGE_POINTER()
```

### 使用常量

你可以使用括号表示法`[CONSTANT]`将常量压入堆栈。

```c
#define macro MAIN() = takes(0) returns(0) {
    [NUM]             // [0x69] 
    [STORAGE_SLOT0]         // [value_slot0_pointer, 0x69]
    sstore          // []
}
```

在上面的`MAIN()`宏中，我们将常量`NUM`（值为`0x69`）和`STORAGE_SLOT0`（值为`0`）压入堆栈，然后使用`sstore`指令将`0x69`存入存储槽`0`。

## 分析合约字节码

我们可以使用`huffc`命令获取上面合约的runtime code:

```shell
huffc src/03_Constant.huff -r
```

打印出的bytecode为：

```
60695f55
```

转换成格式化的表格：

| pc   | op     | opcode         | stack              |
|------|--------|----------------|--------------------|
| [00] | 60 69  | PUSH1 0x69     | 0x69               |
| [02] | 5f     | PUSH0          | 0 0x69             | 
| [03] | 55     | SSTORE         |                    |

我们可以看到，这个合约做的就是使用`SSTORE`指令将`0x69`存储在存储槽`0`中。

## 总结

这一讲，我们介绍了Huff中的常量和`constant`关键字。常量不会占用存储，而是会在编译时被调用。