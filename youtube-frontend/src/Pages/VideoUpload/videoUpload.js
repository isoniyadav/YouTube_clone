import React, { useState, useEffect } from 'react'
import './videoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const VideoUpload = () => {
  const [inputField, setInputField] = useState({ 'title': '', 'description': '', 'videoLink': '', 'thumbnail': '', 'videoType': '' });
  const [loader, setLoader] = useState(false);
  // const [videoSrc, setVideoSrc] = useState('');
  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField, [name]: event.target.value
    })
  }

  const uploadImage = async (e, type) => {
    setLoader(true)
    console.log("uploading");
    console.log(uploadImage);
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    // youTube-clone
    data.append('upload_preset', 'youTube-clone');
    try {
      // cloudName="dxzkc2byq"

      const response = await axios.post(`https://api.cloudinary.com/v1_1/dxzkc2byq/${type}/upload`, data)
      const url = response.data.url;
      setLoader(false)
      let val = type === 'image' ? 'thumbnail' : 'videoLink';
      setInputField({
        ...inputField, [val]: url
      })
    }
    catch (err) {
      setLoader(false)
      console.log(err);
    }
  }
  // const handleUrlChange = (e) => {
  //   setVideoSrc(e.target.value); // Set the URL directly
  // }


  useEffect(() => {
    let islogin = localStorage.getItem('userId');
    if (islogin == null) {
      navigate('/');
    }
  }, [])
  console.log(inputField);

  const handleSubmitFunc = async () => {
    setLoader(true)
    await axios.post('http://localhost:4000/api/video', inputField, { withCredentials: true }).then((res) => {
      console.log(res)
      setLoader(false)
      navigate('/')
    }).catch(err => {
      console.log(err);
      setLoader(false)
    })
  }


  return (
    <div className='videoUpload'>
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: '54px', color: 'red' }} />
          Upload Video
        </div>

        <div className="uploadForm">
          <input type="text" placeholder="Title of the video" value={inputField.title} onChange={(e) => { handleOnChangeInput(e, 'title') }} className="uploadFormInputs" />
          <input type="text" placeholder="Description" value={inputField.description} onChange={(e) => { handleOnChangeInput(e, 'description') }} className="uploadFormInputs" />
          <input type="text" placeholder="Category" value={inputField.videoType} onChange={(e) => { handleOnChangeInput(e, 'videoType') }} className="uploadFormInputs" />
          <div>Thumbnail <input type="file" accept='image/*' onChange={(e) => uploadImage(e, 'image')} /></div>
          <div>Video <input type="file" accept='video/mp4,video/webm,video/*' onChange={(e) => uploadImage(e, 'video')} /></div>
          {/* <div>
            Video URL:
            <input type="text" placeholder="Enter video URL" onChange={handleUrlChange} />
          </div>
          {videoSrc && (
            <video controls width="400" src={videoSrc}>
              Your browser does not support the video tag.
            </video>
          )} */}
          {
            loader && <Box sx={{ display: 'flex' }}>
              <CircularProgress />
            </Box>
          }
        </div>


        <div className="uploadBtns">
          <div className="uploadBtn-form" onClick={handleSubmitFunc}>Upload</div>
          <Link to={'/'} className="uploadBtn-form">Home</Link>
        </div>
      </div>
    </div>
  )
}


export default VideoUpload