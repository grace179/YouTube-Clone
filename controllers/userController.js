export const join = (req, res) => res.render("Join", { pageTitle: "Join"});
export const login = (req, res) => res.render("Login", { pageTitle: "LogIn"});
export const logout = (req, res) => res.render("LogOut", { pageTitle: "LogOut"});
export const users = (req, res) => res.render("users", { pageTitle: "Users"});
export const userDetail = (req, res) => res.render("user Detail", { pageTitle: "User Detail"});
export const editProfile = (req, res) => res.render("edit Profile", { pageTitle: "Edit Profile"});
export const changePassword = (req, res) => res.render("change Password", { pageTitle: "Change Password"});
