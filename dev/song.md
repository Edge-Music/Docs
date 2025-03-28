# 歌曲

> ⚠️ **注意**: 数据源基本格式定义文档正在撰写中。当前信息可能不完整或有变更。


## 概述

歌曲API提供了获取歌曲详情、推荐歌曲和管理收藏歌曲的功能。这些API允许应用程序获取歌曲的播放URL、歌词和其他元数据。

## 数据模型

歌曲使用以下数据模型:

```typescript
interface Song {
  id: id;             // 歌曲ID
  name?: string;      // 歌曲名称
  tns?: string[];     // 别名或翻译名
  artists?: Artist[]; // 歌手列表
  album?: Album;      // 专辑信息
  duration?: number;  // 时长(毫秒)
  privilege?: Privilege; // 播放权限
  meta?: SongMeta;    // 元数据
}

interface SongMeta {
  url?: string;       // 歌曲播放URL
  md5?: string;       // 文件MD5值
  size?: number;      // 文件大小(字节)
  bitrate?: number;   // 比特率
  isFavorite?: boolean; // 是否为收藏歌曲
  lyric?: Lyric;      // 歌词信息
  [key: string]: any; // 其他元数据
}

interface Lyric {
  normal?: string;       // 原文歌词(LRC格式)
  transliteration?: string; // 音译歌词(LRC格式)
  translation?: string;    // 翻译歌词(LRC格式)
}
```

## API端点

### 获取推荐歌曲

```
GET /song/recommend
```

获取推荐歌曲列表。

**参数**:
- `limit` (number, 可选): 返回数量上限，默认10

**请求头**:
- `Token`: 用户的登录凭证(可选)

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": [
    {
      "id": 1416909,
      "name": "样例歌曲1",
      "tns": ["Sample Song 1"],
      "artists": [
        {
          "id": 9621,
          "name": "艺术家1"
        }
      ],
      "album": {
        "id": 14285,
        "name": "专辑名称",
        "cover": "https://p1.music.app/album-cover.jpg"
      },
      "duration": 240000,
      "privilege": {
        "playable": true,
        "maxBitrate": 320000
      }
    },
    // 更多歌曲...
  ],
  "timestamp": "2025-03-28T12:00:00.000Z"
}
```

### 获取歌曲详情

**参数**:
- `id` (id): 歌曲ID
- `uid` (id): 用户ID，用于判断歌曲是否被用户收藏
- `br` (Bitrate, 可选): 比特率，默认320000

**请求头**:
- `Token`: 用户的登录凭证

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "id": 1416909,
    "meta": {
      "url": "https://m801.music.app/song.mp3",
      "md5": "e31f9ebb5d7011c7d7a0d95cd2a8c5c0",
      "size": 7867205,
      "bitrate": 320000,
      "isFavorite": true,
      "lyric": {
        "normal": "[00:00.000] 作词 : 填词人\n[00:01.000] 作曲 : 谱曲人\n[00:02.000] 编曲 : 编曲人\n[00:03.000]\n[00:04.000] 第一行歌词\n[00:08.000] 第二行歌词",
        "translation": "[00:04.000] First line lyrics\n[00:08.000] Second line lyrics",
        "transliteration": ""
      }
    }
  },
  "timestamp": "2025-03-28T12:10:00.000Z"
}
```

**说明**:
- `url`: 歌曲的播放地址，可直接用于音频播放
- `lyric`: 包含三种歌词类型，都使用标准LRC格式
  - `normal`: 原文歌词
  - `translation`: 翻译歌词（如有）
  - `transliteration`: 音译歌词（如有）

### 喜欢/取消喜欢歌曲

```
PUT /song/like
```

将歌曲添加到收藏列表或从收藏列表中移除。

**参数**:
- `id` (id): 歌曲ID
- `like` (boolean, 可选): 是否喜欢，默认true

**请求头**:
- `Token`: 用户的登录凭证

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "id": 1416909,
    "like": true,
    "playlist": 37240012
  },
  "timestamp": "2025-03-28T12:20:00.000Z"
}
```

**说明**:
- `like`: 操作后的收藏状态
- `playlist`: 收藏歌单的ID

## 最佳实践

1. **音频缓存**: 考虑在客户端缓存歌曲音频，减少流量消耗
2. **预加载策略**: 当用户浏览播放列表时，可预加载下一首歌曲的元数据
3. **歌词同步**: 使用LRC格式的时间戳实现歌词与音频的精确同步
4. **错误处理**: 妥善处理获取URL失败、音频加载失败等异常情况

## 歌词解析

歌词使用标准的LRC格式，格式如下:

```
[mm:ss.xx] 歌词内容
```

例如:
```
[00:04.000] 第一行歌词
[00:08.000] 第二行歌词
```

可以通过以下步骤解析LRC歌词:

1. 按行分割歌词文本
2. 对每行使用正则表达式提取时间戳和文本内容
3. 将时间戳转换为毫秒
4. 按时间戳排序歌词行
5. 在播放过程中，比较当前播放时间与歌词时间戳，显示对应歌词

## 常见问题

### Q: 如何处理付费歌曲?
A: 通过检查歌曲的`privilege.playable`字段判断歌曲是否可播放。如不可播放，可显示`privilege.reason`中的原因。

### Q: 如何处理不同音质的选择?
A: 通过`br`参数请求不同音质，常见值有128000(标准)、320000(高质量)、999000(无损)。请注意，高音质可能需要会员权限。