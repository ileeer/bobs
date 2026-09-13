const games = [
    {
        name: "Block Runner",
        category: "Action",
        emoji: "🧱",
        color: "#6c5ce7",
        popular: true,
        newGame: false,
        type: "runner"
    },
    {
        name: "Speed Racer",
        category: "Racing",
        emoji: "🏎️",
        color: "#e74c3c",
        popular: true,
        newGame: false,
        type: "racing"
    },
    {
        name: "Football Stars",
        category: "Sports",
        emoji: "⚽",
        color: "#27ae60",
        popular: true,
        newGame: true,
        type: "football"
    },
    {
        name: "Space Attack",
        category: "Action",
        emoji: "🚀",
        color: "#0984e3",
        popular: true,
        newGame: false,
        type: "space"
    },
    {
        name: "Puzzle Master",
        category: "Puzzle",
        emoji: "🧩",
        color: "#e84393",
        popular: false,
        newGame: true,
        type: "puzzle"
    },
    {
        name: "Ninja Jump",
        category: "Action",
        emoji: "🥷",
        color: "#2d3436",
        popular: false,
        newGame: true,
        type: "runner"
    },
    {
        name: "Monster Truck",
        category: "Racing",
        emoji: "🚚",
        color: "#d35400",
        popular: true,
        newGame: false,
        type: "racing"
    },
    {
        name: "Goal Keeper",
        category: "Sports",
        emoji: "🧤",
        color: "#16a085",
        popular: false,
        newGame: true,
        type: "football"
    },
    {
        name: "Alien Blaster",
        category: "Action",
        emoji: "👽",
        color: "#8e44ad",
        popular: false,
        newGame: true,
        type: "space"
    },
    {
        name: "Brain Test",
        category: "Puzzle",
        emoji: "🧠",
        color: "#f39c12",
        popular: true,
        newGame: false,
        type: "puzzle"
    }
];

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function createCard(game) {

    const card = document.createElement("div");
    card.className = "gameCard";

    const isFavorite = favorites.includes(game.name);

    card.innerHTML = `
        <div class="thumbnail" style="background:${game.color}">
            ${game.emoji}
        </div>

        <button class="favorite">
            ${isFavorite ? "⭐" : "☆"}
        </button>

        <div class="gameInfo">
            <h3>${game.name}</h3>
            <div class="category">${game.category}</div>
        </div>
    `;

    card.onclick = () => openGame(game);

    card.querySelector(".favorite").onclick = (event) => {

        event.stopPropagation();

        if (favorites.includes(game.name)) {
            favorites = favorites.filter(x => x !== game.name);
        } else {
            favorites.push(game.name);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));

        displayGames();
    };

    return card;
}

function displayGames(list = games) {

    const popular = document.getElementById("popularGames");
    const newest = document.getElementById("newGames");
    const all = document.getElementById("allGames");

    popular.innerHTML = "";
    newest.innerHTML = "";
    all.innerHTML = "";

    list.filter(g => g.popular)
        .forEach(g => popular.appendChild(createCard(g)));

    list.filter(g => g.newGame)
        .forEach(g => newest.appendChild(createCard(g)));

    list.forEach(g => all.appendChild(createCard(g)));
}

function searchGames() {

    const text = document
        .getElementById("searchBox")
        .value
        .toLowerCase();

    const results = games.filter(game =>
        game.name.toLowerCase().includes(text) ||
        game.category.toLowerCase().includes(text)
    );

    displayGames(results);
}

function filterCategory(category) {

    const results = games.filter(game =>
        game.category === category
    );

    displayGames(results);

    window.scrollTo({
        top: 300,
        behavior: "smooth"
    });
}

function showHome() {

    document.getElementById("searchBox").value = "";

    displayGames();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function scrollToGames() {

    document.getElementById("allGamesSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}

function openGame(game) {

    document.getElementById("gameScreen")
        .classList.remove("hidden");

    document.getElementById("gameTitle")
        .textContent = game.name;

    const container = document.getElementById("gameContainer");

    container.innerHTML = "";

    if (game.type === "runner") {
        startRunner(container);
    }

    if (game.type === "racing") {
        startRacing(container);
    }

    if (game.type === "football") {
        startFootball(container);
    }

    if (game.type === "space") {
        startSpace(container);
    }

    if (game.type === "puzzle") {
        startPuzzle(container);
    }
}

function closeGame() {

    document.getElementById("gameScreen")
        .classList.add("hidden");

    document.getElementById("gameContainer")
        .innerHTML = "";
}

function fullscreenGame() {

    document.getElementById("gameContainer")
        .requestFullscreen?.();
}


/* =========================
   MINI GAMES
========================= */

function makeCanvas(container) {

    const canvas = document.createElement("canvas");

    canvas.width = 800;
    canvas.height = 500;

    container.appendChild(canvas);

    return canvas;
}


/* BLOCK RUNNER */

function startRunner(container) {

    const canvas = makeCanvas(container);
    const ctx = canvas.getContext("2d");

    let player = {
        x: 100,
        y: 400,
        size: 40,
        velocity: 0
    };

    let obstacles = [];
    let score = 0;
    let gameOver = false;

    function jump() {

        if (player.y >= 400) {
            player.velocity = -13;
        }
    }

    document.onkeydown = e => {
        if (e.code === "Space") jump();
    };

    canvas.onclick = jump;

    function loop() {

        if (gameOver) {

            ctx.font = "50px Arial";
            ctx.fillText("GAME OVER", 260, 240);

            ctx.font = "25px Arial";
            ctx.fillText("Click to restart", 320, 285);

            canvas.onclick = () => startRunner(container);

            return;
        }

        ctx.clearRect(0, 0, 800, 500);

        player.velocity += 0.6;
        player.y += player.velocity;

        if (player.y > 400) {
            player.y = 400;
            player.velocity = 0;
        }

        if (Math.random() < 0.025) {
            obstacles.push({
                x: 800,
                y: 420,
                size: 40
            });
        }

        obstacles.forEach(o => o.x -= 7);

        obstacles = obstacles.filter(o => o.x > -50);

        obstacles.forEach(o => {

            if (
                player.x < o.x + o.size &&
                player.x + player.size > o.x &&
                player.y < o.y + o.size &&
                player.y + player.size > o.y
            ) {
                gameOver = true;
            }

            ctx.fillStyle = "#e74c3c";
            ctx.fillRect(o.x, o.y, o.size, o.size);
        });

        ctx.fillStyle = "#3498db";
        ctx.fillRect(
            player.x,
            player.y,
            player.size,
            player.size
        );

        ctx.fillStyle = "white";
        ctx.font = "25px Arial";
        ctx.fillText("Score: " + score, 20, 35);

        score++;

        requestAnimationFrame(loop);
    }

    loop();
}


/* RACING */

function startRacing(container) {

    const canvas = makeCanvas(container);
    const ctx = canvas.getContext("2d");

    let carX = 380;

    document.onkeydown = e => {

        if (e.key === "ArrowLeft") {
            carX -= 15;
        }

        if (e.key === "ArrowRight") {
            carX += 15;
        }
    };

    function loop() {

        ctx.fillStyle = "#333";
        ctx.fillRect(0, 0, 800, 500);

        ctx.fillStyle = "#777";
        ctx.fillRect(150, 0, 500, 500);

        ctx.strokeStyle = "white";
        ctx.setLineDash([30, 30]);
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.moveTo(400, 0);
        ctx.lineTo(400, 500);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.fillStyle = "red";
        ctx.fillRect(carX, 400, 45, 70);

        requestAnimationFrame(loop);
    }

    loop();
}


/* FOOTBALL */

function startFootball(container) {

    const canvas = makeCanvas(container);
    const ctx = canvas.getContext("2d");

    let ball = {
        x: 400,
        y: 300,
        vx: 0,
        vy: 0
    };

    let score = 0;

    canvas.onclick = e => {

        ball.vx = (e.offsetX - ball.x) / 15;
        ball.vy = (e.offsetY - ball.y) / 15;
    };

    function loop() {

        ctx.fillStyle = "#159947";
        ctx.fillRect(0, 0, 800, 500);

        ctx.strokeStyle = "white";
        ctx.lineWidth = 5;
        ctx.strokeRect(50, 50, 700, 400);

        ctx.fillStyle = "white";
        ctx.fillRect(350, 50, 100, 15);

        ball.x += ball.vx;
        ball.y += ball.vy;

        ball.vx *= 0.98;
        ball.vy *= 0.98;

        if (ball.x < 20 || ball.x > 780) {
            ball.vx *= -1;
        }

        if (ball.y < 20 || ball.y > 480) {
            ball.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, 18, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        ctx.fillStyle = "white";
        ctx.font = "25px Arial";
        ctx.fillText("Click to kick!", 20, 30);

        requestAnimationFrame(loop);
    }

    loop();
}


/* SPACE */

function startSpace(container) {

    const canvas = makeCanvas(container);
    const ctx = canvas.getContext("2d");

    let x = 400;
    let bullets = [];
    let enemies = [];
    let score = 0;

    document.onkeydown = e => {

        if (e.key === "ArrowLeft") x -= 15;
        if (e.key === "ArrowRight") x += 15;

        if (e.code === "Space") {
            bullets.push({
                x: x,
                y: 420
            });
        }
    };

    function loop() {

        ctx.fillStyle = "#050518";
        ctx.fillRect(0, 0, 800, 500);

        if (Math.random() < 0.03) {

            enemies.push({
                x: Math.random() * 760,
                y: -30
            });
        }

        bullets.forEach(b => b.y -= 8);
        enemies.forEach(e => e.y += 3);

        enemies.forEach(e => {

            bullets.forEach(b => {

                if (
                    Math.abs(b.x - e.x) < 25 &&
                    Math.abs(b.y - e.y) < 25
                ) {
                    e.y = 600;
                    b.y = -100;
                    score++;
                }
            });

            ctx.font = "35px Arial";
            ctx.fillText("👾", e.x, e.y);
        });

        bullets.forEach(b => {

            ctx.fillStyle = "yellow";
            ctx.fillRect(b.x, b.y, 5, 15);
        });

        ctx.font = "40px Arial";
        ctx.fillText("🚀", x, 450);

        ctx.fillStyle = "white";
        ctx.font = "25px Arial";
        ctx.fillText("Score: " + score, 20, 35);

        requestAnimationFrame(loop);
    }

    loop();
}


/* PUZZLE */

function startPuzzle(container) {

    const box = document.createElement("div");

    box.style.textAlign = "center";

    box.innerHTML = `
        <h1>🧩 Quick Math</h1>
        <h2 id="question"></h2>

        <input id="answer"
            type="number"
            style="font-size:25px;padding:10px">

        <br><br>

        <button id="submit"
            style="font-size:20px;padding:10px">
            Submit
        </button>

        <h2 id="result"></h2>
    `;

    container.appendChild(box);

    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;
    let answer = a + b;

    box.querySelector("#question")
        .textContent = `${a} + ${b} = ?`;

    box.querySelector("#submit").onclick = () => {

        const input = Number(
            box.querySelector("#answer").value
        );

        if (input === answer) {
            box.querySelector("#result")
                .textContent = "🎉 Correct!";
        } else {
            box.querySelector("#result")
                .textContent = "❌ Try again!";
        }
    };
}


displayGames();