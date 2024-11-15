# js 里面的对象

{} 对象,容器,往容器里面填写代码

## 函数是什么

函数可以是对象，可以保存至，可以作为参数
传递给其他函数当参数

## 对象的原型

// 创建一个简单对象
const obj = {
    name: "Alice",
    age: 25
};

// 访问对象自身的属性
console.log(obj.name);  // 输出: Alice
console.log(obj.age);   // 输出: 25

// 访问继承自 Object.prototype 的方法
console.log(obj.toString());  // 输出: [object Object]

// 验证 obj 的原型链是否指向 Object.prototype
console.log(Object.getPrototypeOf(obj) === Object.prototype);  // 输出: true

// 使用 Object.prototype.hasOwnProperty 来检查属性是否是自身的属性
console.log(obj.hasOwnProperty("name"));  // 输出: true
console.log(obj.hasOwnProperty("toString"));  // 输出: false (toString 是继承来的)

## 作用域


## 
/**
 * 什么是对象 创建一个对象。对象拥有了一些数据和功能,你现在可以
 * 1. 子命名空间
 * names:{
        first:"bOB",
        last:"heyun"
    },
    访问子命名空间,使用.
    2. this 的含义
    this 指向的是对象本身
    3. 构造函数工作的流程..
    (1) 创建新对象，
    (2) 将this 绑定到新对象
    (3) 运行构造函数中的代码
    (4) 返回新对象
    4. 点表示法
       使用. 表示法 
        myString.split(",")
      5.理解  myString.split(",") 这个过程
        当创建字符串的时候，会自动生成字符串的实例子，然后就可以钓鱼字符串的方法。
    

 */

 ## 理解什么是原型,原型链如何工作,以及如何为一个对象设置原型



## 理解bootstrap

 1. 将按钮变成圆 .border-radius 50% 高100px,宽100px;
    2.中等屏幕md,小屏幕xs
     col-md-8  col-xs-6
    2.如何设置bootstrap row 里面的颜色
    通过row 和col 的组合来创建


    	超小设备手机（<768px）	小型设备平板电脑（≥768px）	中型设备台式电脑（≥992px）	大型设备台式电脑（≥1200px）

3. 设置支持多个列 宽度

    <div class="col-xs-6 col-sm-3" 
            style="background-color: #dedef8;
            box-shadow: inset 1px -1px 1px #444, inset -1px 1px 1px #444;">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
        </div>

4. 理解bootstrap 的偏移

​		`offset`

4. 让表单里面两个元素在一行 使用

​	

```html
 <div class="input-group mb-3">
                        <span class="input-group-text">
                            <i class="bi bi-person"></i> <!-- 用户图标 -->
                        </span>
                        <input type="text" class="form-control" v-model ="form.username" placeholder="用户名">
                    </div>
```

  form -check  mb-3   b指的是Bottom,向下的含义

```
<div class="form-check mb-3">
                        <input type="checkbox" class="form-check-input" id="rememberMe">
                        <label class="form-check-label" for="rememberMe">记住用户名</label>
                   </div>
```



## 理解fastapi 

#### 理解vue2,向后台发送接口数据

​	使用axios ,设置发送数据类型为form 类型

```js
await axios.post(
    "http://127.0.0.1:8000/auth/login",
    new URLSearchParams({
        username: "testuser",
        password: "123456"
    }),
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }
);
```

### 启动main

```bash
uvicorn main:app --reload
```





#### fastapi 如何接收数据

#### 前端一个接口,后端一个接口,不同,如何操作

​	设置cros 

```python
from fastapi.middleware.cors import CORSMiddlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源（生产环境中应限制域名）
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有 HTTP 方法
    allow_headers=["*"],  # 允许所有 HTTP 头
)
```



​	

    new URLSearchParams 是基于 Web 标准 API 提供的方法，它是 JavaScript 原生支持的一个类，用于操作 URL 查询字符串。它允许你轻松创建和操作查询参数（键值对）集合，非常适合表单数据的处理和 URL 参数的管理。

用途

	•	构建 application/x-www-form-urlencoded 格式的表单数据（表单提交的标准格式）。
	•	解析和修改现有的查询字符串。

工作原理

URLSearchParams 提供了一种接口，用来生成或解析查询字符串。它将参数以键值对的形式存储，便于操作和序列化。

使用场景



4. 与 axios 配合发送表单数据

	•	URLSearchParams 将键值对转换为 application/x-www-form-urlencoded 格式，这是表单数据的标准格式。



底层支持

URLSearchParams 是现代浏览器（包括 Node.js 的 url 模块）的一部分，它基于 Web 标准实现。现代 JavaScript 环境（如 ES6+）已经原生支持这个类，无需额外导入。

兼容性

	•	支持大部分现代浏览器（如 Chrome、Firefox、Edge）。
	•	在 IE 中不支持，可以通过 polyfill（如 core-js）提供兼容。

总结

URLSearchParams 是一个高效且方便的工具，用于处理 URL 查询字符串和表单数据。它适用于生成 x-www-form-urlencoded 格式的数据，与后端表单接口（如 FastAPI 的 Form）非常契合。

根据你提供的代码和描述，我帮你复盘之前的问题和解决的过程，找出问题所在，并提炼解决问题的方法，以便将来避免类似错误。

问题复盘

1. 前端 Axios 请求

之前代码中：

```js
const response = await axios.post(
    "http://127.0.0.1:8000/auth/login",
    this.form
);
```





问题点：

	•	数据格式错误：FastAPI 的后端期望 application/x-www-form-urlencoded 格式，但你发送的数据是默认的 JSON 格式（this.form 是一个普通对象）。
	•	未正确设置请求头：没有显式指定 Content-Type。

解决方法：

通过 new URLSearchParams() 将数据转换为 x-www-form-urlencoded 格式，同时正确设置请求头：

```js
const response = await axios.post(
    "http://127.0.0.1:8000/auth/login",
    new URLSearchParams({
        username: this.form.username,
        password: this.form.password,
    }),
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }
);
```





2. FastAPI 后端

FastAPI 后端的登录接口代码如下：

```js
@app.post("/auth/login")
def login(username: str = Form(...), password: str = Form(...)):
    if username != "testuser" or password != "w123":
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"success": True, "message": "Login successful"}


```



问题点：

	•	FastAPI 使用了 Form 来解析表单数据，但前端没有以表单格式发送请求，导致 FastAPI 无法解析请求体，并返回 422 Unprocessable Entity 错误。

解决方法：

前端发送表单格式的数据（application/x-www-form-urlencoded）后，FastAPI 可以正确解析 Form 数据。

3. Axios 错误处理

之前代码中：

```js
catch(e){
    this.message = e;
    this.messageClass = "alert-danger";
}
```





问题点：

	•	直接将 e 赋值给 this.message，会输出复杂的错误对象，而非用户友好的错误信息。
	•	未区分不同类型的错误（网络错误 vs. 后端错误）。

解决方法：

在 catch 块中，提取并显示更具体的错误信息：

```js
catch(e){
    if (e.response) {
        // 服务器返回了错误响应
        this.message = e.response.data.detail || "服务器错误";
    } else if (e.request) {
        // 请求未发送成功
        this.message = "网络错误，请检查你的连接";
    } else {
        // 其他未知错误
        this.message = "未知错误：" + e.message;
    }
    this.messageClass = "alert-danger";
}
```



4. 重定向问题

之前代码中：

window.location("./dashboard.html")

问题点：

	•	window.location 应该是一个属性，而非函数调用。
	•	正确的用法是直接赋值路径。

解决方法：

修正为：

window.location = "./dashboard.html";

错误总结

	1.	数据格式不匹配：
	•	前端未正确设置 Content-Type，导致后端无法解析请求体。
	•	解决方法：前端转换数据格式为 x-www-form-urlencoded。
	2.	错误处理不友好：
	•	捕获的错误未分类，直接将错误对象赋值给用户提示。
	•	解决方法：细化错误处理，区分后端错误、网络错误和未知错误。
	3.	API 重定向逻辑错误：
	•	使用了错误的 window.location 语法。
	•	解决方法：修正为赋值路径。

完整修正代码

修正后的代码如下：

```js


new Vue({
    el: "#app",
    data: {
        form: {
            username: '',
            password: ''
        },
        message: null,
        messageClass: ''
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/auth/login",
                    new URLSearchParams({
                        username: this.form.username,
                        password: this.form.password
                    }),
                    {
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                    }
                );
                // 根据返回结果处理
            if (response.data.success) {
                this.message = "登录成功";
                this.messageClass = "alert-success";
                window.location = "./dashboard.html"; // 修正了重定向
            } else {
                this.message = response.data.message || "登录失败";
                this.messageClass = "alert-error";
            }
        } catch (e) {
            // 分类错误处理
            if (e.response) {
                this.message = e.response.data.detail || "服务器错误";
            } else if (e.request) {
                this.message = "网络错误，请检查你的连接";
            } else {
                this.message = "未知错误：" + e.message;
            }
            this.messageClass = "alert-danger";
        }
    }
}
  });
```

   

### 总结经验

	1.	数据格式的匹配性：
	•	前端发送数据时，务必明确格式，与后端的预期一致。
	2.	错误处理的细化：
	•	捕获错误时，区分网络问题和后端问题，并提供用户友好的错误信息。
	3.	学习框架的细节：
	•	对于 FastAPI，了解 Form 与 JSON 数据解析的差异。
	•	对于 Vue.js 和 Axios，熟悉正确的 API 和用法。
	4.	调试日志的重要性：
	•	FastAPI 的 422 错误日志非常有用，它详细描述了请求哪里出了问题。
	•	前端可以通过 console.log 检查发送的数据是否正确。

如果还有其他问题需要回顾或深入探讨，可以随时告诉我！ 😊

### 422 错误如何排查

422 Unprocessable Entity 的错误通常表明后端接收到的请求数据格式或字段不符合后端的预期。以下是从前端和后端排查问题的步骤，以确保请求与后端定义的接口匹配。

问题排查步骤

1. 检查 FastAPI 后端定义

确保你的 FastAPI 后端接口与前端发送的字段名称和格式匹配。例如，如果后端使用的是 Form 来接收表单数据，字段定义应如下：

`from fastapi import FastAPI, Form, HTTPException`

`app = FastAPI()`

`@app.post("/auth/login")`
`def login(username: str = Form(...), password: str = Form(...)):`
    `if username != "testuser" or password != "w123":`
        `raise HTTPException(status_code=401, detail="Invalid credentials")`
    `return {"success": True, "message": "Login successful"}`

	•	使用 Form 时，前端必须以 application/x-www-form-urlencoded 格式提交数据。
	•	如果使用的是 JSON 格式，接口定义应如下：

```python
from pydantic import BaseModel

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/auth/login")
def login(request: LoginRequest):
    if request.username != "testuser" or request.password != "w123":
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"success": True, "message": "Login successful"}
```




	•	确保你选择的接收方式（Form 或 JSON）与前端请求一致。

2. 检查 Axios 请求

查看你的代码，问题可能出在以下部分：

const response = await axios.post(
    "http://127.0.0.1:8000/auth/login",
    this.form,
    {
        headers: {
            "Content-Type": "application/json",
        },
    }
);

修正

如果 FastAPI 接收的是 JSON 数据，确保 this.form 格式正确，字段名与后端一致。例如：

this.form = {
    username: "testuser",
    password: "w123"
};

如果 FastAPI 接收的是表单数据（Form），需要使用 URLSearchParams 格式化：

const response = await axios.post(
    "http://127.0.0.1:8000/auth/login",
    new URLSearchParams({
        username: this.form.username,
        password: this.form.password
    }),
    {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    }
);

3. 检查前端发送的数据

为确保发送的数据正确，可以在前端打印 this.form 的内容：

console.log(this.form);

如果使用 application/x-www-form-urlencoded，也可以打印：

console.log(new URLSearchParams(this.form).toString());

4. 后端日志分析

FastAPI 在返回 422 错误时，通常会提供错误的详细信息。查看 FastAPI 日志，可能会看到如下输出：

{
    "detail": [
        {
            "loc": ["body", "username"],
            "msg": "field required",
            "type": "value_error.missing"
        }
    ]
}

根据日志内容，可以得出：
	•	body 表示请求体解析错误。
	•	username 表示缺少该字段。

5. 跨域问题（如果适用）

如果前端和后端运行在不同的地址（例如前端在 http://localhost:3000，后端在 http://127.0.0.1:8000），确保后端启用了 CORS：

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 替换为前端域名
    allow_methods=["*"],
    allow_headers=["*"],
)

综合代码示例

前端代码

new Vue({
    el: "#app",
    data: {
        form: {
            username: "",
            password: ""
        },
        message: null,
        messageClass: ""
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/auth/login",
                    {
                        username: this.form.username,
                        password: this.form.password
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                if (response.data.success) {
                    this.message = "登录成功";
                    this.messageClass = "alert-success";
                    window.location.href = "./dashboard.html";
                } else {
                    this.message = response.data.message || "登录失败";
                    this.messageClass = "alert-error";
                }
            } catch (e) {
                this.message = e.response?.data?.detail || "未知错误";
                this.messageClass = "alert-danger";
            }
        }
    }
});

后端代码

接收 JSON 数据：

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class LoginRequest(BaseModel):
    username: str
    password: str

@app.post("/auth/login")
def login(request: LoginRequest):
    if request.username != "testuser" or request.password != "w123":
        raise HTTPException(status_code=401, detail="Invalid credentials")
    return {"success": True, "message": "Login successful"}

结论

