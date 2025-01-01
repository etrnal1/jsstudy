---
title: "JWT 验证登录"
date: "2024-12-30"
---
JWT (JSON Web Token) 介绍

JWT (JSON Web Token) 是一种开放标准 (RFC 7519)，它定义了一种紧凑、自包含的方式，用于在各方之间以 JSON 对象的形式安全地传输信息。JWT 主要用于以下场景：
	1.	身份验证 (Authentication)：用户登录成功后，服务器生成一个 JWT 并发送给客户端。客户端可以将其存储在 localStorage 或 Cookie 中，之后的请求会携带该 JWT，服务器通过验证 JWT 来确认用户身份。
	2.	信息交换 (Information Exchange)：在多个服务之间安全地传递信息，JWT 可以对数据进行签名以保证信息的真实性。

JWT 的结构

JWT 由三部分组成，每部分用 . 分隔：

header.payload.signature

1. Header (头部)

Header 通常包含两部分信息：
	•	类型 (typ): 指定令牌类型为 JWT。
	•	算法 (alg): 声明签名的算法（如 HS256、RS256）。

示例:

{
  "alg": "HS256",
  "typ": "JWT"
}

编码后（Base64Url）:

eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9

2. Payload (载荷)

Payload 是 JWT 的主体部分，用于存储需要传递的数据（声明，Claims）。
它包含两种类型的声明：
	•	注册声明 (Registered Claims): 包括 iss (签发者)、exp (过期时间)、sub (主题)、aud (受众)。
	•	公共声明 (Public Claims): 可以自定义，比如用户 ID、角色等。
	•	私有声明 (Private Claims): 提供给特定方的自定义数据。

示例:

{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}

编码后（Base64Url）:

eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9

3. Signature (签名)

签名部分通过以下步骤生成，用于确保令牌没有被篡改：
	1.	使用编码后的 Header 和 Payload。
	2.	使用指定算法和一个密钥（如 HMAC SHA256）。
	3.	生成一个签名。

公式：

HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret
)

示例签名:

SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

JWT 的工作原理
	1.	客户端发送登录请求：
	•	用户通过用户名和密码登录。
	•	服务器验证用户身份。
	•	验证成功后生成 JWT 并返回给客户端。
	2.	客户端存储 JWT：
	•	客户端可以将 JWT 存储在 localStorage、sessionStorage 或安全的 Cookie 中。
	3.	客户端请求附带 JWT：
	•	客户端在每次请求时，将 JWT 放在 Authorization 头中：

Authorization: Bearer <token>


	4.	服务器验证 JWT：
	•	服务器通过签名密钥验证 JWT 的合法性。
	•	如果验证成功，解析并提取用户信息。

JWT 的优点
	1.	轻量级：结构紧凑，传输效率高。
	2.	自包含：携带了所有必要的信息，减少服务器的依赖。
	3.	跨语言支持：多种编程语言都支持 JWT。
	4.	安全：签名确保了数据的真实性，防止篡改。

JWT 的不足
	1.	过期时间问题：JWT 一旦签发，无法撤销，直到到期失效。
	2.	密钥管理：需要妥善管理签名密钥，避免泄漏。
	3.	大小限制：JWT 通常比传统的会话标识 (session ID) 更大，可能影响网络性能。

JWT 的常见使用场景
	1.	用户登录认证：用户登录后返回 JWT，后续请求通过 JWT 验证用户身份。
	2.	分布式系统认证：在微服务架构中，多个服务共享 JWT，避免频繁查询认证中心。
	3.	信息传递：在多个服务之间传递受信数据。

在代码中的实现

在你的代码中，已经使用了 JWT：
	•	生成 JWT：

const token = jwt.sign({ userName }, SEKYE_KEY, { expiresIn: '1h' });

	•	jwt.sign() 方法生成了一个有效期为 1 小时的 JWT，携带 userName 作为载荷。

	•	验证 JWT（未实现，但可如下补充）：

const decoded = jwt.verify(token, SEKYE_KEY);
console.log(decoded); // { userName: '1026177564@qq.com', iat: ..., exp: ... }



通过这种方式，你可以在系统中使用 JWT 来管理用户认证和权限。需要更深入的代码示例或优化，请告诉我！