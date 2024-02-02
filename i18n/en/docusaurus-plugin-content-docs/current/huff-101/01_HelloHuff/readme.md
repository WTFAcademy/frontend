---
title: 01. Hello Huff
tags:
  - huff
  - template
  - evm
  - bytecode
---

# WTF Huff极简入门: 01. Hello Huff

我最近在重新学Huff，巩固一下细节，也写一个“Huff极简入门”，供小白们使用（编程大佬可以另找教程），每周更新1-3讲。

推特：[@0xAA_Science](https://twitter.com/0xAA_Science)

社区：[Discord](https://discord.gg/5akcruXrsk)｜[微信群](https://docs.google.com/forms/d/e/1FAIpQLSe4KGT8Sh6sJ7hedQRuIYirOoZK_85miz3dw7vA1-YjodgJ-A/viewform?usp=sf_link)｜[官网 wtf.academy](https://wtf.academy)

所有代码和教程开源在github: [github.com/AmazingAng/WTF-Huff](https://github.com/AmazingAng/WTF-Huff)

-----

这一讲，我们将介绍Huff语言，并使用Foundry运行模版合约。

## Huff

大家可能很熟悉Solidity，但是几乎没听说过Huff。Huff是一个低级的、为Ethereum智能合约设计的编程语言，它允许开发者编写高度优化的EVM字节码。Huff的两大特点：

1. 难学: Huff不像Solidity抽象了EVM的底层工作原理，而是让开发者直接操作EVM的堆栈、内存、和存储。

2. 高效: Huff像是给EVM Opcodes套了一层壳，几乎是直接在字节码层面编写合约，gas优化到极致。

因此，你在学习Huff前需要熟悉Solidity和EVM的工作原理。推荐的先修课程：
1. [WTF Solidity](https://github.com/WTFAcademy/WTF-Solidity)
2. [WTF EVM Opcodes](https://github.com/WTFAcademy/WTF-EVM-Opcodes)

## Hello Huff

下面我们通过一个简单的合约`SimpleStore.huff`来学习Huff合约的结构。

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

下面，我们分段来学习这个huff合约。

首先，你需要定义合约的接口，像Solidity的接口一样，需要使用`#define`关键字。

```c
/* 接口 */
#define function setValue(uint256) nonpayable returns ()
#define function getValue() view returns (uint256)
```

接下来，你需要声明存储槽位（storage slot），就像在Solidity合约中声明状态变量一样。`FREE_STORAGE_POINTER()`指向合约中未使用的存储槽（free storage）。

```c
/* 存储槽位 */
#define constant VALUE_LOCATION = FREE_STORAGE_POINTER()
```

最后一部分要写合约中的方法（函数），本合约有`3`个方法：

1. `SET_VALUE()`: 改变`VALUE_LOCATION`存储的值。它先使用`calldataload`从calldata中读取变量的新值，然后使用`sstore`将新值存储到`VALUE_LOCATION`。
2. `GET_VALUE()`: 读取`VALUE_LOCATION`存储的值。它利用`sload`将`VALUE_LOCATION`存储的值推入堆栈，然后利用`mstore`将值存到内存，最后使用`return`返回。
3. `MAIN()`: 主宏，定义了合约的主入口。当对合约进行外部调用时，会运行这段代码来确定应该调用哪个函数。他先用`0x00 calldataload 0xE0 shr`读取calldata中的函数选择器，然后查看它是否与`SET_VALUE()`或`GET_VALUE()`匹配。如果匹配，就调用相应的函数；否则，回滚交易。

```c
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

## 运行模版项目

下面，我们介绍如何使用Foundry的插件foundry-huff运行模版项目。

### 配置环境

首先，你需要在本地安装以下内容： 

- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)  
    - 如果您可以运行`git --version`，则说明您已正确安装。
- [Foundry / Foundryup](https://github.com/gakonst/foundry)
    - 这将会安装`forge`，`cast`和`anvil`
    - 通过运行`forge --version`并获取类似`forge 0.2.0 (92f8951 2022-08-06T00:09:32.96582Z)`的输出，您可以检测是否已正确安装。
    - 要获取每个工具的最新版本，只需运行`foundryup`。
- [Huff Compiler](https://docs.huff.sh/get-started/installing/)
    - 如果您可以运行`huffc --version`并获取类似`huffc 0.3.0`的输出，则说明您已正确安装。

### 快速开始

1. 克隆[https://github.com/WTFAcademy/WTF-Huff]或[Huff模版仓库](https://github.com/huff-language/huff-project-template)。

运行：

```
git clone https://github.com/WTFAcademy/WTF-Huff
cd WTF-Huff
```

2. 安装依赖

克隆并进入您的仓库后，您需要安装必要的依赖项。为此，只需运行：

```shell
forge install
```

3. 构建 & 测试

要构建并测试您的合约，您可以运行：

```shell
forge build
forge test
```

![](./img/1-1.png)

4. 使用`huffc`打印huff合约的字节码：

```shell
huffc src/SimpleStore.huff -b
```

控制台输会输出合约的字节码（creation code）:

```
602e8060093d393df35f3560e01c8063552410771461001e5780632096525514610025575f5ffd5b6004355f55005b5f545f5260205ff3
```

如果想获取runtime code，可以使用`huffc -r`。

有关如何使用Foundry的更多信息，请查看[Foundry Github Repository](https://github.com/foundry-rs/foundry/tree/master/forge)和[foundry-huff library repository](https://github.com/huff-language/foundry-huff)。

### 项目结构图

```ml
lib
├─ forge-std — https://github.com/foundry-rs/forge-std
├─ foundry-huff — https://github.com/huff-language/foundry-huff
scripts
├─ Deploy.s.sol — 部署脚本
src
├─ SimpleStore — Huff中的简单存储合约
test
└─ SimpleStore.t — SimpleStore测试
```

## 总结

这一讲，我们介绍了Huff语言，学习了Huff合约结构，并运行了一个模版项目。Huff是一个低级的、为以太坊智能合约设计的编程语言，学习它不仅可以让你写出更优化的合约，还可以让你深入理解EVM。