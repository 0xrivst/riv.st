document.addEventListener('DOMContentLoaded', function () {
    const nav = document.querySelector("[data-js-nav]");
    const navBg = document.querySelector("[data-js-nav-bg]");
    const toggle = document.querySelector("[data-js-toggle]");
    const toggleIcon = document.querySelector("[data-js-toggle-icon]");
    const toggleText = document.querySelector("[data-js-toggle-text]");

    console.log(navBg)

    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
        toggle.classList.toggle("buttonClose");
        toggleIcon.classList.toggle("close");
        navBg.style.display = getComputedStyle(navBg).display === "none" ? "block" : "none"
        if (toggleIcon.classList.contains("close")) {
            toggleText.textContent = "Close"
        } else {
            toggleText.textContent = "Menu"
        }
    })
});