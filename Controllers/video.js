const Video = require('../Models/video');


exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, videoType, thumbnail } = req.body;

    const videoUpload = new Video({ user: req.user._id, title, description, videoLink, videoType, thumbnail });
    await videoUpload.save();

    res.status(201).json({ success: "true", videoUpload });

  }
  catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.getAllVideo = async (req, res) => {
  try {
    const videos=await Video.find().populate('user','channelName profilePic userName createdAt about');
    res.status(201).json({success:"true","videos":videos});
    
  }
  catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.getVideoById=async(req,res)=>{
  try{
    let {id}=req.params;
    const video=await Video.findById(id).populate('user','channelName profilePic userName createdAt');

    res.status(201).json({success:"true","video":video});

  }catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
exports.getVideoByUserID=async(req,res)=>{
  try{
    let {userId}=req.params;
    const video=await Video.find({user:userId}).populate('user','channelName profilePic userName createdAt');
    res.status(201).json({success:"true","video":video});

  }catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}

exports.deleteVideo=async(req,res)=>{
  try {
    const videoId = req.params.id;

    // Find and delete the video
    const deletedVideo = await Video.findByIdAndDelete(videoId);

    if (!deletedVideo) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.status(200).json({ message: 'Video deleted successfully', deletedVideo });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting video', error });
  }
}