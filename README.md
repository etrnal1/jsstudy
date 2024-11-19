好的！为了方便你分开验证和及时查询，我将上面知识点总结成独立代码片段和简明注释。你可以复制到自己的项目中测试和学习。

1. 对象与原型链

// 创建一个简单对象
const obj = {
    name: "Alice",
    age: 25,
};

// 验证对象属性与原型链
console.log(obj.name);  // 输出: Alice
console.log(obj.age);   // 输出: 25
console.log(obj.hasOwnProperty("name"));  // true (自身属性)
console.log(obj.hasOwnProperty("toString"));  // false (继承自原型链)
console.log(Object.getPrototypeOf(obj) === Object.prototype);  // true

2. JavaScript 函数

// 函数可以作为对象和参数
function greet(name) {
    console.log(`Hello, ${name}!`);
}

// 函数作为参数传递
function execute(func, value) {
    func(value);
}
execute(greet, "Alice");  // 输出: Hello, Alice!

3. Bootstrap 样式测试

3.1 基本布局

<div class="container my-4">
    <div class="row">
        <div class="col-md-4" style="background-color: lightblue;">列1</div>
        <div class="col-md-4" style="background-color: lightgreen;">列2</div>
        <div class="col-md-4" style="background-color: lightcoral;">列3</div>
    </div>
</div>

3.2 按钮圆角

<button class="btn btn-primary" style="border-radius: 50%; width: 100px; height: 100px;">圆形按钮</button>

3.3 设置偏移

<div class="container">
    <div class="row">
        <div class="col-md-4 offset-md-4" style="background-color: lightpink;">居中偏移列</div>
    </div>
</div>

3.4 表单两元素同一行

<div class="input-group mb-3">
    <span class="input-group-text">@</span>
    <input type="text" class="form-control" placeholder="用户名">
</div>

4. Vue 与 Axios 发送表单数据

4.1 Vue 模板代码

<div id="app">
    <form @submit.prevent="handleLogin">
        <div class="mb-3">
            <input type="text" v-model="form.username" class="form-control" placeholder="用户名">
        </div>
        <div class="mb-3">
            <input type="password" v-model="form.password" class="form-control" placeholder="密码">
        </div>
        <button type="submit" class="btn btn-primary">登录</button>
    </form>
    <p v-if="message" :class="messageClass">{{ message }}</p>
</div>

4.2 Vue 脚本代码

new Vue({
    el: "#app",
    data: {
        form: {
            username: "",
            password: "",
        },
        message: null,
        messageClass: "",
    },
    methods: {
        async handleLogin() {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:8000/auth/login",
                    new URLSearchParams(this.form),
                    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
                );
                this.message = "登录成功";
                this.messageClass = "alert-success";
            } catch (error) {
                this.message = "登录失败";
                this.messageClass = "alert-danger";
            }
        },
    },
});

5. FastAPI 接口

5.1 FastAPI 基本接口

from fastapi import FastAPI, Form, HTTPException

app = FastAPI()

@app.post("/auth/login")
def login(username: str = Form(...), password: str = Form(...)):
    if username == "testuser" and password == "123456":
        return {"success": True, "message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

5.2 添加 CORS 支持

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源
    allow_methods=["*"],  # 允许所有 HTTP 方法
    allow_headers=["*"],  # 允许所有 HTTP 头
)

6. URLSearchParams 发送表单数据

// 转换表单数据为 x-www-form-urlencoded 格式
const data = new URLSearchParams({
    username: "testuser",
    password: "123456",
});

axios.post("http://127.0.0.1:8000/auth/login", data, {
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
});

7. 布局间距控制

7.1 设置上下间距

<div class="mb-3" style="background-color: lightblue;">下方间距 3</div>
<div class="mt-5" style="background-color: lightcoral;">上方间距 5</div>

7.2 设置网格间距

<div class="container">
    <div class="row g-3">
        <div class="col" style="background-color: lightgray;">列1</div>
        <div class="col" style="background-color: lightyellow;">列2</div>
    </div>
</div>

8. Flexbox 简单测试

<div style="display: flex; justify-content: center; align-items: center; height: 200px; background-color: lightgray;">
    <p>居中内容</p>
</div>

如何使用这些代码

	1.	测试代码：
	•	将代码段分别粘贴到自己的 HTML 文件或 JS 文件中，测试每个功能。
	2.	记录问题：
	•	在运行代码时记录可能遇到的问题（如错误消息、样式问题等），并逐步解决。
	3.	扩展和练习：
	•	修改代码样式或行为，加入自己的逻辑，确保完全理解。

后续学习建议

	1.	实践驱动：
	•	使用这些代码完成一个完整的小项目，如登录页面或表单。
	2.	查阅文档：
	•	熟悉 Bootstrap 和 FastAPI 官方文档，了解工具的更多功能。
	3.	不断优化：
	•	尝试更高级的布局（如 Grid 或自定义组件）。

如需进一步扩展或有其他问题，可以随时告诉我！ 😊


## 安装shadrow 

```
    npx shadcn@latest init
```    