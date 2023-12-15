import React, { useContext } from 'react';

const PubContext = React.createContext<{
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  }|null>(null);

  const usePubContext = () => {
    const context = useContext(PubContext);
    if (context === null) {
      throw new Error('usePubContext must be used within a MyContextProvider');
    }
    return context;
  };
  

export { PubContext, usePubContext };