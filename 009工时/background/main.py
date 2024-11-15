from fastapi import FastAPI 
from typing import Union
from pydantic import BaseModel  # 引入 Pydantic 的 BaseModel 模型

app = FastAPI()

# 请求体和响应体简介：
# 请求体是从客户端发送到 API 的数据，响应体是 API 返回给客户端的数据。

# 使用 Pydantic 模型声明请求体，定义数据结构和类型
class Item(BaseModel):  # 继承 BaseModel 的类，用于数据验证
    name: str  # 商品名称，必填字段
    description: Union[str, None] = None  # 商品描述，非必填字段，默认为 None
    price: float  # 商品价格，必填字段
    tax: Union[float, None] = None  # 税额，非必填字段，默认为 None

# 定义 POST 请求的路由，创建新项目
@app.post("/items")  # 使用装饰器定义路由，方法为 POST
async def create_item(item: Item):
    """
    接收一个 Item 对象作为请求体。
    将项目名称转换为首字母大写，返回完整的项目信息。
    """
    item.name = item.name.capitalize()  # 将项目名称首字母大写
    return item  # 返回处理后的项目对象

# 定义 GET 请求的根路由，返回欢迎消息
@app.get('/')
async def root():
    """
    返回一个简单的欢迎信息。
    """
    return {"message": "hello world"}

# 定义路径参数示例
@app.get("/item/{item_id}")  # 使用路径参数 {item_id}
def read_item(item_id: int):
    """
    根据路径参数返回用户提供的 ID。
    参数：
        item_id (int): 用户输入的 ID
    返回：
        dict: 包含用户输入 ID 的字典
    """
    return {"返回的用户id": item_id}

# 查询参数示例
# 定义一个模拟数据库
fast_db = [{"apple": "orange"}, {"apple": "banana"}]

@app.get("/result")  # 定义 GET 请求，查询数据
def result_item(skip: int = 0, limit: int = 2):
    """
    根据查询参数 skip 和 limit 从数据库中返回数据。
    参数：
        skip (int): 要跳过的记录数，默认为 0
        limit (int): 要返回的记录数，默认为 2
    返回：
        list: 从数据库中筛选出的记录
    """
    return fast_db[skip: skip + limit]