import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentBtn = document.getElementById("commentDelBtn");

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = (comment) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const div = document.createElement("div");

  div.style.width = "3em";
  div.style.height = "3em";
  div.style.backgroundColor = "red";
  div.style.borderRadius = "50%";
  div.style.lineHeight = "3em";
  div.style.textAlign = "center";
  div.style.color = "#fff";
  div.innerHTML = "Me";

  li.appendChild(div);

  span.innerHTML = comment;
  span.backgroundColor = "#ddd";
  span.classList.add("video__comments-text");
  li.appendChild(span);

  const newComment = `<div class="comment-profile">
      <img class="video__comments-avatar" src="">
    </div>
    <div class="comment-info">
      <span class="video__comments-creator" >Me</span>
      <span class="video__comments-text">${comment}</span>
      <span class="video__comments-createdAt">now</span>
    </div>`;
  // li.appendChild(newComment);
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

const deleteComment = async (event) => {
  // console.log(event.currentTarget);
  // console.log(event.currentTarget.parentNode);

  const commentInfo = event.currentTarget.parentNode;
  const commentText = commentInfo.querySelector(".video__comments-text")
    .innerHTML;
  // console.log(commentText);

  const videoId = window.location.href.split("/videos")[1];

  await axios({
    url: `/api${videoId}/comment/delete`,
    method: "POST",
    data: { commentText },
  });
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
  deleteCommentBtn.addEventListener("click", deleteComment);
}

if (addCommentForm) {
  init();
}
