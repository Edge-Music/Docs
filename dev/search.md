# 搜索API文档

> ⚠️ **注意**: 数据源基本格式定义文档正在撰写中。当前信息可能不完整或有变更。

## 概述

搜索API提供了音乐内容搜索功能，支持同时搜索歌曲、专辑、艺术家和播放列表。这个API是用户发现音乐内容的关键入口。

## 搜索结果模型

搜索结果包含多种类型的内容，使用以下模型:

```typescript
interface SearchResult {
  songs: Song[];       // 歌曲列表
  albums: Album[];     // 专辑列表
  artists: Artist[];   // 艺术家列表
  playlists: Playlist[]; // 播放列表
}
```

每种类型的结果都使用相应的数据模型，详见各自的文档。

## API端点

### 综合搜索

```
GET /search
```

根据关键词搜索多种类型的音乐内容。

**参数**:
- `keywords` (string): 搜索关键词
- `limit` (number, 可选): 每种类型返回的数量上限，默认10

**请求头**:
- `Token`: 用户的登录凭证(可选)

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "songs": [
      {
        "id": 1416909,
        "name": "稻香",
        "artists": [
          {
            "id": 9621,
            "name": "周杰伦"
          }
        ],
        "album": {
          "id": 14285,
          "name": "魔杰座",
          "cover": "https://p1.music.app/album-cover.jpg"
        },
        "duration": 240000,
        "privilege": {
          "playable": true,
          "maxBitrate": 320000
        }
      }
      // 更多歌曲...
    ],
    "albums": [
      {
        "id": 14285,
        "name": "魔杰座",
        "cover": "https://p1.music.app/album-cover.jpg",
        "artists": [
          {
            "id": 9621,
            "name": "周杰伦"
          }
        ],
        "size": 11
      }
      // 更多专辑...
    ],
    "artists": [
      {
        "id": 9621,
        "name": "周杰伦",
        "avatar": "https://p1.music.app/artist1.jpg"
      }
      // 更多艺术家...
    ],
    "playlists": [
      {
        "id": 24381616,
        "name": "周杰伦热门50首",
        "cover": "https://p1.music.app/playlist-cover.jpg",
        "size": 50,
        "creator": {
          "id": 87654321,
          "name": "音乐爱好者",
          "avatar": "https://p1.music.app/avatar.jpg"
        },
        "type": "normal",
        "description": "周杰伦最热门的50首歌曲"
      }
      // 更多播放列表...
    ]
  },
  "timestamp": "2025-03-28T14:00:00.000Z"
}
```

## 搜索技巧

### 精确搜索

在搜索关键词中使用引号可以进行精确匹配:
```
"周杰伦 稻香"
```

### 排除词

在关键词前使用减号可以排除包含该词的结果:
```
周杰伦 -演唱会
```

### 复合搜索

搜索词可以组合使用:
```
周杰伦 专辑:魔杰座
```

## 常见问题

### Q: 如何搜索其他类型的内容，如MV或电台?
A: 当前搜索API仅支持歌曲、专辑、艺术家和播放列表四种类型。其他类型可能需要独立的搜索API。

### Q: 搜索结果如何排序?
A: 搜索结果默认按照相关度排序，相关度算法由后端服务决定。