---
title: 02. 存储
tags:
  - huff
  - storage
  - FREE_STORAGE_POINTER
  - bytecode
---

# WTF Huff极简入门: 02. 存储

我最近在重新学Huff，巩固一下细节，也写一个“Huff极简入门”，供小白们使用（编程大佬可以另找教程），每周更新1-3讲。

推特：[@0xAA_Science](https://twitter.com/0xAA_Science)

社区：[Discord](https://discord.gg/5akcruXrsk)｜[微信群](https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link)｜[官网 wtf.academy](https://wtf.academy)

所有代码和教程开源在github: [github.com/AmazingAng/WTF-Huff](https://github.com/AmazingAng/WTF-Huff)

-----

这一讲，我们将介绍Huff中的存储，特别是`FREE_STORAGE_POINTER`关键字。

## Huff中的存储

EVM中的存储（storage）是一种持久化存储空间，存在其中的数据在交易之间可以保持。它是EVM状态的一部分，支持以256 bit为单位的读写。

![](./img/2-1.png)

### 声明存储槽

Huff中的存储并不复杂，可以通过`FREE_STORAGE_POINTER()`关键字来跟踪合约中未使用的存储槽（free storage）。下面，我们声明了`2`个存储槽`STORAGE_SLOT0`和`STORAGE_SLOT1`：

```c
#define constant STORAGE_SLOT0 = FREE_STORAGE_POINTER()
#define constant STORAGE_SLOT1 = FREE_STORAGE_POINTER()
```

EVM的存储使用键值对存储数据，存储槽是其中的键。在Huff中，编译器将在编译时从0开始分配自由存储槽。在上面的例子中，会将`0`分配给`STORAGE_SLOT0`，将`1`分配给`STORAGE_SLOT1`。

## 使用存储槽

我们可以通过将存储槽括在方括号中来在代码中引用该槽 - 就像这样`[STORAGE_SLOT0]`。在下面的代码中，我们在`MAIN()`宏中将`0x69`存入`STORAGE_SLOT0`，然后将`0x420`存入`STORAGE_SLOT1`。

```c
#define macro MAIN() = takes(0) returns(0) {
    0x69             // [0x69] 
    [STORAGE_SLOT0]         // [value_slot0_pointer, 0x69]
    sstore          // []

    0x420             // [0x420] 
    [STORAGE_SLOT1]         // [value_slot1_pointer, 0x420]
    sstore          // []
}
```

## 分析合约字节码

我们可以使用`huffc`命令获取上面合约的runtime code:

```shell
huffc src/02_Storage.huff -r
```

打印出的bytecode为：

```
60695f55610420600155
```

直接看字节码可能有些令人头大，我们将它转换成下面的表格：

| pc   | op     | opcode         | stack              |
|------|--------|----------------|--------------------|
| [00] | 60 69  | PUSH1 0x69     | 0x69               |
| [02] | 5f     | PUSH0          | 0 0x69                  | 
| [03] | 55     | SSTORE         |                    |
| [04] | 61 0420     | PUSH2 0x420        | 0x0420             |
| [07] | 60 01   | PUSH1 0x01         | 0x01               |
| [09] | 55     | SSTORE         |                    |

可以看到，字节码用了两次`SSTORE`，分别将`0x69`和`0x420`存入存储槽`0`和`1`。

## 总结

这一讲，我们介绍了如何在Huff中使用存储，特别是`FREE_STORAGE_POINTER()`关键字，它可以跟踪合约中未使用的存储槽，并在编译时分配它们。