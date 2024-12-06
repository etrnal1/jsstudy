export default function TestPage() {
    return (
        // 格子与格子之间有16px的间距
        <main className="grid grid-cols-1 gap-4 p-4">
            <h1 className="text-2xl font-bold mb-4">发表文章</h1>
            <form className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="title">标题</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="输入文章标题"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="content">内容</label>
                    <textarea
                        id="content"
                        name="content"
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="输入文章内容"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="image">上传图片</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700" htmlFor="video">上传视频</label>
                    <input
                        type="file"
                        id="video"
                        name="video"
                        accept="video/*"
                        className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        发表
                    </button>
                </div>
            </form>
        </main>
    );
}