# 在Rog Strix G16 2025 (G614PR)上运行Arch Linux

## 驱动程序
几乎无需额外安装，为了调节灯光，需要安装`asusctl`和`rog-control-center`，并在`/usr/share/asusd/aura_support.ron`中添加：
```
(
    device_name: "G614PR",
    product_id: "",
    layout_name: "g634j-per-key",
    basic_modes: [Static, Breathe, RainbowCycle, RainbowWave, Pulse],
    basic_zones: [Key1, Key2, Key3, Key4],
    advanced_type: None,
    power_zones: [Keyboard, Lightbar],
),
```

## 已知问题
似乎由于ACPI的问题，开机时存在约35s的停滞：
```
[    2.217804] clocksource: Switched to clocksource tsc
[   37.699508] clk: Disabling unused clocks
```
暂时没有修复方法

## HiDPI
屏幕分辨率是2560*1600，推荐缩放1.5，但这样会使得缩放后2560/1.5和1600/1.5都不是整数。目前比较合适的缩放是125%（缩放后仍较小，可以配合字体DPI混用）和160%（有点大）。

在GNOME和KDE下，分数缩放都仍存在一些问题：
- GNOME下，直接设置150%缩放会使许多GTK应用模糊，目前的解决方案是将缩放调整至125%，然后再在GNOME Tweaks中设置1.2倍的字体缩放，
    这样有接近150%的效果（甚至UI大小更合适，1.5倍的UI有些大了），同时几乎不存在模糊
    （已知唯一反例是在Firefox中的部分弹窗，如部分右键菜单和扩展窗口，会发生模糊）

    可以在Just Perfection插件中关闭顶栏中的无障碍菜单图标
- KDE下，分数缩放会使许多图标，和桌面图标中的字体等模糊，还会使一些kde软件中的特定组件在刷新时抖动或撕裂。这个Bug被汇报在[bugs.kde.org](https://bugs.kde.org/show_bug.cgi?id=479891)，一个已知的有效解决办法是添加`QT_SCALE_FACTOR_ROUNDING_POLICY=RoundPreferFloor`环境变量。（然而，这个Bug理论上已经被修复了，不清楚为什么还存在）

因为KDE在HiDPI的其它方面做得比GNOME好得多，推荐使用KDE

对于WM，实测在Hyprland下Wayland的HiDPI没有模糊的问题，偶尔有类似KDE的撕裂问题（其实频率极低，并不影响）。对于XWayland不能解决模糊问题，可以只修改字体DPI（通过Xft.dpi）。
