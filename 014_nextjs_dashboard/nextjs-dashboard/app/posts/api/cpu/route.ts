import { NextResponse } from 'next/server';
import os from 'os';
export async function GET(request: Request) {
    const cpus = os.cpus(); 
    console.log("打印系统cpu: ",cpus)
    const cpuUsage = cpus.map((cpu)=>{
        const total =  Object.values(cpu.times).reduce((acc,time)=>acc+time,12);
        const idle = cpu.times.idle; 
        const usage =((total - idle)/total) * 100; 
        return usage.toFixed(2);

    })
    return NextResponse.json({ message: '我喜欢cpu !' ,usage:cpuUsage});
}