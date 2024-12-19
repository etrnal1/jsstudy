import { NextResponse } from "next/server";
import cron from "node-cron";
import { promises as fs } from "fs";
import path from "path";

// 存储任务的文件路径 - 用于保存所有定时任务的配置信息
const TASKS_FILE = path.join(process.cwd(), "data", "tasks.json");
const TASKS_DIR = path.join(process.cwd(), "tasks"); // 添加任务脚本目录常量

// 确保任务文件存在 - 如果文件不存在则创建一个空的任务文件
async function ensureTaskFile() {
    try {
        await fs.access(TASKS_FILE);
    } catch {
        await fs.mkdir(path.dirname(TASKS_FILE), { recursive: true });
        await fs.writeFile(TASKS_FILE, '[]');
    }
}

// 确保任务脚本目录存在
async function ensureTasksDirectory() {
    try {
        await fs.access(TASKS_DIR);
    } catch {
        await fs.mkdir(TASKS_DIR, { recursive: true });
    }
}

// 读取所有任务 - 从文件中读取所有已配置的定时任务
async function readTasks() {
    await ensureTaskFile();
    const data = await fs.readFile(TASKS_FILE, "utf8");
    return JSON.parse(data);
}

// 保存任务 - 将更新后的任务列表保存到文件中
async function saveTasks(tasks: any[]) {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// POST接口 - 用于启动指定ID的定时任务
export async function POST(req: Request ) {
    try {
       // const { taskId } = params;
    //    console.log("正在处理的定时任务ID: ", params)
        
        // 从文件中读取所有任务
        const tasks = await readTasks();
        const body = await req.json(); 
        console.log("打印传输的信息： ",body);
        // return NextResponse.json({
        //     message:"hello",
        //     code:200
        // });
        const taskId =  body;
        // 根据taskId查找对应的任务
        const task = tasks.find((task: any) => task.id === taskId);
        if (!task) {
            return NextResponse.json({
                message: "未找到指定的任务",
                code: 404,
            });
        }
        console.log("找到的定时任务详情: ", task)

        // 确保任务脚本目录存在
        await ensureTasksDirectory();

        // 使用固定的脚本文件名，基于taskId
        const scriptSh = path.join(TASKS_DIR, `task_${taskId}.sh`);
        
        // 只有当脚本不存在时才创建
        try {
            await fs.access(scriptSh);
        } catch {
            await fs.writeFile(scriptSh, task.command);
            await fs.chmod(scriptSh, 0o755); // 设置脚本可执行权限
        }

        // 启动定时任务 - 根据配置的cron表达式定时执行命令
        cron.schedule(task.cronExpression, () => {
            try {
                console.log("正在执行任务脚本: ", scriptSh, new Date());
                const { spawn } = require('child_process');
                const child = spawn(scriptSh, [], {
                    shell: true,
                    stdio: ['inherit', 'pipe', 'pipe']
                });

                child.stdout.on('data', (data: Buffer) => {
                    console.log(`输出: ${data.toString()}`);
                });

                child.stderr.on('data', (data: Buffer) => {
                    console.error(`错误输出: ${data.toString()}`);
                });

                child.on('error', (error: Error) => {
                    console.error(`执行错误: ${error.message}`);
                });

                child.on('close', (code: number) => {
                    if (code !== 0) {
                        console.error(`进程退出，退出码: ${code}`);
                    } else {
                        console.log('任务执行完成');
                    }
                });
            } catch(e) {
                console.error("任务执行出错:", e);
            }
        });

        // 更新任务状态为运行中
        task.status = "running";
        await saveTasks(tasks);

        return NextResponse.json({
            message: "任务启动成功",
            code: 200,
            task,
        });
    } catch (e: unknown) {
        console.error("任务启动失败:", e);
        return NextResponse.json({
            message: "任务启动失败",
            error: e instanceof Error ? e.message : String(e),
            code: 500,
        });
    }
}