# LSPosed

众所周知，LSPosed在2024.1停止了公开更新，并且短期内没有恢复的希望。而原版LSPosed没有公开对新Android版本的修复。因此，在一段时间内，我们需要LSPosed的修改版。

## LSPosed目前的状态
更新：2024.9.29

### 1. 官方版
**GitHub仓库**：[LSPosed/LSPosed](https://github.com/LSPosed/LSPosed)

**最新Release**：v1.9.2 (7024)

**最新CI**：v1.9.2 (7058)

**状态**：停更，曾有过测试计划（后允许捐赠用户申请），2024.8后关闭。

### 2. 非官方版1（“mod版”）

README中称支持至15 Beta 2.1。（理论上也能支持Android 15 Beta 4）

**GitHub仓库**：[mywalkb/LSPosed_mod](https://github.com/mywalkb/LSPosed_mod)

**最新Release**：v1.9.3 (7244)

**最新CI**：v1.9.3 (7295)

**状态**：未知。由于libxposed api的一些变动，新的dependabot和crowdin的test都没过。

### 3. 非官方版2（“7086/1.10”）

README中称支持至15 Beta 4。

**GitHub仓库**：[JingMatrix/LSPosed](https://github.com/JingMatrix/LSPosed)

**最新Release**：v1.10 (7086)

**最新CI**：v1.10 (7104)

**状态**：尚在活跃更新。

### 4. 非官方版3（“npm-open”）

5ec1cff的一个分支，修复了Android 14 QPR3的Bug，没有支持stripped libart。在npm-open分支下。没有构建。

**GitHub仓库**：[5ec1cff/LSPosed](https://github.com/5ec1cff/LSPosed/tree/npm-open)

**状态**：未知。

### 这些分支的关系
5ec1cff和mywalkb的分支相对“独立”，都有自己的一些修改和修复。JingMatrix的分支合并了5ec1cff的所有新commit和mywalkb的两个修复（详见下文），并引入了自己的修改。如果使用非官方版LSPosed，个人建议用JingMatrix的。

## 在Android 14 QPR2及以上上修复LSPosed

目前Android 14 QPR2及以上下LSPosed异常源于以下两个变动：
1. 来自[mywalkb在一个commit中的说明](https://github.com/mywalkb/LSPosed_mod/commit/da1daff)：
    > From Android 14 QPR3 and forward, the classloader of injected app (com.android.shell) does not contain the apk manager.
2. 来自[libart的变动](https://android.googlesource.com/platform/art/+/c7f5eb7654a9689f03dc0f038ad802758ed24623)，LSPosed的Telegram群组对它描述如下：
    > LSPosed暂不兼容包含此变更的ART  
    > https://android.googlesource.com/platform/art/+/c7f5eb7654a9689f03dc0f038ad802758ed24623  
    > Android 14 QPR2开始包含此变更  
    > Google Play系统更新将包含此变的ART更新推送到了系统版本为Android 12及以上的设备上
    > 
    > Workaround for Android 14 QPR1及以下版本：
    > ```shell
    > adb uninstall com.google.android.art
    > ```

目前存在的修复如下（来自[mywalkb](https://github.com/mywalkb)）：
1. [Fix #28](https://github.com/mywalkb/LSPosed_mod/commit/da1daff)
    > From Android 14 QPR3 and forward, the classloader of injected app (com.android.shell) does not contain the apk manager, so in hook getClassLoader there is a new check when it got a negative response the apk manager is injected in classloader, so parasitic manager can start correctly.
2. [[core] fix #34](https://github.com/mywalkb/LSPosed_mod/commit/92a04e3)
    > Support for stripped library as libart. It require which a new section .gnu_debugdata, compressed with xz library, exist in elf header of the library. After in memory decompression, new elf header is parsed, so can find section .symtab


## 构建LSPosed避坑

理论上，只要merge上一节的两个commit，就能修复LSPosed。然而，LSPosed已经停更了太久，期间它所使用的很多SDK和依赖都经过了更新。如果你直接fork LSPosed的仓库，然后跑GitHub Actions，会发现构建失败。这里记录下几个更新SDK和依赖的注意事项。

**说明**：这里以更新Java、SDK等到新版本为例，你也可以选择保持SDK和各个依赖为旧版，这样就只需要合并上面的两个commit了。这里建议先用dependabot把依赖更新完，之后需要更新的有：Java, Gradle, Android SDK, Android NDK。

1. 更新Android NDK和Java时，由于R8的变化，需要更新Proguard Rules，参考[Adjust proguard for Android R8](https://github.com/JingMatrix/LSPosed/commit/0a93541)。
2. 同时，需要修改`magisk-loader`的`build.gradle.kts`，因为`lib`的输出目录变化（否则模块内将缺失`lib`，无法安装）。这个修复同样可以参考[Adjust proguard for Android R8](https://github.com/JingMatrix/LSPosed/commit/0a93541)。
3. 不要忘了Android SDK，参考[Update LSPlant for Android 15
](https://github.com/JingMatrix/LSPosed/commit/b563131)。
4. 不要使用新的libxposed api，因为这两个commit：[55efdf9](https://github.com/libxposed/api/commit/55efdf9)和[7b67273](https://github.com/libxposed/api/commit/7b67273)引入了api的变动，需要额外适配，否则编译无法通过。例如，如果使用GitHub Actions，需要修改`core.yml`：
    ```yaml
    - name: Checkout libxposed/api
      uses: actions/checkout@v3
      with:
        repository: libxposed/api
        path: libxposed/api
        ref: 54582730315ba4a3d7cfaf9baf9d23c419e07006
    ```
5. 不要更新rikka mainswitchbar到1.1.0，否则在管理器里无法启用/禁用模块。
