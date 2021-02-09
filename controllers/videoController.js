import { videos } from '../db';

export const home = (req, res) => {

    res.render("home",{ pageTitle: "Home" , videos });
};

export const search = (req, res) => {
    const {
        query : { term : searchingBy}
    } = req;
    console.log(req.query.term);
    res.render("search", { pageTitle: "Search", searchingBy});
};

export const upload = (req, res) => res.render("upload", { pageTitle: "UPload"});

export const videoDetail = (req, res) => res.render("video Detail", { pageTitle: "Video Detail"});

export const editVideo = (req, res) => res.render("edit Video", { pageTitle: "Edit Video"});

export const deleteVideo = (req, res) => res.render("delete Video", { pageTitle: "Delete Video"});