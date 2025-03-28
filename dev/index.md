# 入门指南

> ⚠️ **注意**: 数据源基本格式定义文档正在撰写中。当前信息可能不完整或有变更。
## 简介

云享社音乐数据源API提供了一套统一的接口，用于访问多个音乐平台的资源。本文档将帮助你快速上手API的使用。

## 认证方式

API支持以下认证方式：

### Token认证

所有请求需要在HTTP头部包含Token：

```
Token: YOUR_TOKEN_HERE
```

或者使用Bearer格式：

```
Token: Bearer YOUR_TOKEN_HERE
```

### 二维码认证流程

如果你没有Token，可以通过以下步骤获取：

1. 调用 `/connect/qr/key` 获取唯一密钥
2. 使用密钥调用 `/connect/qr/create` 获取二维码
3. 引导用户扫描二维码
4. 定期调用 `/connect/qr/check` 检查认证状态
5. 认证成功后，保存返回的cookie作为后续请求的Token

### 基本请求参数

所有请求都会自动添加以下基本参数：

- `timestamp`: 当前时间戳
- `cookie`: 从请求头的Token中提取
- `realIP`(可选): 客户端真实IP
- `proxy`(可选): 代理服务器

## 响应格式

所有API响应均遵循统一格式：

```json
{
  "code": 0,          // 状态码，0表示成功
  "message": "Success", // 状态信息
  "data": {},         // 实际数据
  "timestamp": "2025-03-28T10:30:00.000Z" // 时间戳
}
```

## 状态码

| 状态码 | 说明 |
|-------|------|
| 0     | 请求成功 |
| -1    | 一般错误 |
| -801  | 二维码已过期 |
| -800  | 等待扫码 |
| -799  | 等待确认 |
| -798  | 授权登录成功 |

## 示例请求

### 获取用户状态

```bash
curl -H "Token: YOUR_TOKEN_HERE" https://api.example.com/connect/status
```

### 搜索歌曲

```bash
curl -H "Token: YOUR_TOKEN_HERE" https://api.example.com/search?keywords=周杰伦&limit=5
```

## 调用频率限制

为了保障服务质量，API有一定的调用频率限制，请合理控制请求频率。

## 下一步

- 查看[数据模型](models.md)了解API返回的数据结构
- 查看[API参考](api-reference.md)了解所有可用的API端点
- 查看[最佳实践](best-practices.md)了解如何高效使用API