# 数据模型

> ⚠️ **注意**: 数据源基本格式定义文档正在撰写中。当前信息可能不完整或有变更。

## 基础类型

### ID类型

```typescript
type id = number | string;
```

API中的ID可以是数字或字符串类型。部分特殊ID，如`daily_songs`（每日推荐歌曲）使用字符串类型。

### 比特率

```typescript
type Bitrate = number;
```

比特率用于指定音频质量，单位为bps（比特/秒）。常见值：
- 128000: 标准音质
- 192000: 较高音质
- 320000: 高音质
- 999000: 无损音质

### 播放列表类型

```typescript
type PlaylistType = 'normal' | 'album' | 'dj' | 'artist';
```

- `normal`: 普通播放列表
- `album`: 专辑
- `dj`: 电台节目
- `artist`: 艺术家热门歌曲

## 核心模型

### 用户(User)

```typescript
interface User {
  // 用户ID
  id: id;
  // 用户名称
  name: string;
  // 用户头像URL
  avatar?: string;
  // 用户简介
  description?: string;
}
```

用户模型包含基本的用户信息，如ID、名称、头像等。

### 播放列表(Playlist)

```typescript
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

播放列表模型包含播放列表的基本信息以及包含的歌曲列表。

### 歌曲(Song)

```typescript
interface Song {
  // 歌曲ID
  id: id;
  // 歌曲名称
  name?: string;
  // 别名或翻译名
  tns?: string[];
  // 歌手列表
  artists?: Artist[];
  // 专辑信息
  album?: Album;
  // 时长(毫秒)
  duration?: number;
  // 播放权限
  privilege?: Privilege;
  // 元数据
  meta?: SongMeta;
}
```

歌曲模型包含歌曲的基本信息、所属专辑、艺术家、播放权限等。

### 播放权限(Privilege)

```typescript
interface Privilege {
  // 是否可播放
  playable: boolean;
  // 不可播放原因
  reason?: string;
  // 可用码率列表
  bitrates?: Bitrate[];
  // 最高可用码率
  maxBitrate?: Bitrate;
}
```

播放权限模型定义了歌曲是否可播放以及可用的音质选项。

### 歌曲元数据(SongMeta)

```typescript
interface SongMeta {
  // 歌曲播放URL
  url?: string;
  // 文件MD5值
  md5?: string;
  // 文件大小(字节)
  size?: number;
  // 比特率
  bitrate?: number;
  // 是否为收藏歌曲
  isFavorite?: boolean;
  // 歌词信息
  lyric?: Lyric;
  // 其他元数据
  [key: string]: any;
}
```

歌曲元数据包含了播放所需的URL、文件信息、歌词等。

### 歌词(Lyric)

```typescript
interface Lyric {
  // 原文歌词(LRC格式)
  normal?: string;
  // 音译歌词(LRC格式)
  transliteration?: string;
  // 翻译歌词(LRC格式)
  translation?: string;
}
```

歌词使用标准的LRC格式，包含时间戳和对应的歌词文本。

示例：
```
[00:00.000] 作词 : 方文山
[00:01.000] 作曲 : 周杰伦
[00:02.000] 编曲 : 钟兴民
[00:03.000]
[00:04.000] 夜沉默了
[00:07.483] 心事浮上来
```

### 艺术家(Artist)

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

艺术家模型包含基本的艺术家信息。

### 专辑(Album)

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
```

专辑模型包含专辑的基本信息及所属艺术家。

## 认证相关模型

### 账户资料(AccountProfile)

```typescript
interface AccountProfile {
  // 用户ID
  userId: id;
  // 用户昵称
  nickname: string;
  // 用户头像
  avatarUrl: string;
}
```

账户资料模型包含登录用户的基本信息。

### 二维码创建响应(QrCreateResponse)

```typescript
interface QrCreateResponse {
  // 二维码内容URL
  qrurl: string;
  // 二维码图片(Base64编码)
  qrimg: string;
}
```

### 二维码检查响应(QrCheckResponse)

```typescript
interface QrCheckResponse {
  // 状态码：-1 过期，0 等待扫码，1 等待确认，2 授权登录成功
  status: number;
  // Cookie信息
  cookie: string;
}
```

### 登录状态响应(StatusResponse)

```typescript
type StatusResponse = User;
```

登录状态响应返回当前登录用户的信息。