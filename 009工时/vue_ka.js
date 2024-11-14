new Vue({
    el: "#app",
    data: {
        status: "未打卡",
        currentTime: new Date() ,// 初始化为当前时间
        katime:''
    },
    computed: {
        formattedTime() {
            // 确保 currentTime 是 Date 对象
            return this.currentTime instanceof Date ? this.currentTime.toLocaleTimeString() : '';
        }
    },
    mounted() {
        // 每秒更新 currentTime，确保它是 Date 对象
        this.timer = setInterval(() => {
            this.currentTime = new Date(); // 保证 currentTime 是一个 Date 对象
        }, 1000);
    },
    beforeDestroy() {
        // 清除定时器
        clearInterval(this.timer);
    },
    methods: {
        ka() {
           
            this.status = "打卡成功";
            this.katime=  this.currentTime.toLocaleTimeString() ;
        }
    }
});