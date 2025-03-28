# 艺术家

> ⚠️ **注意**: 数据源基本格式定义文档正在撰写中。当前信息可能不完整或有变更。

## 概述

艺术家API提供了获取艺术家信息和热门歌曲的功能。这些API允许应用程序展示艺术家详情页和相关音乐内容。

## 数据模型

艺术家使用以下数据模型:

```typescript
interface Artist {
  // 艺术家ID
  id: id;
  // 艺术家名称
  name: string;
  // 艺术家头像
  avatar?: string;
}
```

获取艺术家详情时，返回的是一个特殊类型的`Playlist`对象，包含艺术家信息和热门歌曲:

```typescript
interface Playlist {
  id: id;             // 艺术家ID
  name: string;       // 艺术家名称
  cover: string;      // 艺术家图片
  size: number;       // 音乐总数
  description: string; // 艺术家描述
  type: "artist";     // 类型为artist
  songs: Song[];      // 热门歌曲
  meta: {
    subscribed: boolean; // 是否已关注
  }
}
```

## API端点

### 获取推荐艺术家

```
GET /artist/recommend
```

获取推荐艺术家列表。

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
      "id": 9621,
      "name": "周杰伦",
      "avatar": "https://p1.music.app/artist1.jpg"
    },
    {
      "id": 7123,
      "name": "林俊杰",
      "avatar": "https://p1.music.app/artist2.jpg"
    },
    // 更多艺术家...
  ],
  "timestamp": "2025-03-28T13:00:00.000Z"
}
```

### 获取艺术家详情

```
GET /artist/detail
```

获取艺术家的详细信息和热门歌曲。

**参数**:
- `id` (number): 艺术家ID

**请求头**:
- `Token`: 用户的登录凭证

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "id": 9621,
    "name": "周杰伦",
    "cover": "https://p1.music.app/artist1.jpg",
    "size": 634,
    "description": "华语流行乐男歌手、音乐人、演员、导演、编剧...",
    "type": "artist",
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
      },
      // 更多热门歌曲...
    ],
    "meta": {
      "subscribed": true
    }
  },
  "timestamp": "2025-03-28T13:10:00.000Z"
}
```

## 最佳实践

1. **分页加载**: 艺术家页面可能包含大量内容，考虑实现分页或懒加载
2. **缓存艺术家信息**: 艺术家基本信息变化不频繁，可以适当缓存

## 常见问题

### Q: 如何判断用户是否已关注艺术家?
A: 通过响应中的`meta.subscribed`字段判断。