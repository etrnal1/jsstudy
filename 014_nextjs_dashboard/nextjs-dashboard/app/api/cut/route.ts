import { NextResponse } from "next/server"
import cron from 'node-cron';
import { promises as fs } from 'fs';
import path from 'path';

// 存储任务的文件路径
const TASKS_FILE = path.join(process.cwd(), 'data', 'tasks.json');

// 确保任务文件存在
async function ensureTaskFile() {
    try {
        await fs.access(TASKS_FILE);
    } catch {
        await fs.mkdir(path.dirname(TASKS_FILE), { recursive: true });
        await fs.writeFile(TASKS_FILE, '[]');
    }
}

// 读取所有任务
async function readTasks() {
    await ensureTaskFile();
    const data = await fs.readFile(TASKS_FILE, 'utf8');
    return JSON.parse(data);
}

// 保存任务
async function saveTasks(tasks: any[]) {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

export async function POST(req: Request) {
    try {
        console.log("读取任务id")
        const body = await req.json();
        // 打印获取的数据
        console.log("query data: ",body)
        const { title, cronExpression, command, description,status } = body;

        // 验证必要字段
        if (!title || !description || !command || !description) {
            return NextResponse.json({
                message: "Missing required fields",
                code: 400
            });
        }

        // 读取现有任务
        
       const tasks = await readTasks();

        // 创建新任务
        const newTask = {
            id: Date.now().toString(),
            title,
            cronExpression,
            command,
            description,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // 添加新任务
        tasks.push(newTask);
        await saveTasks(tasks);

        // 设置定时任务
        // const taskDate = new Date(dueDate);
        // const cronExpression = `${taskDate.getMinutes()} ${taskDate.getHours()} ${taskDate.getDate()} ${taskDate.getMonth() + 1} *`;
        
        // cron.schedule(cronExpression, () => {
        //     console.log(`执行任务: ${name}`);
        //     // 这里可以添加任务执行的具体逻辑
        // });

        return NextResponse.json({
            message: "Task created successfully",
            code: 200,
            task: newTask
        });

    } catch (e: unknown) {
        console.error('Error creating task:', e);
        return NextResponse.json({
            message: "Failed to create task",
            error: e instanceof Error ? e.message : String(e),
            code: 500
        });
    }
}

export async function GET(req: Request) {
    try {
        const tasks = await readTasks();
        return NextResponse.json({
            message: "Tasks retrieved successfully",
            code: 200,
            tasks
        });
    } catch (e: unknown) {
        return NextResponse.json({
            message: "Failed to retrieve tasks",
            error: e instanceof Error ? e.message : String(e),
            code: 500
        });
    }
}