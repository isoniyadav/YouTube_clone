import React, { useState,useEffect } from 'react'
import './navbar.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../Login/login';
import axios from 'axios';


const Navbar = ({ setSideNavbarFunc, sideNavbar }) => {
    const [userPic, setUserPic] = useState("https://t4.ftcdn.net/jpg/07/88/67/21/360_F_788672190_maGwfDtey1ep9BqZsLO9f6LaUkIBMNt1.jpg")
    const [navbarModal, setNavbarModal] = useState(false);
    const [login,setLogin]=useState(false);
    const [isLoggedIn,setLoggedIn]=useState(false);
    const navigate = useNavigate();

    const handleClickModal = () => {
        setNavbarModal(prev => !prev);
    }
    const sideNavbarFunc = () => {
        setSideNavbarFunc(!sideNavbar)
    }
    const handleProfile = () => {

        let userId=localStorage.getItem('userId')
        navigate(`/user/${userId}`);
        setNavbarModal(false);
    }
    const setLoginModal=()=>{
        setLogin(false)
    }
    const onClickofPopUpOption=(button)=>{
        setNavbarModal(false);
        if(button==='login'){
            setLogin(true);
        }else{
            localStorage.clear()
            getLogout();
            setTimeout(()=>{
                window.location.reload();
            },1000);
        }
    }

    const getLogout=async()=>{
        axios.post('http://localhost:4000/auth/logout',{},{withCredentials:true}).then((res)=>{
            console.log("Logout");
        }).catch(err=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        let userProfilePic=localStorage.getItem('userProfilePic');
        setLoggedIn(localStorage.getItem('userId')!==null?true:false);
        if(userProfilePic!==null){
            setUserPic(userProfilePic);
        }
    },[])

    return (
        <div className='navbar'>

            <div className="navbar-left">
                <div className="navbarHamburger" onClick={sideNavbarFunc}>
                    <MenuIcon sx={{ color: 'white' }} />
                </div>
                <Link to={'/'} className="navbar_youtubeImg">
                    <YouTubeIcon sx={{ fontSize: '34px' }} className='navbar_youtubeImage' />
                    <div className="navbar_utubeTitle">YouTube</div>
                </Link>
            </div>

            <div className="navbar-middle">
                <div className="navbar_searchBox">
                    <input type='text' placeholder='search' className='navbar_searchBoxInput' />
                    <div className="navbar_searchIconBox"> <SearchIcon sx={{ fontSize: '28px', color: 'white' }} /></div>
                </div>
                <div className="navbar_mic">
                    <KeyboardVoiceIcon sx={{ color: 'white' }} />
                </div>

            </div>

            <div className="navbar-right">
                <Link to={'/234/upload'}>
                    <VideoCallIcon sx={{ fontSize: '30px', cursor: 'pointer', color: 'white' }} />
                </Link>

                <NotificationsIcon sx={{ fontSize: '30px', cursor: 'pointer', color: 'white' }} />
                <img onClick={handleClickModal} src={userPic} className='navbar-right-logo' alt='logo' />

                {navbarModal &&
                    <div className="navbar-modal">
                        {isLoggedIn && <div className="navbar-modal-option" onClick={handleProfile}>Profile</div>}
                        
                        {isLoggedIn && <div className="navbar-modal-option" onClick={()=>onClickofPopUpOption('logout')}>Logout</div>}
                        
                        {!isLoggedIn && <div className="navbar-modal-option" onClick={()=>onClickofPopUpOption('login')}>Login/SignUp</div>}                        

                    </div>
                }
            </div>
            {
             login   &&  <Login setLoginModal={setLoginModal}/>
            }
        </div>
    )
}

export default Navbar

