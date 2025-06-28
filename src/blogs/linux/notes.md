# Linux备忘录
如无特殊说明，默认发行版为Arch Linux。

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
