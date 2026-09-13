// GameZone button functions

function showHome() {
    // Show all game cards
    const games = document.querySelectorAll(".game-card, .game");
    games.forEach(game => {
        game.style.display = "";
    });

    // Go to the top
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function filterCategory(category) {
    const games = document.querySelectorAll(".game-card, .game");

    games.forEach(game => {
        const text = game.textContent.toLowerCase();
        const dataCategory = (
            game.getAttribute("data-category") || ""
        ).toLowerCase();

        if (
            dataCategory === category.toLowerCase() ||
            text.includes(category.toLowerCase())
        ) {
            game.style.display = "";
        } else {
            game.style.display = "none";
        }
    });
}

// Make sure buttons don't accidentally submit forms
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("button").forEach(button => {
        if (!button.getAttribute("type")) {
            button.type = "button";
        }
    });
});