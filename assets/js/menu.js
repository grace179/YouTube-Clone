const menu = document.getElementById("menu");
const menuToggleBtn = document.getElementById("toggle");

menuToggleBtn.addEventListener("click", () => {
  menu.classList.toggle("visible");
});
