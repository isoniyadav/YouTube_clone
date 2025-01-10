import React, { useState } from 'react'
import './login.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link} from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const Login = ({ setLoginModal }) => {
  const [loginField, setLoginField] = useState({ 'userName': "", "password": '' });
  const [loader, setLoader] = useState(false);

  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField, [name]: event.target.value
    })
  }

  const handleLogin = async () => {
    setLoader(true)
    await axios.post('http://localhost:4000/auth/login', loginField,{withCredentials:true}).then((res) => {

      setLoader(false);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user._id);
      localStorage.setItem('userProfilePic', res.data.user.profilePic);
      window.location.reload();
    }).catch(err => {
      toast.error("Invalid Credentials");
      console.log(err);
      setLoader(false);
    })
  }
  return (
    <div className='login'>
      <div className="login_card">
        <div className="titleCard_login">
          <YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' />
          Login
        </div>
        <div className="loginCredentials">
          <div className="userNamelogin">
            <input type="text" className="userNameLoginusername" value={loginField.userName} onChange={(e) => handleOnChangeInput(e, 'userName')} placeholder='username' />
          </div>
          <div className="userNamelogin">
            <input type="password" className="userNameLoginusername" value={loginField.password} onChange={(e) => handleOnChangeInput(e, 'password')} placeholder='password' />
          </div>
        </div>

        <div className="login_buttons">
          <div className="login-btn" onClick={handleLogin}>Login</div>
          <Link to={'/signup'} onClick={() => setLoginModal()} className="login-btn">SignUp</Link>
          <div className="login-btn" onClick={() => setLoginModal()}>Cancel</div>
        </div>
        {
          loader && <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        }
      </div>
    <ToastContainer />
    </div>
  )
}

export default Login