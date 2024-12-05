// 处理所遇见的error 信息
'use client'

import {useEffect} from 'react' 
export default function Error({
    error,
    reset

}:{
    error: Error &{ digest?: string};
    // 重新渲染route segment
    reset: () =>void;

}){
    useEffect(() =>{
        console.log(error);
    },[error]);
    return (
        <main className='flex h-full flex-col items-center justify-center'>
            <h2 className="text-center  justify-center item-center text-green-600">
               发生了一些错误
            </h2>
            <button className= "mt-4 bg-blue-500 rouded-md text-sm text-white hover:bg-blue-400 transition-colors px-4 py-2" onClick = {()=>reset()}>请再次尝试</button>

        </main>
    )
}
