import React, { createContext, useContext, ReactNode } from 'react';
import { analyzeSmartContract } from '../services/api';

interface ApiContextType {
  analyzeCode: (code: string) => Promise<any>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within an ApiProvider');
  }
  return context;
};

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const analyzeCode = async (code: string) => {
    try {
      const result = await analyzeSmartContract(code);
      return result;
    } catch (error) {
      console.error('Error analyzing code:', error);
      throw error;
    }
  };

  return (
    <ApiContext.Provider value={{ analyzeCode }}>
      {children}
    </ApiContext.Provider>
  );
};