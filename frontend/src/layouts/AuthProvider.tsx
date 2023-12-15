import { usePubContext } from "../store/provider";
import { createContext, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DEFAULT_URL } from "../constants";

const AuthContext = createContext({});

const AuthProvider: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children,
}) => {
    const navigate = useNavigate();
    const pubContext = usePubContext();
    useEffect(() => {
        checkAuth();
      }, []);

      async function checkAuth() {
        try {
            const response = await axios({
              method: 'get',
              url: `${DEFAULT_URL}auth/check`,
              data: null,
              headers: {
                  'Content-Type': 'application/json',
              },
              withCredentials: true
          })
            if (response.status > 200) {
                pubContext.setFields({ isAuthenticated: false})
              navigate('/signin');
              throw new Error('Network response was not ok');
            } else if(response.status === 200) {
                pubContext.setFields({ isAuthenticated: true, user: response?.data?.user})
            }
      
          } catch (error) {
            console.error(error, 'error fetch')
            navigate('/signin');
          }
      }
      return (
            <AuthContext.Provider value={pubContext.isAuthenticated}>
              {children}
            </AuthContext.Provider>
      );
};

export default AuthProvider;

export function useAuth() {
    return useContext(AuthContext);
  }
