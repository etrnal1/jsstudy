'use client';

import { FC, FormEvent, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';
import MarkdownIt from 'markdown-it';
import type MdEditor from 'react-markdown-editor-lite';

// 确保在客户端渲染
const MarkdownEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

// 初始化 markdown-it 并配置
const mdParser = new MarkdownIt({
  breaks: true,      // 转换换行符为 <br>
  linkify: true,     // 自动转换URL为链接
  typographer: true  // 启用一些语言中立的替换 + 引号美化
});

const NewPostPage: FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(',').map(tag => tag.trim()),
        }),
      });

      if (response.ok) {
        alert('文章发布成功！');
        setTitle('');
        setContent('');
        setTags('');
      } else {
        throw new Error('发布失败');
      }
    } catch (error) {
      alert('发布失败：' + error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">发表新文章</h1>
        
        <form className="max-w-4xl" onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium mb-2">
              文章标题
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入文章标题"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              文章内容
            </label>
            <div className="border rounded-md overflow-hidden">
              <MarkdownEditor
                style={{ height: '500px' }}
                value={content}
                onChange={handleEditorChange}
                renderHTML={text => mdParser.render(text)}
                placeholder="请输入文章内容..."
                className="w-full"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="tags" className="block text-sm font-medium mb-2">
              标签
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入标签，用逗号分隔"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
              发布文章
            </Button>
            <Button type="button" variant="outline" className="hover:bg-gray-100">
              保存草稿
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewPostPage;
