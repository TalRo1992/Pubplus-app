import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserList from './views/UserList';
import BaseLayout from './components/BaseLayout';
import { Provider } from "./store/provider";
import SigninPage from './components/SigninPage';

const App: React.FC = () => {
  return (
    <Provider>
        <Router>   
              <BaseLayout>           
                  <Routes>
                    <Route path="/users" element={<UserList/>}/>
                    <Route path="signin" element={<SigninPage/>}/>
                  </Routes> 
              </BaseLayout>
        </Router>
    </Provider>
  );
};

export default App;
