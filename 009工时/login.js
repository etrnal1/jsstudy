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
              
                // 返回成功则成功。不成功则失败
                if(response.data.success){
                    this.message= "登录成功"
                    this.messageClass= "alert-success"
                    window.location("./dashboard.html")
                }else{
                    this.message= response.data.message||'登录失败'
                    this.messageClass="alert-error"
                }
            }catch(e){
                            
                this.message=e
                this.messageClass="alert-danger"
            }
           
        }   
    }
})