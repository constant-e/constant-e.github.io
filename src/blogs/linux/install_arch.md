# Arch Linux 安装
关于安装archlinux的一些经验

## 使用Btrfs
1. 创建一个Btrfs分区，挂载至`/mnt`
2. 创建子卷。如创建`@`子卷（将挂载至`/`）：
    ```sh
    btrfs subvol create /mnt/@
    ```
    并创建其他需要的子卷，如`@home`。
3. 取消挂载`/mnt`，并挂载子卷。如挂载`@`子卷的基础命令是：
    ```sh
    mount -o subvol=@ 分区 /mnt
    ```
    可以在`-o`中添加其他参数，参考[Wiki](https://wiki.archlinuxcn.org/wiki/Btrfs#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F)。

## KDE
`plasma`包中不包含一些必要的软件，如`dolphin`（文件管理器），而`kde-applications`中的软件包又过多。因此，记录一个自用软件列表：
```
ark dolphin filelight gwenview kamoso kate kcalc kmail konsole krecorder okular partitionmanager spectacle
```
这个列表中不包含音频/视频播放器，因为我使用`vlc`。

此外，还有一些kde开发的开源软件：
```
kdenlive krita
```
