/**
 * 用户登录逻辑
 */
new Vue ({
    el:"#app",
    data:{
        form:{
            username:'',
            password:''
        },
        message:null,
        messaegClass:''
    },
    methods:{
        async handleLogin(){

            try{
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
                console.log(response.data);
                // 返回成功则成功。不成功则失败
                if(response.data.success){
                    this.message= "登录成功"
                    this.messageClass= "alert-success"
                    console.log("跳转代码执行")
                    window.location.href = "./dashboard.html";
                  
                    
                }else{
                    this.message= response.data.message||'登录失败'
                    this.messageClass="alert-error"
                }
            }catch(e){
                   
                // 对e 进行优化
                if(e.response){

                }else if(e.request){
                    this.message= "网络错误"+": "+"请检查相关后台接口是否启动"

                }else{
                    this.message= "未知错误" + e.message
                }
              
                this.messageClass="alert-danger"
            }
           
        }   
    }
})