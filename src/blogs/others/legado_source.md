# 阅读(legado)书源

自己写的[阅读](https://github.com/gedoor/legado)书源。

## 中华典藏
找寒假必读书目的电子版时发现的，[原网站](https://www.zhonghuadiancang.com/)就质量不错，UI比较好看且无广告。

```json
{
  "bookSourceName": "中华典藏",
  "bookSourceType": 0,
  "bookSourceUrl": "https://www.zhonghuadiancang.com",
  "customOrder": 0,
  "enabled": true,
  "enabledCookieJar": true,
  "enabledExplore": true,
  "exploreUrl": "学术杂记::/xueshuzaji\n文学艺术::/wenxueyishu\n佛学宝典::/foxuebaodian\n天文地理::/tianwendili\n玄学五术::/xuanxuewushu\n儒理哲学::/rulizhexue\n历史传记::/lishizhuanji\n诗词戏曲::/shicixiqu\n类书文集::/leishuwenji\n国学知识::/guoxuezhishi\n外国名著::/waiguomingzhu",
  "lastUpdateTime": 1738413610455,
  "respondTime": 180000,
  "ruleBookInfo": {
    "author": ".panel-heading@a@text",
    "coverUrl": ".fmpic@img@src",
    "downloadUrls": "",
    "intro": ".m-summary",
    "kind": ".alert@a@text",
    "name": ".panel-heading@h1",
    "tocUrl": ""
  },
  "ruleContent": {
    "content": "#content@p@text",
    "title": ".panel-footer@h1"
  },
  "ruleExplore": {
    "author": "@a.1@text",
    "bookList": "@tbody@tr",
    "bookUrl": "@a.0@href",
    "intro": "@p@text",
    "lastChapter": "@a.1@title",
    "name": "@a.0@text"
  },
  "ruleSearch": {
    "author": "@a.1@text",
    "bookList": "@tbody@tr",
    "bookUrl": "@a.0@href",
    "intro": "@p@text",
    "kind": "",
    "lastChapter": "@a.1@title",
    "name": "@a.0@text"
  },
  "ruleToc": {
    "chapterList": "#booklist@li",
    "chapterName": "@a@text",
    "chapterUrl": "@a@href"
  },
  "searchUrl": "/e/search/index.php,{\"method\":\"post\",\"body\":\"tbname=bookname&show=title&tempid=1&keyboard={{key}}\"}",
  "weight": 0
}
```
