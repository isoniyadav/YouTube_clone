import React, { useState, useEffect } from 'react'
import "./profile.css";
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';



const Profile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [user, setUser] = useState(null);

    const fetchProfiledata = async () => {
        axios.get(`http://localhost:4000/api/${id}/channel`).then((response) => {
            console.log(response);
            setData(response.data.video);
            setUser(response.data.video[0]?.user);
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchProfiledata();
    }, [])
    return (
        <div className='profile'>
            <SideNavbar sideNavbar={sideNavbar} />

            <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
                <div className="profile_top_section">
                    <div className="profile_top_section_profile">
                        <img src={user?.profilePic} alt="" className="profile_top_section_img" />
                    </div>
                    <div className="profile_top_section_About">
                        <div className="profile_top_section_About_name">{user?.channelName}</div>
                        <div className="profile_top_Section_info">{user?.userName} . {data.length} videos</div>
                        <div className="profile_top_Section_info">{user?.about}</div>
                    </div>
                </div>

                <div className="profile_videos">
                    <div className="profile_videos_title">Videos &nbsp; <ArrowRightIcon /></div>
                    <div className="profileVideos">

                        {
                            data.map((item, key) => {
                                return (
                                    <Link to={ `/watch/${item._id}`} className="profilevideo_block">
                                        <div className="profileVideo_block_thumbnail">
                                            <img src={item?.thumbnail} alt="" className="profileVideo_block_thumbnail_img" />
                                        </div>

                                        <div className="profileVideo_block_detail">
                                            <div className="profileVideo_block_detail_name">{item?.title}</div>
                                            <div className="profileVideo_block_detail_about">{item?.createdAt.slice(0,10)}</div>
                                        </div>
                                    </Link>
                                );
                            })
                        }




                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile