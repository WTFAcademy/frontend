---
title: 04. 宏
tags:
  - huff
  - macro
  - bytecode
---

# WTF Huff极简入门: 04. 宏

我最近在重新学Huff，巩固一下细节，也写一个“Huff极简入门”，供小白们使用（编程大佬可以另找教程），每周更新1-3讲。

推特：[@0xAA_Science](https://twitter.com/0xAA_Science)

社区：[Discord](https://discord.gg/5akcruXrsk)｜[微信群](https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link)｜[官网 wtf.academy](https://wtf.academy)

所有代码和教程开源在github: [github.com/AmazingAng/WTF-Huff](https://github.com/AmazingAng/WTF-Huff)

-----

这一讲，我们将介绍Huff中的宏和`macro`关键字。

## 宏

Huff中有两种可以将字节码组合起来的方法，一种叫宏`Macros`，另一种叫函数`Functions`。两者之间有一些差异，但是大多数时候开发者应该使用宏，而不是函数。定义宏时需要使用`macro`关键字，规则如下：

```c
#define macro MACRO_NAME(arguments) = takes (1) returns (3) {
    // ...
}
```

其中:

- `MACRO_NAME`: 宏的名称。
- `arguments`: 宏的参数，可以没有。
- `takes (1)`: 指定宏/函数接受的堆栈输入数量，可以没有，默认为`0`。
- `returns (3)`: 指定宏/函数输出的堆栈元素数量，可以没有，默认为`0`。

> 比较奇怪的是，当前的huff编译器并不会检查`takes`和`returns`的数量，所以当前它们只是个摆设。未来版本可能会加上检查？

在下面的例子中，`SAVE()`宏接受一个参数`value`，然后将它的值存储在存储槽`STORAGE_SLOT0`。在宏中，我们使用`<value>`来使用参数的值。

```c
#define constant STORAGE_SLOT0 = FREE_STORAGE_POINTER()

// 这个宏接受一个参数 value，然后将它的值存储在 STORAGE_SLOT0
#define macro SAVE(value) = takes(0) returns(0) {
    <value>                 // [value]
    [STORAGE_SLOT0]         // [value_slot0_pointer, value]
    sstore          // []
}

#define macro MAIN() = takes(0) returns(0) {
    SAVE(0x420)          // []
}
```

## 分析合约字节码

我们可以使用`huffc`命令获取上面合约的runtime code:

```shell
huffc src/04_Macro.huff -r
```

打印出的bytecode为：

```
6104205f55
```

转换成格式化的表格：

| pc   | op     | opcode         | stack              |
|------|--------|----------------|--------------------|
| [00] | 61 0420 | PUSH2 0x0420   | 0x0420            |
| [03] | 5f     | PUSH0          | 0 0x0420           | 
| [04] | 55     | SSTORE         |                    |

我们可以看到，这个合约做的就是使用`SSTORE`指令将`0x0420`存储在存储槽`0`中。

## 总结

这一讲，我们介绍了Huff中的宏和`macro`关键字。Huff中的宏和函数很相似，但是开发者大多数时间应该使用宏，而不是函数。