---
title: 05. Main宏
tags:
  - huff
  - macro
  - main macro
  - bytecode
---

# WTF Huff极简入门: 05. Main宏

我最近在重新学Huff，巩固一下细节，也写一个“Huff极简入门”，供小白们使用（编程大佬可以另找教程），每周更新1-3讲。

推特：[@0xAA_Science](https://twitter.com/0xAA_Science)

社区：[Discord](https://discord.gg/5akcruXrsk)｜[微信群](https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link)｜[官网 wtf.academy](https://wtf.academy)

所有代码和教程开源在github: [github.com/AmazingAng/WTF-Huff](https://github.com/AmazingAng/WTF-Huff)

-----

这一讲，我们将介绍Huff中的`MAIN`宏，它是合约的主入口。

## Main 宏

`Main`宏是一个特殊的宏，作为合约的主入口，每个Huff合约必须有一个。它的作用类似于Solidity中的`fallback`函数，当对合约进行外部调用时，会运行这段代码来确定应该调用哪个函数。

声明时需要用`MAIN()`关键字：

```c
#define macro MAIN() = takes (0) returns (0) {
    // ...
}
```

下面我们写一个简单的合约：

```c
#define macro PUSH_69() = takes(0) returns(1) {
    push1 0x69                 // [0x69]
}

#define macro SAVE() = takes(1) returns(0) {
    // [0x69]
    [STORAGE_SLOT0]         // [value_slot0_pointer, 0x69]
    sstore          // []

}

#define macro MAIN() = takes(0) returns(0) {
    PUSH_69()          // []
    SAVE()
}
```

上面合约中的`PUSH_69()`宏会将`0x69`压入堆栈中（`returns(1)`），而`SAVE()`宏（`takes(1)`）会将堆栈顶端的值保存到存储槽`STORAGE_SLOT0`。在`Main`宏中，我们一次调用了`PUSH_69()`和`SAVE()`。


## 分析合约字节码

我们可以使用`huffc`命令获取上面合约的runtime code:

```shell
huffc src/05_Main.huff -r
```

打印出的bytecode为：

```
60695f55
```

转换成格式化的表格：

| pc   | op     | opcode         | stack              |
|------|--------|----------------|--------------------|
| [00] | 60 69  | PUSH2 0x69     | 0x69               |
| [02] | 5f     | PUSH0          | 0 0x69             | 
| [03] | 55     | SSTORE         |                    |

我们可以看到，这个合约实际上做的就是使用`SSTORE`指令将`0x69`存储在存储槽`0`中。

## 总结

这一讲，我们介绍了Huff中的`Main`宏和`MAIN`关键字。Huff中的`Main`宏是合约的主入口，每个合约必须包含它，功能与Solidity中的`fallback`函数类似。