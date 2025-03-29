# 专辑

> ⚠️ **注意**: 数据源基本格式定义文档正在撰写中。当前信息可能不完整或有变更。


## 概述

专辑API提供了获取专辑详情、收藏专辑和管理收藏专辑的功能。这些API允许应用程序获取专辑的歌手、歌曲和其他元数据。

## 数据模型

歌曲使用以下数据模型:

```typescript
interface Album {
  // 专辑ID
  id: id;
  // 专辑名称
  name: string;
  // 专辑封面
  cover?: string;
  // 艺术家
  artists?: Artist[];
  // 歌曲数量
  size?: number;
}

interface Playlist {
  // 播放列表ID
  id: id;
  // 播放列表名称
  name?: string;
  // 封面图片URL
  cover?: string;
  // 歌曲数量
  size?: number;
  // 创建者信息
  creator?: User;
  // 歌曲列表
  songs?: Song[];
  // 播放列表类型
  type?: PlaylistType;
  // 描述
  description?: string;
  // 元数据，如是否收藏等
  meta?: {
    [key: string]: any;
  }
}
```


## API端点

### 获取专辑详情

```
GET /album/detail
```

获取专辑详情及歌曲列表。

**参数**:
- `id` (number): 专辑ID

**请求头**:
- `Token`: 用户的登录凭证(可选)

**响应**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 74715426,
    "name": "样例专辑",
    "cover": "https://p1.music.app/album-cover.jpg",
    "size": 3,
    "description": "样例专辑描述",
    "type": "album",
    "songs": [
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
    "meta": {
      "publishTime": 1543766400000,
      "subscribed": false,
      "artists": [
        {
            "id": 12085562,
            "name": "艺术家1",
            "avatar": ""
        }
      ]
    }
  },
  "timestamp": "2025-03-28T12:20:00.000Z"
}
```

### 获取收藏专辑

```
GET /album/sublist
```

**参数**:
- `limit` (number, 可选): 返回数量上限，默认1000
- `offset` (number, 可选): 偏移量，默认0

**请求头**:
- `Token`: 用户的登录凭证

**响应**:
```json
{
  "code": 0,
  "message": "success",
  "data": [
    {
      "id": 74715426,
      "name": "样例专辑",
      "cover": "https://p1.music.app/album-cover.jpg",
      "size": 3,
      "artists": [
        {
          "id": 12085562,
          "name": "艺术家1",
        }
      ]
    }
    // 更多专辑...
  ],
  "timestamp": "2025-03-28T12:20:00.000Z"
}
```

### 收藏/取消收藏专辑

```
PUT /album/like
```

将专辑添加到收藏列表或从收藏列表中移除。

**参数**:
- `id` (id): 专辑ID
- `like` (boolean, 可选): 是否喜欢，默认true

**请求头**:
- `Token`: 用户的登录凭证

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "id": 74715426,
    "like": true
  },
  "timestamp": "2025-03-28T12:20:00.000Z"
}
```
