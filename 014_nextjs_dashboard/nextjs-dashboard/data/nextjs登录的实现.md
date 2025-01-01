---
date:  "2024-12-29"
---
# 登录nextjs

```tsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// 定义认证上下文的类型
interface AuthContextType {
    isAuthenticated: boolean;
    user: string | null;
    login: (username: string, token: string) => void;
    logout: () => void;
}

// 创建认证上下文   
const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: () => {},
    logout: () => {}
});

// 认证提供者组件
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();

    // 在组件挂载时检查本地存储中的认证状态
    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
            setIsAuthenticated(true);
            setUser(savedUser);
        }
    }, []);

    // 登录函数
    const login = (username: string, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', username);
        setIsAuthenticated(true);
        setUser(username);
    };

    // 登出函数
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/posts/login'); // 登出后重定向到登录页
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// 自定义 Hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
```

1. 首先在应用的根组件中包装 `AuthProvider`：
```typescript:app/layout.tsx
import { AuthProvider } from './context/AuthContext'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </body>
        </html>
    )
}
```

2. 在登录组件中使用：
```tsx
'use client'
import { useAuth } from '@/app/context/AuthContext'

export default function Login() {
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        // 假设这是您的登录逻辑
        try {
            const response = await fetch('/api/login', {
                // ... 您的登录请求配置
            });
            const data = await response.json();
            
            if (data.success) {
                login(data.username, data.token);
                // 登录成功后的处理
            }
        } catch (error) {
            console.error('登录失败:', error);
        }
    };

    // ... 登录表单的其余部分
}
```

3. 在需要检查认证状态的组件中使用：
```typescript
'use client'
import { useAuth } from '@/app/context/AuthContext'

export default function ProtectedComponent() {
    const { isAuthenticated, user, logout } = useAuth();

    if (!isAuthenticated) {
        return <div>请先登录</div>;
    }

    return (
        <div>
            <p>欢迎, {user}!</p>
            <button onClick={logout}>退出登录</button>
        </div>
    );
}
```