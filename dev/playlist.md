# 歌单

> ⚠️ **注意**: 数据源基本格式定义文档正在撰写中。当前信息可能不完整或有变更。

## 概述

歌单API提供了访问和管理播放列表的功能，包括获取用户创建的播放列表、推荐播放列表、排行榜以及播放列表详情。

## 数据模型

播放列表使用以下数据模型:

```typescript
interface Playlist {
  id: id;             // 播放列表ID
  name?: string;      // 播放列表名称
  cover?: string;     // 封面图片URL
  size?: number;      // 歌曲数量
  creator?: User;     // 创建者信息
  songs?: Song[];     // 歌曲列表
  type?: PlaylistType; // 播放列表类型: 'normal', 'album', 'dj', 'artist'
  description?: string; // 描述
  meta?: {            // 元数据
    [key: string]: any;
  }
}
```

## API端点

### 获取用户播放列表

```
GET /playlist/list
```

获取用户创建和收藏的播放列表。

**参数**:
- `uid` (id): 用户ID
- `limit` (number, 可选): 返回数量上限，默认1000
- `offset` (number, 可选): 偏移量，默认0

**请求头**:
- `Token`: 用户的登录凭证

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": [
    {
      "id": "daily_songs",
      "name": "今日日推推荐",
      "cover": "https://ui-avatars.com/api/?bold=true&name=28&size=300",
      "type": "normal",
      "description": "根据你的音乐口味生成，每天更新"
    },
    {
      "id": 12345678,
      "name": "我喜欢的音乐",
      "cover": "https://p1.music.app/playlist-cover.jpg",
      "size": 100,
      "creator": {
        "id": 87654321,
        "name": "音乐爱好者",
        "avatar": "https://p1.music.app/avatar.jpg"
      },
      "type": "normal",
      "description": "我的收藏"
    }
    // 更多播放列表...
  ],
  "timestamp": "2025-03-28T11:00:00.000Z"
}
```

**特别说明**:
- 返回结果中始终包含一个特殊的播放列表 `daily_songs`，代表每日推荐歌曲

### 获取推荐播放列表

```
GET /playlist/recommend
```

获取推荐的播放列表。

**参数**:
- `limit` (number, 可选): 返回数量上限，默认10

**请求头**:
- `Token`: 用户的登录凭证

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": [
    {
      "id": 87654321,
      "name": "流行音乐精选",
      "cover": "https://p1.music.app/recommend1.jpg",
      "size": 50,
      "type": "normal",
      "description": "热门流行音乐推荐"
    },
    // 更多推荐播放列表...
  ],
  "timestamp": "2025-03-28T11:10:00.000Z"
}
```

### 获取排行榜

```
GET /playlist/toplist
```

获取音乐排行榜。

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
      "id": 19723756,
      "name": "飙升榜",
      "cover": "https://p1.music.app/toplist1.jpg",
      "size": 100,
      "type": "normal",
      "description": "每天更新"
    },
    {
      "id": 3779629,
      "name": "新歌榜",
      "cover": "https://p1.music.app/toplist2.jpg",
      "size": 100,
      "type": "normal",
      "description": "每天更新"
    },
    // 更多排行榜...
  ],
  "timestamp": "2025-03-28T11:20:00.000Z"
}
```

### 获取播放列表详情

```
GET /playlist/detail
```

获取播放列表详细信息，包括歌曲列表。

**参数**:
- `id` (id): 播放列表ID

**请求头**:
- `Token`: 用户的登录凭证

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "id": 12345678,
    "songs": [
      {
        "id": 1416909,
        "name": "样例歌曲1",
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
      "subscribed": true
    }
  },
  "timestamp": "2025-03-28T11:30:00.000Z"
}
```

**特殊情况**:
- 如果请求的ID是 `daily_songs`，则返回的是用户的每日推荐歌曲

## 最佳实践

1. **分页加载**: 对于大型播放列表，使用`limit`和`offset`参数分页加载歌曲
2. **缓存策略**: 对于不经常变化的播放列表，可以在客户端实施缓存策略
3. **错误处理**: 妥善处理API返回的错误，特别是权限相关的错误
4. **UI优化**: 在加载播放列表详情时，可以先展示基本信息，异步加载歌曲列表