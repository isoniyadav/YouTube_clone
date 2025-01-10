import React from 'react'
import "./homePage.css";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/allVideo').then(res => {
      console.log(res.data.videos)
      setData(res.data.videos);
    }).catch(err => {
      console.log(err);
    })
  }, [])

  const options = ["All", "Twenty20 Cricket", "Taarak Mehta ka ooltah Chashmah", "Music", "Lives", "Mixes", "Gaming", "Debates", "Coke Studio Pkistan", "Democracy", "Pakistani Drama", "Comedy"];

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>

      <div className="homePage_options">
        {
          options.map((item, index) => {
            return (
              <div key={index} className="homePage_option">
                {item}
              </div>
            );
          })
        }
      </div>

      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>

        {
          data?.map((item, index) => {
            return (
              < Link to={`/watch/${item._id}`} className="youtube_video">
                <div className="youtube_thumbnailBox">
                  <img src={item.thumbnail} alt="Thumbnail" className="youtube_thumbnailPic" />
                  <div className="youtube_timingThumbnail">
                    24:05
                  </div>
                </div>

                <div className="youtubeTitleBox">
                  <div className="youtubeProfileBox">
                    <img src={item?.user?.profilePic} alt="" className="youtube_thumbnail_profile" />
                  </div>

                  <div className="youtubeTitleBoX_title">
                    <div className="youtube_videotitle">{item?.title}</div>
                    <div className="youtube_channelName">{item?.user?.channelName}</div>
                    <div className="youtubevideo_Views">{item?.like}</div>

                  </div>
                </div>
              </Link>

            )
          })
        }





      </div>

    </div>
  )
}


export default HomePage