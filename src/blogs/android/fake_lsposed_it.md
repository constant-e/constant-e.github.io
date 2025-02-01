# 如何伪造一个LSPosed 内测版

诸位应该已经知道，现在网上所谓的“LSPosed 内测泄漏版”，除了7287，**都是假的**（这不是说版本号是7287就一定是真的）。本文就简单写写这些LSPosed是怎么伪造出来的。

**声明**：不赞同制作伪造LSPosed内测版；本文只是一个不完整的思路，作者也未伪造过LSPosed内测版。

## 准备工作
首先这些版本并非真的内测版，是通过修改JingMatrix版将它伪造为内测版。所以先把JingMatrix版fork一个，或者clone下来。

虽然内置的“记事本”等应用也够修改了，但还是推荐用VSCode这样的软件。

## 修改版本号
之前说过，LSPosed的版本号，前半部分是开发者决定（最新tag）的，后半部分是主分支commit数 + 4200得到的。具体地，它们在项目根目录下的build.gradle.kts中，将这两行修改为需要的版本号（如：7302，1.9.2）。

```kotlin
val commitCount = ...
val latestTag = ...
```

## 修改后缀
内测版有-it的后缀，在管理器中也有。在app/src/main/java/org/lsposed/manager/ui/fragment/HomeFragment.java中，添加上-it后缀。

```java
binding.statusSummary.setText(String.format(LocaleDelegate.getDefaultLocale(), "%s (%d) - %s",
    ConfigManager.getXposedVersionName(), ConfigManager.getXposedVersionCode(), ConfigManager.getApi()));
```

## 修改模块
在magisk-loader/build.gradle.kts中，添加-it后缀。

```kotlin
val zipName = ...
```

在magisk-loader/magisk_module/module.prop中，删掉api，添加IT后缀和GitHub用户名（LSPosed IT (Github@{userName})）。

```ini
name=${api} - LSPosed
```

## 其他
JingMatrix版与内测版还有许多差异，如webui的有无，这些就不再写了。

## 编译
可以本地编译，也可以用GitHub Actions。
