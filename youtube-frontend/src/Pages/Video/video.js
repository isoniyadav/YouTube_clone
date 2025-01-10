import React, { useState, useEffect } from 'react'
import "./video.css";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';

const Video = () => {
    const [message, setMessage] = useState('');
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState('');
    const { id } = useParams();
    const [comments, setComments] = useState([]);

    const fetchVideoById = async () => {
        await axios.get(`http://localhost:4000/api/getVideoById/${id}`).then((response) => {
            console.log(response.data.video)
            setData(response.data.video);
            setVideoURL(response?.data?.video?.videoLink)

        }).catch(err => {
            console.log(err);
        })
    }

    const getCommentByVideoId = async () => {
        await axios.get(`http://localhost:4000/commentApi/comment/${id}`).then((response) => {
            console.log(response);
            setComments(response.data.comments);
        }).catch(err => {
            console.log(err);
        })
    }

    

    useEffect(() => {
        fetchVideoById();
        getCommentByVideoId();
    }, [])
    // console.log(message);

    const handleComment=async()=>{
        const body={
            "message":message,
            "video":id
        }
        await axios.post('http://localhost:4000/commentApi/comment',body,{withCredentials:true}).then((res)=>{
            console.log(res)
            const newComment=res.data.comments;
            setComments([newComment,...comments]);
            setMessage("")
        }).catch(err=>{
           toast.error("Please Login to comment!")
        })
    }
    return (
        <div className='video'>
            <div className="videoPostSection">
                <div className="video_youtube">
                    {data && <video width='400' height='400' controls autoPlay className="video_youtube_video">
                        <source src={videoUrl} type='video/mp4' />
                        <source src={videoUrl} type='video/mp4' />
                        your browser does not support.
                    </video>}
                </div>
                <div className="video_youtubeAbout">
                    <div className="video_utubeTitle">{data?.title}</div>
                    <div className="youtube_Video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                                <img src={data?.user?.profilePic} alt="" className="youtube_video_ProfileBlock_left_image" />
                            </Link>
                            <div className="youtubevideo_subsView">
                                <div className="youtubePostProfileName">{data?.user?.channelName}</div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className="subscriberBtnYoutube">Subscribe</div>
                        </div>

                        <div className="youtube_video_LikeBlock">
                            <div className="youtube_video_likeBlock_Like">
                                <ThumbUpIcon />
                                <div className="youtube_video_likeBlock_noofLikes">{data?.like}</div>
                            </div>

                            <div className="youtubeVideoDivider"></div>

                            <div className="youtube_video_likeBlock_Like">
                                <ThumbDownIcon />
                            </div>
                        </div>
                    </div>
                    <div className="youtube_video_About">
                        <div>{data?.user?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>

                    <div className="youtubeCommentSection">
                        <div className="youtubeCommentSectionTitle">{comments?.length}Comments</div>
                        <div className="youtubeSelfComment">
                            <img src="https://res.cloudinary.com/dxzkc2byq/image/upload/v1734777820/samples/two-ladies.jpg" className="video_youtubeSelfCommentProfile" />
                            <div className="addComment">
                                <input type="text" className="addcommentInput" value={message} onChange={(e) => { setMessage(e.target.value) }} placeholder='Add' />
                                <div className="CancelSubmitcomment">
                                    <div className="cancelComment">Cancel</div>
                                    <div className="cancelComment" onClick={handleComment}>Comment</div>
                                </div>
                            </div>
                        </div>

                        <div className="youtubeOthercomment">

                            {
                                comments.map((item, index) => {
                                    return (
                                        <div className="youtubeSelfComment">
                                            <img src={item?.user?.profilePic} className="video_youtubeSelfCommentProfile" />
                                            <div className="others_commentSection">
                                                <div className="others_commentSectionHeader">
                                                    <div className="ChannelName_comment">{item?.user?.channelName}</div>
                                                    <div className="CommentTimingOthers">{item?.createdAt.slice(0,10)}</div>
                                                </div>

                                                <div className="otherCommentSectionComment">
                                                    {item?.message}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="videoSuggestions">

                <div className="videoSuggestionBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://live.staticflickr.com/7120/7507011422_a83a50c208_h.jpg" alt="" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggestion_About">
                        <div className="video_suggestion_About_title">Taarak Mehta ka ooltah chashmah</div>
                        <div className="video_suggestion_About_Profile">Sony Sab</div>
                        <div className="video_suggestion_About_Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://live.staticflickr.com/7120/7507011422_a83a50c208_h.jpg" alt="" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggestion_About">
                        <div className="video_suggestion_About_title">Taarak Mehta ka ooltah chashmah</div>
                        <div className="video_suggestion_About_Profile">Sony Sab</div>
                        <div className="video_suggestion_About_Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://live.staticflickr.com/7120/7507011422_a83a50c208_h.jpg" alt="" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggestion_About">
                        <div className="video_suggestion_About_title">Taarak Mehta ka ooltah chashmah</div>
                        <div className="video_suggestion_About_Profile">Sony Sab</div>
                        <div className="video_suggestion_About_Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://live.staticflickr.com/7120/7507011422_a83a50c208_h.jpg" alt="" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggestion_About">
                        <div className="video_suggestion_About_title">Taarak Mehta ka ooltah chashmah</div>
                        <div className="video_suggestion_About_Profile">Sony Sab</div>
                        <div className="video_suggestion_About_Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://live.staticflickr.com/7120/7507011422_a83a50c208_h.jpg" alt="" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggestion_About">
                        <div className="video_suggestion_About_title">Taarak Mehta ka ooltah chashmah</div>
                        <div className="video_suggestion_About_Profile">Sony Sab</div>
                        <div className="video_suggestion_About_Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://live.staticflickr.com/7120/7507011422_a83a50c208_h.jpg" alt="" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggestion_About">
                        <div className="video_suggestion_About_title">Taarak Mehta ka ooltah chashmah</div>
                        <div className="video_suggestion_About_Profile">Sony Sab</div>
                        <div className="video_suggestion_About_Profile">136k views . 1 day ago</div>
                    </div>
                </div>

                <div className="videoSuggestionBlock">
                    <div className="video_suggestion_thumbnail">
                        <img src="https://live.staticflickr.com/7120/7507011422_a83a50c208_h.jpg" alt="" className="video_suggestion_thumbnail_img" />
                    </div>
                    <div className="video_suggestion_About">
                        <div className="video_suggestion_About_title">Taarak Mehta ka ooltah chashmah</div>
                        <div className="video_suggestion_About_Profile">Sony Sab</div>
                        <div className="video_suggestion_About_Profile">136k views . 1 day ago</div>
                    </div>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default Video