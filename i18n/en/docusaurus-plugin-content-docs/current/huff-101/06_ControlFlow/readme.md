---
title: 06. 控制流
tags:
  - huff
  - control flow
  - jumpi
  - jumpdest
  - bytecode
---

# WTF Huff极简入门: 06. 控制流

我最近在重新学Huff，巩固一下细节，也写一个“Huff极简入门”，供小白们使用（编程大佬可以另找教程），每周更新1-3讲。

推特：[@0xAA_Science](https://twitter.com/0xAA_Science)

社区：[Discord](https://discord.gg/5akcruXrsk)｜[微信群](https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link)｜[官网 wtf.academy](https://wtf.academy)

所有代码和教程开源在github: [github.com/AmazingAng/WTF-Huff](https://github.com/AmazingAng/WTF-Huff)

-----

这一讲，我们将介绍Huff中的控制流，包括跳转标签和`JUMPDEST`指令。

## 控制流

EVM底层主要是使用跳转指令`JUMP`，`JUMPI`，和`JUMPDEST`进行代码的流程控制。如果你对它们不了解，建议阅读[WTF EVM Opcodes教程第9讲](https://github.com/WTFAcademy/WTF-EVM-Opcodes/tree/main/09_FlowOp)。

为了方便开发者使用跳转指令，Huff提供了跳转标签，可以在宏或函数哪定义，由冒号后跟一个单词表示。注意，虽然看起来标签是由于缩进而作为代码块的作用域，但它们实际上只是字节码中的跳转目的地。如果标签下面存在操作，除非程序计数器被更改或执行由`revert`、`return`、`stop`或`selfdestruct`操作码中断，否则它们将被执行。

```
#define macro MAIN() = takes (0) returns (0) {
    // 从 calldata 读取值
    0x00 calldataload        // [calldata @ 0x00]
    0 eq
    jump_one jumpi

    // 如果到达此点，则revert
    0x00 0x00 revert

    // 跳转标签1
    jump_one:
        jump_two jump
        // 如果到达此点，则revert
        0x00 0x00 revert

    // 跳转标签2
    jump_two:
        0x00 0x00 return
}
```

在合约中，`Main`宏先会读取调用的`calldata`，如果为`0`，则先跳转到`jump_one`，接着跳转到`jump_two`；如果不为`0`，则不会跳转，继续运行到`revert`回滚交易。

## 分析合约字节码

我们可以使用`huffc`命令获取上面合约的runtime code:

```shell
huffc src/06_ControlFlow.huff -r
```

打印出的bytecode为：

```
5f355f1461000b575f5ffd5b610013565f5ffd5b5f5ff3
```

转换成格式化的表格：

| pc   | op     | opcode         | stack              |
|------|--------|----------------|--------------------|
| [00] | 5f     | PUSH0          | 0x00               |
| [01] | 35     | CALLDATALOAD   | calldata           |
| [02] | 5f     | PUSH0          | 0x00 calldata      |
| [03] | 14     | EQ             | suc                |
| [04] | 61 000b| PUSH2 0x000b   | 0x000b suc         |
| [07] | 57     | JUMPI          |                    |
| [08] | 5f     | PUSH0          | 0x00               |
| [09] | 5f     | PUSH0          | 0x00 0x00          |
| [0a] | fd     | REVERT        |                    |
| [0b] | 5b     | JUMPDEST       |                    |
| [0c] | 61 0013| PUSH2 0x0013   | 0x0013             |
| [0e] | 56     | JUMP           |                    |
| [10] | 5f     | PUSH0          | 0x00               |
| [11] | 5f     | PUSH0          | 0x00 0x00          |
| [12] | fd     | REVERT        |                    |
| [13] | 5b     | JUMPDEST       |                    |
| [14] | 5f     | PUSH0          | 0x00               |
| [15] | 5f     | PUSH0          | 0x00 0x00          |
| [16] | f3     | RETURN         |                    |

我们可以看到，这段字节码的功能：

1. `CALLDATALOAD`从`calldata`中读取值
2. 用`EQ`对比数据是否为`0`。若`calldata`为`0`，`suc = 1`，程序计数器（PC）通过`JUMPI`跳转到`0x0b`位置，也就时跳转标签`jump_one`标记的地方。若`calldata`不为`0`，则会继续运行，直到在`0xfd`的`REVERT`指令回滚交易。
3. 在`0x0b`继续运行，程序会遇到`JUMP`指令，PC跳转到`0x13`位置，也就是跳转标签`jump_two`标记的地方。
4. 在`0x13`继续运行，见到`RETURN`，返回数据并结束交易。

可以看到Huff的编译器在这里并没有做到最优，因为合约中`JUMPDEST`的位置可以用`1`字节表示，但它却用了`2`字节，`0x000b`和`0x0013`，浪费了gas。

## 总结

这一讲，我们介绍了Huff中的控制流。Huff提供了跳转标签，方便开发者使用`JUMP`和`JUMPI`进行流程控制。