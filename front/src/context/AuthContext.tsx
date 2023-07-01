import React, { createContext, useContext, useState, useEffect } from 'react';
import { IUser, authApi } from '../api/auth';

// Define AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  user: IUser | null;
  login: ({ email, password }: IUser) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  logout: () => {},
});

// Custom hook to access AuthContext
const useAuth = () => useContext(AuthContext);

// AuthProvider component
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async ({ email, password }: IUser) => {
    try {
      const response = await authApi.login({ email, password });
      setIsAuthenticated(true);
      setUser(response.user);
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  const logout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
