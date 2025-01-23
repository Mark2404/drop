const openBtn = document.getElementById("modalShow");
const closeBtn = document.getElementById("modalClose");
const modal = document.getElementById("modalContainer");



openBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    odal.classList.add("show");
    alert("Modal Opened");
});
closeBtn.addEventListener("click", () => {

    modal.classList.add("hidden");
    odal.classList.remove("show");
    alert("Modal Opened");
});