const options = document.getElementById("options");
const confirmBtn = document.getElementById("confirmBtn");
const files = ["space.jpg", "metropolis.jpg", "universe-113.jpg"];
const image = document.getElementById("image");
files.forEach((file) => {
  options.innerHTML += `
    <option value=${file}>${file.split(".")[0]}</option>
    `;
});
options.addEventListener("change", (e) => {
  image.setAttribute("src", "maps/" + e.target.value);
});
confirmBtn.addEventListener("click", () => {
  if (options.value === "") return;
  localStorage.setItem("wallpaper", options.value);
  window.location.href = "index.html";
});
