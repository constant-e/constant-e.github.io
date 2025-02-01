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


## fontconfig配置
一个使用Noto Sans CJK作为CJK字体，Noto Sans作为英文字体，Fira Code作为等宽字体，使用Noto提供的表情符号的fontconfig配置：
```xml
<?xml version='1.0'?>
<!DOCTYPE fontconfig SYSTEM 'urn:fontconfig:fonts.dtd'>
<fontconfig>
  <match target="pattern">
    <test name="family">
      <string>system-ui</string>
    </test>
    <edit binding="strong" mode="prepend" name="family">
      <string>sans-serif</string>
    </edit>
  </match>
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
      <family>Noto Sans</family>
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
  <!-- zh-CN -->
  <match target="pattern">
    <test name="lang">
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
    <test name="lang">
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
    <test name="lang">
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
  <!-- zh-HK -->
  <match target="pattern">
    <test name="lang">
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
    <test name="lang">
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
    <test name="lang">
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
  <!-- zh-TW -->
  <match target="pattern">
    <test name="lang">
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
    <test name="lang">
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
    <test name="lang">
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
  <!-- Japanese -->
  <match target="pattern">
    <test name="lang">
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
    <test name="lang">
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
    <test name="lang">
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
    <test name="lang">
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
    <test name="lang">
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
    <test name="lang">
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
