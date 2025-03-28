# 认证

> ⚠️ **注意**: 数据源基本格式定义文档正在撰写中。当前信息可能不完整或有变更。
## 概述

认证API提供了用户登录和身份验证的功能。云享社音乐使用基于二维码的登录流程，类似于许多主流音乐服务的网页登录方式。

## 认证流程

1. 获取唯一的二维码密钥
2. 使用密钥生成二维码
3. 用户使用移动端应用扫描二维码
4. 应用程序轮询检查二维码状态
5. 用户确认登录后，获取登录凭证(Cookie或Token)
6. 使用该凭证作为后续API请求的Token

## API端点

### 获取二维码密钥

```
GET /connect/qr/key
```

获取用于生成二维码的唯一密钥。

**参数**: 无

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "unikey": "8a3829f1-2935-4d6a-b568-3f6317b5xxx"
  },
  "timestamp": "2025-03-28T10:30:00.000Z"
}
```

### 创建二维码

```
GET /connect/qr/create
```

根据提供的密钥生成二维码。

**参数**:
- `key` (string|number): 二维码密钥，从 `/connect/qr/key` 获取
- `qrimg` (boolean|string, 可选): 是否返回图片，默认为 `true`

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "qrurl": "https://music.app/qrlogin?key=8a3829f1-2935-4d6a-b568-3f6317b5xxx",
    "qrimg": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAA..."
  },
  "timestamp": "2025-03-28T10:30:10.000Z"
}
```

### 检查二维码状态

```
GET /connect/qr/check
```

检查二维码的扫描和授权状态。

**参数**:
- `key` (string|number): 二维码密钥

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "status": 0,
    "cookie": ""
  },
  "timestamp": "2025-03-28T10:30:20.000Z"
}
```

**状态码说明**:
- `-1`: 二维码已过期，需要重新生成
- `0`: 等待用户扫描二维码
- `1`: 用户已扫描，等待确认
- `2`: 用户已授权登录成功

当 `status` 为 `2` 时，响应中会包含 `cookie` 字段，该字段可作为后续API请求的Token。

### 获取登录状态

```
GET /connect/status
```

获取当前登录用户的信息。

**参数**: 无

**请求头**:
- `Token`: 用户的登录凭证

**响应**:
```json
{
  "code": 0,
  "message": "Success",
  "data": {
    "id": 12345678,
    "name": "音乐爱好者",
    "avatar": "https://p1.music.app/avatar.jpg"
  },
  "timestamp": "2025-03-28T10:35:00.000Z"
}
```

**错误响应**:
```json
{
  "code": -1,
  "message": "请先登录",
  "data": null,
  "timestamp": "2025-03-28T10:35:00.000Z"
}
```

## 最佳实践

1. **二维码轮询**：扫码登录时，建议以3-5秒的间隔轮询二维码状态
2. **Token存储**：获取到cookie后，应安全存储，避免明文保存
3. **Token刷新**：如遇到Token过期，重新引导用户进行扫码登录
4. **错误处理**：妥善处理未登录、Token过期等异常情况

## 安全提示

- 请勿在客户端明文存储用户Token
- 使用HTTPS确保传输安全
- 避免在公共设备上长时间保持登录状态