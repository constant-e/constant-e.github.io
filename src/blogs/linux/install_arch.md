# Arch Linux 安装
关于安装archlinux的一些经验

## 使用Btrfs
1. 创建一个Btrfs分区，挂载至`/mnt`
2. 创建字卷。如创建`@`字卷（将挂载至`/`）：
    ```sh
    btrfs subvol create /mnt/@
    ```
    并创建其他需要的字卷，如`@home`。
3. 取消挂载`/mnt`，并挂载字卷。如挂载`@`字卷的基础命令是：
    ```sh
    mount -o subvol=@ 分区 /mnt
    ```
    可以在`-o`中添加其他参数，参考[Wiki](https://wiki.archlinuxcn.org/wiki/Btrfs#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E7%B3%BB%E7%BB%9F)。
