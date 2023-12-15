import React, { ReactNode, useState, useContext, createContext } from 'react';
import { MyComponentProps } from '../types/base';

  const Context = createContext<MyComponentProps | undefined>(undefined);

export function usePubContext() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
}

export function Provider({ children }: { children: React.ReactNode }) {
  const [fields, setFields] = useState<any>({
    value: '',
    user: null,
    snackbar: null,
    isAuthenticated: false,
  });

  return (
    <Context.Provider value={{ ...fields, setFields }}>
      {children}
    </Context.Provider>
  );
}