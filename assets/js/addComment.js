import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentBtns = document.querySelectorAll(".video__comments-del");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const decreaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const commentAvatar = document.createElement("div");

  const commentProfile = document.createElement("div");
  const commentInfo = document.createElement("div");

  const commentCreator = document.createElement("span");
  const commentText = document.createElement("span");
  const commentCreatedAt = document.createElement("span");

  commentProfile.className = "comment-profile";

  commentAvatar.style.width = "3em";
  commentAvatar.style.height = "3em";
  commentAvatar.style.backgroundColor = "#bb2f2a";
  commentAvatar.style.borderRadius = "50%";
  commentAvatar.style.lineHeight = "3em";
  commentAvatar.style.textAlign = "center";
  commentAvatar.style.color = "#fff";
  commentAvatar.innerHTML = "Me";

  commentProfile.appendChild(commentAvatar);

  commentInfo.className = "comment-info";

  commentCreator.className = "video__comments-creator";

  commentText.className = "video__comments-text";
  commentText.innerHTML = comment;

  commentCreatedAt.className = "video__comments-createdAt";
  commentCreatedAt.innerHTML = "now";

  commentInfo.appendChild(commentCreator);
  commentInfo.appendChild(commentText);
  commentInfo.appendChild(commentCreatedAt);

  li.appendChild(commentProfile);
  li.appendChild(commentInfo);

  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  console.log(comment);
  const videoId = window.location.href.split("/videos")[1];
  const response = await axios({
    url: `/api${videoId}/comment`,
    method: "POST",
    data: {
      comment,
    },
  });
  // console.log(response);
  if (response.status === 200) {
    addComment(comment);
  }
};

const deleteComment = (event) => {
  const delBtn = event.target;
  // const form = delBtn.parentNode;
  const li = delBtn.parentNode;
  const ul = li.parentNode;
  console.log(delBtn, li, ul);
  ul.removeChild(li);
};

const handleDeleteComment = async (event) => {
  event.preventDefault();
  console.log(event.target);
  // console.log(event.currentTarget.parentNode);

  const commentInfo = event.target;
  const commentTarget = commentInfo.querySelector("button");
  const commentId = commentTarget.name;
  // console.log(commentId);

  const videoId = window.location.href.split("/videos")[1];

  await axios({
    url: `/api${videoId}/comment/delete`,
    method: "POST",
    data: { commentId },
  });

  decreaseNumber();
  deleteComment(event);
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteCommentBtns.forEach((delComment) =>
    delComment.addEventListener("submit", handleDeleteComment)
  );
}

if (addCommentForm) {
  init();
}
