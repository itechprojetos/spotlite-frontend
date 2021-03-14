import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  permission: string;
  company_id: string;
  company_name: string;
  approval_limit: string;
  currency1: string;
  currency2: string;
  currency3: string;
  avatar_url: string;
  active: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUSer(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@SpotLite: token');
    const user = localStorage.getItem('@SpotLite: user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.active === '1') {
      throw new Error('Usuário inativado pelo administrador');
    }

    localStorage.setItem('@SpotLite: token', token);
    localStorage.setItem('@SpotLite: user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@SpotLite: token');
    localStorage.removeItem('@SpotLite: user');

    setData({} as AuthState);
  }, []);

  const updateUSer = useCallback((user: User) => {
    localStorage.setItem('@SpotLite: user', JSON.stringify(user));

    setData({
      token: data.token,
      user,
    });
  }, [setData, data.token]);

  return (
    <AuthContext.Provider value={{
      user: data.user, signIn, signOut, updateUSer,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
