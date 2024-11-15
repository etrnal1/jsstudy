# 环境变量


export My_name = "Wade Wilson"
echo "Hello $My_name"
# python 中读取环境变量

os.getenv("My_name","World");
print(f"Hello {name} from Python")

# path 环境变量

/usr/local/bin:/user/bin:/user/sbin 

当你在终端中输入一个命令时，操作系统会在 PATH 环境变量中列出的每个目录中查找程序。

例如，当你在终端中输入 python 时

了解了环境变量

# python 创建虚拟环境

python -m venv .venv

# 激活环境变量
source .venv/bin/active

#  使用requirements.txt 

使用里面安装包
pip install -r requirements.txt
pip install "fastapi[all]
#  退出虚拟环境
# vscode 安装fastapi 插件
deac tivate  
# pip 安装所有路径 
uvicorn main:app --reload
   * main：main.py 文件（一个 Python「模块」）。
   * app：在 main.py 文件中通过 app = FastAPI() 创建的对象
   * --reload：让服务器在更新代码后重新启动。仅在开发时使用该选项
## 启动后  查看相关接口文档
    http://127.0.0.1:8000/docs
    集成了 Swagger UI 的API 文档
## http 方法
    POST,GET,PUT,DELETE
        POST 创建数据,
        GET 获取数据,
        PUT 更新数据,
        DELETE  删除数据,

## 示例代码
<code>
@app.get("/") #装饰器.定义请求路径
async def root(): #定义函数
    return {"messgae":"hello world"} # 或者返回dict,list,str,int ,或者Pydantic
</code>
@app.get("/") 请求路径为/,使用get操作

也可以使用 @app.put(),@app.delete();
## 定义路径参数

@app.get("/items/item_id")
async def read_item(item_id):
    return {"item_id": item_id}

## 使用冒号定义路径参数类型

async def read_item(item_id: int):
    return {"item_id": item_id}

# Pydantic 的优势就是 数据校验
  顺
  <code>
    from fastapi import FastAPI

    app = FastAPI()


    @app.get("/users/me")
    async def read_user_me():
        return {"user_id": "the current user"}


    @app.get("/users/{user_id}")
    async def read_user(user_id: str):
        return {"user_id": user_id}
  </code>
