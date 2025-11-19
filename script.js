let terminal = document.getElementById("terminal");
let lines = [
    "Welcome to Papa-OS v1.0",
  "booting papa-os...",
  "loading modules...",
  "initializing birthday.exe...",
  "systems ready."
];

let lineIndex = 0;
let index = 0;      

function typer() {
  if (index < lines[lineIndex].length) {
    terminal.innerHTML = terminal.innerHTML + lines[lineIndex][index];
    index++;
    setTimeout(typer, 100);
  }
  else {
    terminal.innerHTML += "<br>";
    lineIndex++;
    index = 0;
    setTimeout(typer, 300);

  }
  if (lineIndex === lines.length) {
    startCommandPhase();
    return; 
  }
}

function startCommandPhase() {
    setTimeout(() => {
        runRevealSequence();
    }, 800); 
}

function runRevealSequence() {
    let revealLines = [
        "scanning system...",
        "locating birthday surprise...",
        "decrypting message...",
        "loading birthday.exe...",
        "almost ready..."
    ];

    let line = 0;
    let char = 0;

    function typeReveal() {
        if (line < revealLines.length) {
            if (char < revealLines[line].length) {
                terminal.innerHTML += revealLines[line][char];
                char++;
                setTimeout(typeReveal, 80);
            } else {
                terminal.innerHTML += "\n";
                line++;
                char = 0;
                setTimeout(typeReveal, 300);
            }
        } else {
            setTimeout(showFinalMessage, 600);
        }
    }

    typeReveal();
}


function showFinalMessage() {
    terminal.innerHTML += `

<br><br><span class="fade-in">
==============================<br>
🎉 Happy Birthday Papa! 🎉<br>
==============================<br><br>

Thank you for always supporting me, guiding me, and being the best father ever.<br>
I made this small OS just for you, hope it made you smile :)<br><br>

- Dhruv 💙
</span>
`;

confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
});

}


setTimeout(() => {
    let canvas = document.getElementById("matrix");
    canvas.style.transition = "opacity 1s";
    canvas.style.opacity = 0;

    setTimeout(() => {
        clearInterval(matrixInterval);
    }, 1000);

    typer();
}, 5000);


const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0";
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, index) => {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, index * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[index] = 0;
        }

        drops[index]++;
    });
}

let matrixInterval = setInterval(drawMatrix, 33);
