function showHome() {
    const games = document.querySelectorAll(".game-card");

    games.forEach(game => {
        game.style.display = "block";
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function filterCategory(category) {
    const games = document.querySelectorAll(".game-card");

    games.forEach(game => {
        const gameCategory = game.dataset.category;

        if (category === "All" || gameCategory === category) {
            game.style.display = "block";
        } else {
            game.style.display = "none";
        }
    });
}

function searchGames() {
    const searchBox = document.getElementById("searchInput");

    if (!searchBox) return;

    const search = searchBox.value.toLowerCase();
    const games = document.querySelectorAll(".game-card");

    games.forEach(game => {
        const name = game.textContent.toLowerCase();

        if (name.includes(search)) {
            game.style.display = "block";
        } else {
            game.style.display = "none";
        }
    });
}

function playGame(url) {
    if (url) {
        window.open(url, "_blank");
    }
}

console.log("GameZone JavaScript loaded!");