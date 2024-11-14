new Vue({
    el: '#app',
    // 定义数据
    data: {
        start_time: "8:30",
        end_time: "17:30",
        message: '',
        cs: '',
        result: ''
    },
    // 定义函数
    methods: {
        Fgets() {
            // 创建上班时间和下班时间
            const startTime = new Date("2024-11-13T17:30:00"); // 上班时间
            const endTime = new Date("2024-11-14T08:30:00");   // 下班时间

            // 计算时间差（以毫秒为单位）
            const timeDifference = endTime - startTime;

            // 将时间差转换为小时和分钟
            const millisecondsInHour = 1000 * 60 * 60;
            const millisecondsInMinute = 1000 * 60;

            // 计算小时和分钟
            const hours = Math.floor(timeDifference / millisecondsInHour);
            const minutes = Math.floor((timeDifference % millisecondsInHour) / millisecondsInMinute);
            this.result = `工作时长: ${hours} 小时 ${minutes} 分钟`


        }
    }
})