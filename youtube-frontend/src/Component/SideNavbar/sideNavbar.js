import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import VideocamIcon from '@mui/icons-material/Videocam';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import SmartDisplayIcon from '@mui/icons-material/SmartDisplay';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import "./sideNavbar.css";

const SideNavbar = ({sideNavbar}) => {
  return (
    <div className={sideNavbar?"home-sideNavbar":"homeSideNavbarHide"}>
      <div className="home_sideNavbarTop">
        <div className={`home_sideNavbarTopOption`}>
          <HomeIcon />
          <div className="home_sideNavbarTopOptionTitle">Home</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <VideocamIcon />
          <div className="home_sideNavbarTopOptionTitle">Shorts</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <SubscriptionsIcon />
          <div className="home_sideNavbarTopOptionTitle">Subscriptions</div>
        </div>

      </div>

      <div className="home_sideNavbarMiddle">
        <div className={`home_sideNavbarTopOption`}>
          <div className="home_sideNavbarTopOptionTitle">You</div>
          <ChevronRightIcon />
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <RecentActorsIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Channel</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <HistoryIcon />
          <div className="home_sideNavbarTopOptionTitle">History</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <PlaylistAddIcon />
          <div className="home_sideNavbarTopOptionTitle">Playlists</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <SmartDisplayIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Videos</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <WatchLaterIcon />
          <div className="home_sideNavbarTopOptionTitle">Watch later</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <ThumbUpIcon />
          <div className="home_sideNavbarTopOptionTitle">Liked Videos</div>
        </div>

        <div className={`home_sideNavbarTopOption`}>
          <ContentCutIcon />
          <div className="home_sideNavbarTopOptionTitle">Your Clips</div>
        </div>
      </div>

      <div className="home_sideNavbarMiddle">
        <div className='home_sideNavbarTopOption'>
          <div className="sidebarNavbarTopOptionTitleHeader">Subscription</div>
        </div>

        <div className='home_sideNavbarTopOption'>
          <img className='home_sideNavbar_ImgLogo' src='https://i.pinimg.com/736x/be/1d/5d/be1d5d11523f09687b56c6e4011cc7a5.jpg' />
          <div className="sidebarNavbarTopOptionTitle">Aaj Tak</div>
        </div>

        <div className='home_sideNavbarTopOption'>
          <img className='home_sideNavbar_ImgLogo' src='' />
          <div className="sidebarNavbarTopOptionTitle">Lallan Top</div>
        </div>

        <div className='home_sideNavbarTopOption'>
          <img className='home_sideNavbar_ImgLogo' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJdBx0AHx_PrAPOpkJlv6YCalNTdH5_jYNwTFbeiaytTrPI75LaapMY1s&s' />
          <div className="sidebarNavbarTopOptionTitle">NDTV India</div>
        </div>
      </div>
    </div>
  )
}

export default SideNavbar;