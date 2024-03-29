import routes from "../routes";
import Video from "../models/Video";
import Comment from "../models/Comment";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({})
      .sort({
        _id: -1,
      })
      .populate("creator");
    res.render("home", {
      pageTitle: "Home",
      videos,
    });
  } catch (error) {
    console.log(error);
    res.render("home", {
      pageTitle: "Home",
      videos: [],
    });
  }
};

export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  let videos = [];

  try {
    videos = await Video.find({
      title: {
        $regex: searchingBy,
        $options: "i",
      },
    }).populate("creator");
  } catch (error) {
    console.log(error);
  }
  // console.log(req.query.term);
  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    videos,
  });
};

export const getUpload = (req, res) =>
  res.render("upload", {
    pageTitle: "UPload",
  });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { location },
  } = req;
  // console.log(req.file);
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  // console.log(newVideo);
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
        },
      });
    // console.log("videos info : ", video);

    res.render("videoDetail", {
      pageTitle: video.title,
      video
    });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", {
        pageTitle: `Edit ${video.title}`,
        video,
      });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    await Video.findOneAndUpdate(
      {
        _id: id,
      },
      {
        title,
        description,
      }
    );
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    if (video.creator.toString() !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({
        _id: id,
      });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

export const postRegisterView = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;

  try {
    const video = await Video.findById(id).populate("creator");
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
    });
    video.comments.push(newComment.id);
    video.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const postDeleteComment = async (req, res) => {
  const {
    params: { id },
    body: { commentId },
    user,
  } = req;

  // console.log(commentId);
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
        },
      });

    const removeComment = await Comment.find({ _id: commentId });

    console.log(removeComment);
    await Comment.findByIdAndRemove({ _id: commentId });
    video.comments.pull(commentId);
    video.save();
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};
