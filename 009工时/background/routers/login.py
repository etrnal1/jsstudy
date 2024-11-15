#通过form 来获取
from fastapi import APIRouter, HTTPException,Form
from pydantic import BaseModel

# 创建api router 

router = APIRouter() 
# 定义数据模型

    
# 模拟库
fake_users_db = {"testuser":"w123"}
#登录接口
@router.post("/login")
def login(username:str = Form(...) ,password:str = Form(...) ):
    print(Form(...))
    print("获取传递过来的用户名: ",username)
    if username not in fake_users_db:
        return {"message": "不存在的用户名"}
    if fake_users_db[username]!=password:
        return {"message": "密码不正确"}
    return {"message":"login success"}