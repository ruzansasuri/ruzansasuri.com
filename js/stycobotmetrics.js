
const openBtn = document.getElementById("open-react-panel");
const modal = document.getElementById("react-modal");
const closeBtn = document.getElementById("close-react-modal");
const iframe = document.getElementById("react-iframe");

// Open modal and lazy-load React app
openBtn.addEventListener("click", () => {
  iframe.src = "http://localhost:500/index.html"; // set path to your React build
  modal.style.display = "flex";
});

// Close modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  iframe.src = ""; // unload React app for performance
});

// Optional: close modal on clicking outside content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    iframe.src = "";
  }
});