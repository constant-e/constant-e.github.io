# Linux备忘录
如无特殊说明，默认发行版为Arch Linux。

## fontconfig
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
 <!-- Default -->
 <match target="pattern">
  <test name="family">
   <string>sans-serif</string>
  </test>
  <edit binding="strong" mode="prepend" name="family">
   <string>Noto Sans</string>
   <string>Noto Color Emoji</string>
  </edit>
 </match>
 <match target="pattern">
  <test name="family">
   <string>serif</string>
  </test>
  <edit binding="strong" mode="prepend" name="family">
   <string>Noto Serif</string>
   <string>Noto Color Emoji</string>
  </edit>
 </match>
 <match target="pattern">
  <test name="family">
   <string>monospace</string>
  </test>
  <edit binding="strong" mode="prepend" name="family">
   <string>Fira Code</string>
   <string>Noto Color Emoji</string>
  </edit>
 </match>
 <!-- zh-CN -->
 <match target="pattern">
  <test compare="contains" name="lang">
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
  <test compare="contains" name="lang">
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
  <test compare="contains" name="lang">
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
</fontconfig>
```
