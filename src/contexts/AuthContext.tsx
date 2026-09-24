import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { GoogleSheetsAPI } from '../services/googleSheetsApi';

interface User {
  email: string;
  role: string;
  status: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('hris_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('hris_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await GoogleSheetsAPI.login(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        localStorage.setItem('hris_user', JSON.stringify(result.user));
        
        // Update login tracking in background (don't wait for it)
        GoogleSheetsAPI.updateLoginTracking(email).catch(err => {
          console.warn('Failed to update login tracking:', err);
        });
        
        return { success: true };
      } else {
        return { success: false, error: result.error || 'Login failed' };
      }
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hris_user');
  };

  const hasPermission = (permission: string) => {
    if (!user) return false;

    // Role-based permissions
    const rolePermissions: Record<string, string[]> = {
      'Admin': ['*'], // All permissions
      'HR Manager': ['*'], // All permissions
      'HR Staff': [
        'view.employees',
        'edit.employees',
        'view.attendance',
        'edit.attendance',
        'view.leave',
        'edit.leave',
        'view.documents',
        'edit.documents',
        'view.training',
        'edit.training',
        'view.departments',
      ],
      'Hotel Employee': [
        'view.own.profile',
        'view.own.attendance',
        'view.own.leave',
        'request.leave',
        'view.own.documents',
      ],
    };

    const userPerms = rolePermissions[user.role] || [];
    
    // Check if user has wildcard permission
    if (userPerms.includes('*')) return true;
    
    // Check specific permission
    return userPerms.includes(permission);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
