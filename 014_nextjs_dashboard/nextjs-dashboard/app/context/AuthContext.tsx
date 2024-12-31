'use client'
// 全局认证上下文来管理用户状态
import { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
    isAuthenticated: boolean
    user: string | null
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    logout: () => {}
})

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userName = localStorage.getItem('userName')
        if (token && userName) {
            setIsAuthenticated(true)
            setUser(userName)
        }
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        setIsAuthenticated(false)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
