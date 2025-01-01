'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface AuthContextType {
    isAuthenticated: boolean;
    user: string | null;
    login: (username: string, token: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    user: null,
    login: async () => {},
    logout: () => {},
    checkAuth: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const router = useRouter();

    const checkAuth = () => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        
        if (token && savedUser) {
            setIsAuthenticated(true);
            setUser(savedUser);
        } else {
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (username: string, token: string) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', username);
        setIsAuthenticated(true);
        setUser(username);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
        router.push('/posts/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};