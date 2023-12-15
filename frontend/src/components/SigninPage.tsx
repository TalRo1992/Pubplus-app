import { Button} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import CustomInput from "./CustomInput";
import { usePubContext } from "../store/provider";
import logo from '../assets/cropped-PubPlus-Logo.png';
import { login } from "../services/auth.api";




const SigninPage: React.FC = () => {
  const [value, setValue] = useState('Initial value');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const pubContext = usePubContext();

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [invalidField, setInvalidField] = useState(false);
const [passwordShown, setPasswordShown] = useState(false);

const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
  setUsername(event.target.value);
  pubContext.setFields({ value: pubContext.value+event.target.value});

};

const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setPassword(event.target.value);
};

const keyPressed = async (event: any) => {
    if (event.key === 'Enter') {
      handleLogin()
    }
}

const handleLogin = async () => {
  
  try {
    setLoading(true)
    const response:any = await login(username, password);
  if(response){
    pubContext.setFields({ user: response.user, isAuthenticated : true})
    navigate('/users');
  }
  } catch (error:any) {
    console.error('Error logging in:', error?.response?.data);
    setInvalidField(true);
    pubContext.setFields({ snackbar: {
      severity: 'error',
      onOpen: true,
      msg: error?.response?.data?.info?.message || 'Internal Error',
      isAuthenticated : false
    }})

  }
  finally {
    setLoading(false)
  }
};


  return (
    <form className="main-container login-container" onSubmit={e => {e.preventDefault();}} >
      <div className="wrapper">
        <img src={logo} className="login-img"/>
        <CustomInput
          invalidField = {invalidField && true || false}
          label="Username"
          placeholder="Enter your uersname..."
          isIconActive={false}
          value={username}
          onChange={handleUsernameChange}
        />
        <CustomInput
          invalidField = {invalidField && true || false}
          label="Password"
          placeholder="Enter your password..."
          isIconActive={true}
          type={passwordShown && 'text' || 'password'}
          value={password}
          onChange={handlePasswordChange}
          onIconClick={() => setPasswordShown(!passwordShown)}
          shownIcon={passwordShown}
        />
      <Button
          disabled= {!username || !password}
          variant="outlined"
          fullWidth
          sx={{ mt: 4, boxShadow: '0 0 10px #41c5f5', color: 'black', borderRadius: '10px', background: '#f8d025' }}
          onClick={handleLogin}
          onKeyPress={keyPressed}
          type="submit"
        >
          {loading && 'loading...' || 'Login'}
      </Button>
      </div>
    </form>
  );
};

export default SigninPage;
