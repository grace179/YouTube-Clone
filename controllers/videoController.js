import { videos } from '../db';
import routes from '../routes';

export const home = (req, res) => {

    res.render("home",{ pageTitle: "Home" , videos });
};

export const search = (req, res) => {
    const {
        query : { term : searchingBy}
    } = req;
    console.log(req.query.term);
    res.render("search", { pageTitle: "Search", searchingBy, videos});
};

export const getUpload = (req, res) => 
    res.render("upload", { pageTitle: "UPload"});

export const postUpload = (req, res) => {
    // res.render("upload", { pageTitle: "UPload"})
    const {
        body: {
            file, title, description
        }
    } = req;
    // To Do : Upload and save video
    res.redirect(routes.videoDetail(32390));
};

export const videoDetail = (req, res) => res.render("videoDetail", { pageTitle: "Video Detail"});

export const editVideo = (req, res) => res.render("editVideo", { pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => res.render("deleteVideo", { pageTitle: "Delete Video"});