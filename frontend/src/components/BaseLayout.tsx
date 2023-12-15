import React from 'react';
import AuthProvider from '../layouts/AuthProvider';
import Header from './common/Header';
import { usePubContext } from '../store/provider';

const BaseLayout: React.FC<any> = ({ children }) => {
  const pubContext = usePubContext();
  const isAuthenticated = pubContext.isAuthenticated;
  return (
    <AuthProvider>
      <div>
          {isAuthenticated && <Header/> }
          <div>
            {children}
          </div>
        </div>
    </AuthProvider>
  );
};

export default BaseLayout;
