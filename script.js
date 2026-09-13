// GameZone JavaScript

document.addEventListener("DOMContentLoaded", () => {
    console.log("GameZone loaded!");

    // Make all game buttons work
    document.querySelectorAll("[data-game]").forEach(button => {
        button.addEventListener("click", () => {
            const game = button.dataset.game;
            openGame(game);
        });
    });

    // Search
    const search = document.querySelector("#search");
    if (search) {
        search.addEventListener("input", () => {
            const text = search.value.toLowerCase();

            document.querySelectorAll(".game-card").forEach(card => {
                card.style.display =
                    card.textContent.toLowerCase().includes(text)
                        ? ""
                        : "none";
            });
        });
    }
});

// Home button
function showHome() {
    document.querySelectorAll(".game-card").forEach(card => {
        card.style.display = "";
    });

    const sections = document.querySelectorAll(".section");
    sections.forEach(section => section.style.display = "");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Category buttons
function filterCategory(category) {
    const cards = document.querySelectorAll(".game-card");

    cards.forEach(card => {
        const cardCategory = card.dataset.category;

        if (!cardCategory || category === "All" ||
            cardCategory.toLowerCase() === category.toLowerCase()) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// Open a game
function openGame(game) {
    alert("🎮 Loading " + game + "!");
}

// Favorites
function toggleFavorite(button) {
    button.classList.toggle("favorite");

    if (button.classList.contains("favorite")) {
        button.textContent = "★";
    } else {
        button.textContent = "☆";
    }
}

// Dark/light mode
function toggleTheme() {
    document.body.classList.toggle("light-mode");
}

// Profile
function openProfile() {
    alert("👤 Your GameZone profile!");
}

// Fullscreen
function fullscreenGame(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
}

// Simple playable game: Number Tap
function numberTap() {
    let score = 0;

    const target = Math.floor(Math.random() * 100) + 1;

    const answer = prompt(
        "🎯 NUMBER TAP\n\nGuess a number from 1 to 100!"
    );

    if (Number(answer) === target) {
        score = 100;
        alert("🏆 Correct! +100 points!");
    } else {
        alert("❌ Not quite! The number was " + target);
    }

    return score;
}

// Reaction game
function reactionGame() {
    alert("⚡ Get ready!");

    setTimeout(() => {
        const start = performance.now();

        alert("🟢 CLICK OK AS FAST AS YOU CAN!");

        const time = Math.round(performance.now() - start);

        alert("Your reaction time: " + time + " ms");
    }, 1500);
}