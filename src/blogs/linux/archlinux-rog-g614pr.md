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
在GNOME和KDE下，分数缩放都仍存在一些问题：
- GNOME下，直接设置150%缩放会使许多GTK应用模糊，目前的解决方案是将缩放调整至125%，然后再在GNOME Tweaks中设置1.2倍的字体缩放，
    这样有接近150%的效果（甚至UI大小更合适，1.5倍的UI有些大了），同时几乎不存在模糊
    （已知唯一反例是在Firefox中，在工具栏区域打开的部分弹窗，如右键菜单和扩展窗口，会发生模糊）

    可以在Just Perfection插件中关闭顶栏中的无障碍菜单图标
- KDE下，分数缩放会使许多图标，和桌面图标中的字体等模糊，还会使一些kde软件中的特定组件在刷新时抖动，暂时无解
因此推荐使用GNOME
