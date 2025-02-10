let messages = ["Pweaseeeee?", "Rillii rillii noooooo?", "Al yu sureeee?", "Noo? me will cadd", "I'll tell my mommm", "Still nooo?", "I got you! Cannot say no now!"];
let gifs = ["https://tenor.com/view/tkthao219-bubududu-panda-gif-8824691505375618737.gif", "https://tenor.com/view/tkthao219-tooji-gif-26557888.gif", "https://tenor.com/view/yier-dudu-sunglasses-gif-26935097.gif", "https://tenor.com/view/bubu-dudu-sseeyall-gif-3240085955502925820.gif", "https://tenor.com/view/dudu-bubu-she-hates-me-bubu-hits-ne-i-dont-want-to-live-with-her-anymore-chekky-bubu-gif-1602669549016574991.gif", "https://tenor.com/view/sseeyall-bubu-dudu-gif-12384185256333977327.gif", "https://tenor.com/view/bubu-bubu-dudu-love-cute-panda-gif-7216267486885279958.gif" ]
let noCount = 0;
let noButton = document.getElementById("no");
let yesButton = document.getElementById("yes");
let messageText = document.getElementById("message");
let gifElement = document.getElementById("gif");

noButton.addEventListener("click", rejectLove);
yesButton.addEventListener("click", acceptLove);

function rejectLove() {
    if (noCount < messages.length) {
        messageText.innerText = messages[noCount];
        // Get current margin-bottom value
        let currentMargin = parseInt(window.getComputedStyle(messageText).marginBottom);
        messageText.style.marginBottom = (currentMargin + 3) + "px"; // Increase by 10px
        messageText.style.fontSize = (currentMargin + 3) + "px"; // Increase by 10px
        noButton.style.transform = `scale(${1 - (noCount+1) * 0.1})`;
        yesButton.style.transform = `scale(${1 + (noCount+1) * 0.1})`;
    }
    if (noCount >= messages.length-1) {
        noButton.style.display = "none";
    }

    if (noCount < gifs.length) {
        gifElement.src = gifs[noCount];
    } else if (noCount >= gifs.length-1) {
        gifElement.src = gifs[gifs.length-1]
    }
        // Increase image size
    let currentWidth = gifElement.width;
    let currentHeight = gifElement.height;
    gifElement.style.width = (currentWidth * 1.05) + "px"; // Increase by 10%
    gifElement.style.height = (currentHeight * 1.05) + "px"; // Maintain aspect ratio
    noCount++;
}

function acceptLove() {
    document.getElementById("valentine").innerHTML = `
        <img src="https://media1.tenor.com/m/aEWN44So2ckAAAAC/kiss-kisses.gif" class="gif">
        <div class="question">HOWEEEEEE I LOP YOU SO MUCH BEBII TENCUU XIXIXIXI❤️ - TJ</div>
    `;
    launchConfetti();
    startHeartRain();
}

function launchConfetti() {
    var duration = 3 * 1000;
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function startHeartRain() {
    const heartContainer = document.getElementById("heart-container");
    setInterval(() => {
        let heart = document.createElement("div");
        heart.classList.add("heart");
        heart.innerHTML = "❤️";
        heart.style.left = Math.random() * window.innerWidth + "px";
        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}