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

## 网络配置
个人习惯为使用`NetworkManager`、`iwd`和`systemd-resolved`。安装后，需要进行如下配置
- 启用`NetworkManager`, `systemd-resolved`, `iwd`
- 屏蔽`wpa_supplicant`
- 配置NetworkManager：
```
/etc/NetworkManager/conf.d/wifi-backend.conf
```

```ini
[device]
wifi.backend=iwd
```

```
/etc/NetworkManager/conf.d/dns.conf
```

```ini
[main]
dns=systemd-resolved
rc-manager=auto
systemd-resolved=false
```
- 如需调整dns，配置systemd-resolved：
```
/etc/systemd/resolved.conf.d/resolve.conf
```

```ini
[Resolve]
DNS=填写dns服务器
FallbackDNS=127.0.0.1 ::1
DNSOverTLS=opportunistic
DNSSEC=allow-downgrade
Domains=~.
```

## GNOME
gnome需要启用一些“实验性”选项，包括：`['scale-monitor-framebuffer', 'xwayland-native-scaling', 'variable-refresh-rate']`，用于分数缩放和可变刷新率

参见[Wiki](https://wiki.archlinux.org/title/HiDPI#GNOME)

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
