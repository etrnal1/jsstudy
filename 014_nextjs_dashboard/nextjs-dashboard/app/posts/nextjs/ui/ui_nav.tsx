"use client"
import Link from "next/link";
import { useState,useEffect } from "react";

// 添加用户状态显示
import { useAuth } from '@/app/context/AuthContext'

export default function Nav() {
    const { isAuthenticated, user, logout, checkAuth } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // 添加 useEffect 来处理客户端渲染
    useEffect(() => {
        setMounted(true);
        checkAuth(); // 组件挂载时检查认证状态
    }, []);

    // 添加路由变化时的状态检查
    useEffect(() => {
        if(typeof window !=='undefined'){
            
        }
        checkAuth();
    }, []);

    // 如果还没有挂载完成，返回null或者loading状态
    if (!mounted) {
        return null;
    }

    const navItems = [
        { name: '首页', href: '/posts' },
        { name: '文章', href: '/posts' },
        {
            name: '服务',
            href: '#',
            subItems: [
                { name: 'Web 开发', href: '/services/web' },
                { name: '移动应用', href: '/services/mobile' },
                { name: 'SEO 优化', href: '/services/seo' },
            ],
        },
        { name: "关于", href: '/posts/about' },
        { name: "登录", href: '/posts/login' },
        { name: "注册", href: '/posts/register' },
    ];

    return (
        <nav className="bg-gradient-to-r from-black-200 to-black-300 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-2xl mr-2">🧪</span>
                        <span className="font-bold text-gray-800">My Blog</span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {/* 主导航链接 */}
                        <ul className="flex space-x-8">
                            {navItems.map((nav) => 
                                ((!isAuthenticated && (nav.name === "登录" || nav.name === "注册")) ||
                                (isAuthenticated && nav.name !== "登录" && nav.name !== "注册")) && (
                                    <li key={nav.name} className="relative group">
                                        <Link 
                                            href={nav.href}
                                            className="text-gray-800 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                        >
                                            {nav.name}
                                        </Link>
                                        {/* Submenu */}
                                        {nav.subItems && (
                                            <ul className="absolute left-0 top-full hidden group-hover:flex flex-col bg-white shadow-lg py-2 space-y-2">
                                                {nav.subItems.map((subNav) => (
                                                    <li key={subNav.name}>
                                                        <Link 
                                                            href={subNav.href}
                                                            className="block text-gray-800 hover:text-pink-600 px-4 py-2 text-sm transition-colors duration-200"
                                                        >
                                                            {subNav.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                )
                            )}
                        </ul>

                        {/* Desktop User Status */}
                        {isAuthenticated && (
                            <div className="flex items-center gap-4">
                                <span className="text-gray-800">欢迎, {user}</span>
                                <button 
                                    onClick={logout}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    退出登录
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button title="cs"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-pink-600 focus:outline-none"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                {isMenuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {/* 移动端用户状态显示 - 放在导航项的最上方 */}
                            {isAuthenticated && (
                                <div className="border-b border-gray-200 pb-3 mb-3">
                                    <div className="px-3 py-2 text-gray-800 font-medium">
                                        欢迎, {user}
                                    </div>
                                    <button 
                                        onClick={() => {
                                            logout();
                                            setIsMenuOpen(false);
                                        }}
                                        className="block w-full text-left px-3 py-2 text-red-500 hover:text-red-700 hover:bg-gray-50 rounded-md"
                                    >
                                        退出登录
                                    </button>
                                </div>
                            )}

                            {/* 移动端导航链接 */}
                            {navItems.map((nav) => 
                                ((!isAuthenticated && (nav.name === "登录" || nav.name === "注册")) ||
                                (isAuthenticated && nav.name !== "登录" && nav.name !== "注册")) && (
                                    <div key={nav.name}>
                                        <Link
                                            href={nav.href}
                                            className="block text-gray-800 hover:text-pink-600 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {nav.name}
                                        </Link>
                                        {nav.subItems && (
                                            <div className="ml-4 space-y-1">
                                                {nav.subItems.map((subNav) => (
                                                    <Link
                                                        key={subNav.name}
                                                        href={subNav.href}
                                                        className="block text-gray-600 hover:text-pink-600 hover:bg-gray-50 px-3 py-2 rounded-md text-sm"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        {subNav.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}