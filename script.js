// ==============================
// GameZone controls
// ==============================

function goHome() {
    // Show everything again
    const items = document.querySelectorAll(
        ".game-card, .game, .card, [data-category]"
    );

    items.forEach(item => {
        item.style.display = "";
    });

    // Clear search
    const search = document.getElementById("search");
    if (search) search.value = "";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==============================
// Category buttons
// ==============================

function showCategory(category) {
    const wanted = category.toLowerCase();

    const items = document.querySelectorAll(
        ".game-card, .game, .card, [data-category]"
    );

    items.forEach(item => {
        const dataCategory =
            (item.getAttribute("data-category") || "").toLowerCase();

        const text = item.textContent.toLowerCase();

        if (
            dataCategory === wanted ||
            dataCategory.includes(wanted) ||
            text.includes(wanted)
        ) {
            item.style.display = "";
        } else {
            item.style.display = "none";
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// ==============================
// Theme button
// ==============================

function toggleTheme() {
    document.body.classList.toggle("light-mode");

    const light = document.body.classList.contains("light-mode");

    localStorage.setItem("gamezone-theme", light ? "light" : "dark");
}


// ==============================
// Profile button
// ==============================

function openProfile() {
    alert("Profile coming soon!");
}


// ==============================
// Load saved theme
// ==============================

document.addEventListener("DOMContentLoaded", function () {
    const theme = localStorage.getItem("gamezone-theme");

    if (theme === "light") {
        document.body.classList.add("light-mode");
    }

    // Prevent buttons inside forms from submitting
    document.querySelectorAll("button").forEach(button => {
        if (!button.getAttribute("type")) {
            button.type = "button";
        }
    });
});