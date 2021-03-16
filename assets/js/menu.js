const menu = document.getElementById("menu");
const menuToggleBtn = document.getElementById("toggle");

menuToggleBtn.addEventListener("click", () => {
  menu.classList.toggle("visible");
});

menuToggleBtn.addEventListener("mouseover", () => {
  menu.classList.add("visible");
});

menu.addEventListener("mouseout", () => {
  menu.classList.remove("visible");
});
