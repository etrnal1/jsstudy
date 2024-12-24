import Navigation from '@/app/ui/nextjs/Navigation'
import Card from '@/app/ui/nextjs/Card'

export default function Home() {
    return (
        <div>
            <Navigation />
            
            <main className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card 
                        title="Whisk"
                        titleCn="拂"
                        description="A new experimental tool that lets you use images as prompts to visualize your ideas and tell your story."
                        descriptionCn="一种新的实验工具，可让您使用图像作为提示来可视化您的想法并讲述您的故事。"
                        buttonText="Try it now"
                        buttonTextCn="立即试用"
                        bgColor="bg-pink-100"
                        imageUrl="/images/whisk.jpg"
                        href="#"
                    />
                    
                    <Card 
                        title="Project Mariner"
                        titleCn="水手项目"
                        description="A research prototype exploring the future of human-agent interaction, starting with your browser."
                        descriptionCn="一个探索人机交互未来的研究原型，从您的浏览器开始。"
                        buttonText="Learn more"
                        buttonTextCn="了解更多信息"
                        bgColor="bg-blue-100"
                        imageUrl="/images/mariner.jpg"
                        href="#"
                    />
                    
                    <Card 
                        title="NotebookLM"
                        titleCn="笔记本LM"
                        description="The ultimate tool for understanding the information that matters most to you."
                        descriptionCn="了解对您最重要的信息的终极工具。"
                        buttonText="Try it now"
                        buttonTextCn="立即试用"
                        bgColor="bg-orange-100"
                        imageUrl="/images/notebook.jpg"
                        href="#"
                    />
                    
                    <Card 
                        title="Jules"
                        titleCn="朱尔斯"
                        description="An experimental AI code agent that helps with JavaScript coding tasks like GitHub PRs."
                        descriptionCn="一个实验性 AI 代码代理，可帮助处理 JavaScript 编码任务。"
                        buttonText="Join waitlist"
                        buttonTextCn="加入候补"
                        bgColor="bg-lime-100"
                        imageUrl="/images/jules.jpg"
                        href="#"
                    />
                </div>

                {/* 查看全部按钮 */}
                <div className="text-center mt-12">
                    <button className="px-8 py-3 rounded-full border-2 border-black hover:bg-black hover:text-white transition-colors">
                        View all 查看全部
                    </button>
                </div>
            </main>
        </div>
    )
}