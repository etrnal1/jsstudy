import fastapi,os
# 接收first_name和last_name两个参数，返回两个参数的拼接字符串
def get_full_name(first_name,last_name):
    fullname=first_name+" "+last_name
    return fullname 

print(get_full_name("赵丽沙","何云"))
# 获取环境变量

name=os.getenv("My_name","World");
print(f"Hello {name} from Python")