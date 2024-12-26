"use client"
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const navItems = [
        { name: '首页', href: '/' },
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

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex">
                        <ul className="flex space-x-8">
                            {navItems.map((nav) => (
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
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((nav) => (
                                <div key={nav.name}>
                                    <Link
                                        href={nav.href}
                                        className="block text-gray-800 hover:text-pink-600 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                                    >
                                        {nav.name}
                                    </Link>
                                    {/* Mobile Submenu */}
                                    {nav.subItems && (
                                        <div className="ml-4 space-y-1">
                                            {nav.subItems.map((subNav) => (
                                                <Link
                                                    key={subNav.name}
                                                    href={subNav.href}
                                                    className="block text-gray-800 hover:text-pink-600 px-3 py-1 text-sm transition-colors duration-200"
                                                >
                                                    {subNav.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}