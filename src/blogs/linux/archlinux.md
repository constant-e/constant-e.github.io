# Arch Linux 安装与配置
关于安装与使用archlinux的一些经验

## 使用Btrfs安装ArchLinux
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
# 若需要指定DNS
# systemd-resolved=false
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

## Hyprland
安装软件：
```
dunst hypridle hyprland hyprlock hyprpicker hyprpolkitagent hyprshot kitty kvantum nwg-displays nwg-look pipewire wireplumber qt5-wayland qt5ct qt6-wayland qt6ct quickshell wofi xdg-desktop-portal-hyprland
```
（这里QuickShell需要AUR）

此外，还有一些与GNOME共用的包，如`gdm  nautilus`等（若不与GNOME共存，换成其他的），也包括一些通用的软件，如Fcitx 5等。

我自己的配置文件放在[GitHub](https://github.com/constant-e/my-hyprland-dotfiles)了。

关于高分辨率，Hyprland已经将Wayland处理得很好，对于XWayland（如微信，WPS，Steam等），建议禁用缩放，并设置字体DPI（Xft.dpi），详见我的配置文件

Hyprland对XWayland的适配明显不如对原生Wayland的，因此暂时不能完全迁移到Hyprland

## GNOME
gnome需要启用一些“实验性”选项，包括：`['scale-monitor-framebuffer', 'xwayland-native-scaling', 'variable-refresh-rate']`，用于分数缩放和可变刷新率

参见[Wiki](https://wiki.archlinux.org/title/HiDPI#GNOME)

## KDE
`plasma`包中不包含一些必要的软件，如`dolphin`（文件管理器），而`kde-applications`中的软件包又过多。因此，记录一个自用软件列表：
```
ark dolphin filelight gwenview kamoso kate kcalc kmail konsole krecorder okular partitionmanager spectacle
```
这个列表中不包含音频/视频播放器，因为我使用`vlc`。

此外，还有kde开发的开源软件`kdenlive krita`，可以作为达芬奇和GIMP的替代

## WPS Office 12关闭后台进程
WPS Office 12中，在WPS Office关闭后，wpscloudsvr不会关闭。

解决方案：移除wpscloudsvr的执行权限：
```sh
chmod -x /path/to/wpscloudsvr
```

使用Pacman Hook，在每次更新时都移除wpscloudsvr的执行权限（以`wps-office-cn`包为例）：
```
/etc/pacman.d/hooks/wps-office-cn.hook
```
```ini
[Trigger]
Type = Package
Operation = Install
Operation = Upgrade
Target = wps-office-cn

[Action]
Description = Disabling wpscloudsvr ...
When = PostTransaction
Exec = /usr/bin/chmod -x /usr/lib/office6/wpscloudsvr
```

**注意**：禁用wpscloudsvr会导致历史记录（包括本地）和云文档等功能不可用。

## zsh简单配置
添加这两行配置，用于自定义提示符和语法高亮：

```
~/.zshrc
```
```zsh
PROMPT="%n@%m %1~ %# "
source /usr/share/zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh
```
其中语法高亮需要先安装`zsh-syntax-highlighting`。

## Steam and Proton
Steam几乎是开箱即用的，只需额外进行如下配置：
- 开启*设置 -> 兼容性 -> 为所有其他产品启用Steam Play*，以强制使用Proton
- 如果需要开挂，在使用原版Proton时，可以添加启动参数：
```
PROTON_REMOTE_DEBUG_CMD="挂的位置" PRESSURE_VESSEL_FILESYSTEMS_RW="挂的位置" %command%
```
记得给挂调整为777权限，否则可能无法运行。

## fontconfig配置
- 一个使用更纱黑体、Inter、Fira Code、Noto Serif等字体的fontconfig配置：
```xml
<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'urn:fontconfig:fonts.dtd'>
<fontconfig>
  <!-- default -->
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Inter</family>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>

  <alias>
    <family>serif</family>
    <prefer>
      <family>Noto Serif</family>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>

  <alias>
    <family>monospace</family>
    <prefer>
      <family>Fira Code</family>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>

  <alias>
    <family>system-ui</family>
    <prefer>
      <family>Inter Display</family>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>

  <!-- English -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>en</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Inter</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>en</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>en</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
  
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>en</string>
    </test>
    <test name="family">
      <string>system-ui</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Inter Display</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- zh-CN -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-CN</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa Gothic SC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-CN</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK SC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-CN</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Sarasa Mono SC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
  
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-CN</string>
    </test>
    <test name="family">
      <string>system-ui</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa UI SC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- zh-TW -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-TW</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa Gothic TC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-TW</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK TC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-TW</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Sarasa Mono TC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
  
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-TW</string>
    </test>
    <test name="family">
      <string>system-ui</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa UI TC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- zh-HK -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-HK</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa Gothic HC</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-HK</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK TC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-HK</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Sarasa Mono HC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
  
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-HK</string>
    </test>
    <test name="family">
      <string>system-ui</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa UI HC</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- Japanese -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ja</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa Gothic J</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ja</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK JP</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ja</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Sarasa Mono J</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
  
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ja</string>
    </test>
    <test name="family">
      <string>system-ui</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa UI J</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- Korean -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ko</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa Gothic K</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ko</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK KR</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ko</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Sarasa Mono K</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
  
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ko</string>
    </test>
    <test name="family">
      <string>system-ui</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa UI K</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- zh fallback -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa Gothic SC</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK SC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Sarasa Mono SC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
  
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh</string>
    </test>
    <test name="family">
      <string>system-ui</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Sarasa UI SC</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
</fontconfig>
```

- 一个使用Noto Sans CJK作为CJK字体，Noto Sans作为英文字体，Fira Code作为等宽字体，使用Noto提供的表情符号的fontconfig配置：
```xml
<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'urn:fontconfig:fonts.dtd'>
<fontconfig>
  <!-- default -->
  <alias>
    <family>sans-serif</family>
    <prefer>
      <family>Noto Sans</family>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>

  <alias>
    <family>serif</family>
    <prefer>
      <family>Noto Serif</family>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>

  <alias>
    <family>monospace</family>
    <prefer>
      <family>Fira Code</family>
      <family>Noto Sans Mono</family>
      <family>Noto Color Emoji</family>
    </prefer>
  </alias>

  <alias>
    <family>system-ui</family>
    <prefer>
      <family>sans</family>
    </prefer>
  </alias>

  <!-- English -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>en</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>en</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>en</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Noto Sans Mono</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- zh-CN -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-CN</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Sans CJK SC</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-CN</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK SC</string>
      <string>Noto Serif</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-CN</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Noto Sans Mono CJK SC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- zh-TW -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-TW</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Sans CJK TC</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-TW</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK TC</string>
      <string>Noto Serif</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-TW</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Noto Sans Mono CJK TC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- zh-HK -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-HK</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Sans CJK HK</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-HK</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK TC</string>
      <string>Noto Serif</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh-HK</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Noto Sans Mono CJK TC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- Japanese -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ja</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Sans CJK JP</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ja</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK JP</string>
      <string>Noto Serif</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ja</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Noto Sans Mono CJK JP</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- Korean -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ko</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Sans CJK KR</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ko</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK KR</string>
      <string>Noto Serif</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>ko</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Noto Sans Mono CJK KR</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <!-- zh fallback -->
  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh</string>
    </test>
    <test name="family">
      <string>sans-serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Sans CJK SC</string>
      <string>Noto Sans</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh</string>
    </test>
    <test name="family">
      <string>serif</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Noto Serif CJK SC</string>
      <string>Noto Serif</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>

  <match target="pattern">
    <test name="lang" compare="contains">
      <string>zh</string>
    </test>
    <test name="family">
      <string>monospace</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>Fira Code</string>
      <string>Noto Sans Mono CJK SC</string>
      <string>Noto Color Emoji</string>
    </edit>
  </match>
</fontconfig>
```

