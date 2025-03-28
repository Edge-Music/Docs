# API Reference

> ⚠️ **注意**: 数据源基本格式定义文档正在撰写中。当前信息可能不完整或有变更。

## 目录

- [API Reference](#api-reference)
  - [目录](#目录)
  - [基础信息](#基础信息)
    - [认证方式](#认证方式)
    - [响应格式](#响应格式)
    - [状态码](#状态码)
  - [认证API](#认证api)
    - [获取二维码密钥](#获取二维码密钥)
    - [创建二维码](#创建二维码)
    - [检查二维码状态](#检查二维码状态)
    - [获取登录状态](#获取登录状态)
  - [播放列表API](#播放列表api)
    - [获取用户播放列表](#获取用户播放列表)
    - [获取推荐播放列表](#获取推荐播放列表)
    - [获取排行榜](#获取排行榜)
    - [获取播放列表详情](#获取播放列表详情)
  - [歌曲API](#歌曲api)
    - [获取推荐歌曲](#获取推荐歌曲)
    - [获取歌曲详情](#获取歌曲详情)
    - [喜欢/取消喜欢歌曲](#喜欢取消喜欢歌曲)
  - [艺术家API](#艺术家api)
    - [获取推荐艺术家](#获取推荐艺术家)
    - [获取艺术家详情](#获取艺术家详情)
  - [搜索API](#搜索api)
    - [综合搜索](#综合搜索)
  - [数据模型](#数据模型)
    - [基础类型](#基础类型)
    - [User](#user)
    - [Playlist](#playlist)
    - [Song](#song)
    - [Artist](#artist)
    - [Album](#album)
    - [Lyric](#lyric)

## 基础信息

### 认证方式

所有请求需要在HTTP头部包含Token：

```
Token: YOUR_TOKEN_HERE
```

或者使用Bearer格式：

```
Token: Bearer YOUR_TOKEN_HERE
```

### 响应格式

所有API响应均遵循统一格式：

```json
{
  "code": 0,          // 状态码，0表示成功
  "message": "Success", // 状态信息
  "data": {},         // 实际数据
  "timestamp": "2025-03-28T10:30:00.000Z" // 时间戳
}
```

### 状态码

| 状态码 | 说明 |
|-------|------|
| 0     | 请求成功 |
| -1    | 一般错误 |
| -801  | 二维码已过期 |
| -800  | 等待扫码 |
| -799  | 等待确认 |
| -798  | 授权登录成功 |

## 认证API

### 获取二维码密钥

```
GET /connect/qr/key
```

**参数**: 无

**响应**:
```json
{
  "unikey": "8a3829f1-2935-4d6a-b568-3f6317b5xxx"
}
```

### 创建二维码

```
GET /connect/qr/create
```

**参数**:
- `key` (string|number): 二维码密钥
- `qrimg` (boolean|string, 可选): 是否返回图片，默认true

**响应**:
```json
{
  "qrurl": "https://music.app/qrlogin?key=8a3829f1-2935-4d6a-b568-3f6317b5xxx",
  "qrimg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAA..."
}
```

### 检查二维码状态

```
GET /connect/qr/check
```

**参数**:
- `key` (string|number): 二维码密钥

**响应**:
```json
{
  "status": 0,  // -1 过期，0 等待扫码，1 等待确认，2 授权登录成功
  "cookie": ""  // 当status为2时，包含登录凭证
}
```

### 获取登录状态

```
GET /connect/status
```

**参数**: 无

**响应**:
```json
{
  "id": 12345678,
  "name": "音乐爱好者",
  "avatar": "https://p1.music.app/avatar.jpg"
}
```

## 播放列表API

### 获取用户播放列表

```
GET /playlist/list
```

**参数**:
- `uid` (id): 用户ID
- `limit` (number, 可选): 返回数量上限，默认1000
- `offset` (number, 可选): 偏移量，默认0

**响应**: `Playlist[]`

### 获取推荐播放列表

```
GET /playlist/recommend
```

**参数**:
- `limit` (number, 可选): 返回数量上限，默认10

**响应**: `Playlist[]`

### 获取排行榜

```
GET /playlist/toplist
```

**参数**:
- `limit` (number, 可选): 返回数量上限，默认10

**响应**: `Playlist[]`

### 获取播放列表详情

```
GET /playlist/detail
```

**参数**:
- `id` (id): 播放列表ID

**响应**: `Playlist` (包含songs字段)

## 歌曲API

### 获取推荐歌曲

```
GET /song/recommend
```

**参数**:
- `limit` (number, 可选): 返回数量上限，默认10

**响应**: `Song[]`

### 获取歌曲详情

```
GET /song/detail
```

**参数**:
- `id` (id): 歌曲ID
- `uid` (id): 用户ID
- `br` (Bitrate, 可选): 比特率，默认320000

**响应**: `Song` (包含meta信息)

### 喜欢/取消喜欢歌曲

```
PUT /song/like
```

**参数**:
- `id` (id): 歌曲ID
- `like` (boolean, 可选): 是否喜欢，默认true

**响应**:
```json
{
  "id": 1416909,    // 歌曲ID
  "like": true,     // 喜欢状态
  "playlist": 37240012  // 喜欢歌单ID
}
```

## 艺术家API

### 获取推荐艺术家

```
GET /artist/recommend
```

**参数**:
- `limit` (number, 可选): 返回数量上限，默认10

**响应**: `Artist[]`

### 获取艺术家详情

```
GET /artist/detail
```

**参数**:
- `id` (number): 艺术家ID

**响应**: `Playlist` (包含artist信息和热门歌曲)

## 搜索API

### 综合搜索

```
GET /search
```

**参数**:
- `keywords` (string): 搜索关键词
- `limit` (number, 可选): 每种类型返回的数量上限，默认10

**响应**:
```json
{
  "songs": Song[],       // 歌曲列表
  "albums": Album[],     // 专辑列表
  "artists": Artist[],   // 艺术家列表
  "playlists": Playlist[] // 播放列表
}
```

## 数据模型

### 基础类型

```typescript
type id = number | string;  // 统一ID类型
type Bitrate = number;      // 比特率类型(如128000, 320000)
type PlaylistType = 'normal' | 'album' | 'dj' | 'artist';  // 播放列表类型
```

### User

```typescript
interface User {
  id: id;             // 用户ID
  name: string;       // 用户名称
  avatar?: string;    // 用户头像
  description?: string;  // 用户简介
}
```

### Playlist

```typescript
interface Playlist {
  id: id;             // 播放列表ID
  name?: string;      // 播放列表名称
  cover?: string;     // 封面图片URL
  size?: number;      // 歌曲数量
  creator?: User;     // 创建者信息
  songs?: Song[];     // 歌曲列表
  type?: PlaylistType; // 播放列表类型
  description?: string; // 描述
  meta?: {            // 元数据
    [key: string]: any;
  }
}
```

### Song

```typescript
interface Song {
  id: id;             // 歌曲ID
  name?: string;      // 歌曲名称
  tns?: string[];     // 别名
  artists?: Artist[]; // 歌手列表
  album?: Album;      // 专辑信息
  duration?: number;  // 时长(毫秒)
  privilege?: {       // 播放权限
    playable: boolean;  // 是否可播放
    reason?: string;    // 不可播放原因
    bitrates?: Bitrate[]; // 可用码率列表
    maxBitrate?: Bitrate; // 最高可用码率
  };
  meta?: {            // 元数据
    url?: string;       // 歌曲播放URL
    md5?: string;       // 文件MD5值
    size?: number;      // 文件大小(字节)
    bitrate?: number;   // 比特率
    isFavorite?: boolean; // 是否喜欢
    lyric?: Lyric;      // 歌词信息
    [key: string]: any; // 其他元数据
  };
}
```

### Artist

```typescript
interface Artist {
  id: id;             // 艺术家ID
  name: string;       // 艺术家名称
  avatar?: string;    // 艺术家头像
}
```

### Album

```typescript
interface Album {
  id: id;             // 专辑ID
  name: string;       // 专辑名称
  cover?: string;     // 专辑封面
  artists?: Artist[]; // 艺术家
  size?: number;      // 歌曲数量
}
```

### Lyric

```typescript
interface Lyric {
  normal?: string;       // 原文歌词(LRC格式)
  transliteration?: string; // 音译歌词(LRC格式)
  translation?: string;    // 翻译歌词(LRC格式)
}
```

LRC格式示例:
```
[00:04.000] 第一行歌词
[00:08.000] 第二行歌词
```