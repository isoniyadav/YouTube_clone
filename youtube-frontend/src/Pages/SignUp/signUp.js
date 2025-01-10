import React, { useState } from 'react'
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signUp.css';
import { toast, ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


const SignUp = () => {
    const [uploadedImageUrl, setUploadedImageUrl] = useState('https://icon-library.com/images/unknown-person-icon/unknown-person-icon-4.jpg');
    const [signUpField, setSignUpField] = useState({ 'channelName': '', 'userName': '', 'password': '', 'about': '', 'profilePic': uploadedImageUrl })
    const [progressBar, setProgressBar] = useState(false);
    const navigate=useNavigate();

    const handleInputField = (event, name) => {
        setSignUpField({
            ...signUpField, [name]: event.target.value

        })
    }
    console.log(signUpField);

    const uploadImage = async (e) => {
        console.log(uploadImage);
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        // youTube-clone
        data.append('upload_preset', 'youTube-clone');
        try {
            // cloudName="dxzkc2byq"
            setProgressBar(true);
            const response = await axios.post('https://api.cloudinary.com/v1_1/dxzkc2byq/image/upload', data);
            setProgressBar(false);
            const imageUrl = response.data.url;
            setUploadedImageUrl(imageUrl);
            setSignUpField({
                ...signUpField, 'profilePic': imageUrl
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleSignup = async () => {
        setProgressBar(true);
        axios.post('http://localhost:4000/auth/signUp', signUpField).then((res) => {
            toast.success(res.data.message)
            setProgressBar(false);
            navigate('/');
        }).catch(err => {
            setProgressBar(false);
            toast.error(err)
        })
    }

    return (
        <div className='signup'>
            <div className="signup_card">
                <div className="signup_title">
                    <YouTubeIcon sx={{ fontSize: '54px' }} className='login_youtubeImage' />
                    SignUp
                </div>

                <div className="signup_inputs">
                    <input type="text" className="sugup_Inputs_inp" value={signUpField.channelName} onChange={(e) => { handleInputField(e, 'channelName') }} placeholder='Channel Name' />
                    <input type="text" className="sugup_Inputs_inp" value={signUpField.userName} onChange={(e) => { handleInputField(e, 'userName') }} placeholder='UserName' />
                    <input type="password" className="sugup_Inputs_inp" value={signUpField.password} onChange={(e) => { handleInputField(e, 'password') }} placeholder='Password' />
                    <input type="text" className="sugup_Inputs_inp" value={signUpField.about} onChange={(e) => { handleInputField(e, 'about') }} placeholder='About Your Channel' />

                    <div className="image_upload_signup">
                        <input type="file" onChange={(e) => uploadImage(e)} />
                        <div className="image_upload_signup_div">
                            <img src={uploadedImageUrl} className="image_default_signup" />
                        </div>
                    </div>

                    <div className="signupBtns">
                        <div className="SignUpbutton" onClick={handleSignup}>SignUp</div>
                        <Link to={'/'} className="SignUpbutton">Home Page</Link>
                    </div>
                    {
                        progressBar && <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp