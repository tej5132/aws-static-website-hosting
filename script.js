/*=========================================================
CloudFlow
Premium Landing Page Interactions
=========================================================*/

/*-------------------------------
LIVE COUNTERS
--------------------------------*/

function animateCounter(id, end, duration = 1800, suffix = "") {
  const element = document.getElementById(id);
  if (!element) return;

  let start = 0;
  const startTime = performance.now();

  function update(time) {
    const progress = Math.min((time - startTime) / duration, 1);

    const eased = 1 - Math.pow(1 - progress, 3);

    const value = Math.floor(eased * end);

    element.textContent = value + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

animateCounter("requests", 14273);

animateCounter("latency", 42, 1500, "ms");

/*-------------------------------
LIVE TERMINAL
--------------------------------*/

const terminal = document.getElementById("terminal");

const logs = [

  "$ git push origin main",

  "✔ Commit received",

  "$ npm install",

  "✔ Dependencies installed",

  "$ npm run build",

  "✔ Build successful",

  "$ Optimizing assets",

  "✔ CSS Minified",

  "✔ JavaScript Bundled",

  "$ aws s3 sync ./dist s3://cloudflow",

  "✔ Upload Complete",

  "$ Invalidating CloudFront Cache",

  "✔ Distribution Updated",

  "$ Deployment Finished",

  "✔ Website Live"

];

let index = 0;

function addLog() {

  if (!terminal) return;

  if (index >= logs.length) {

    terminal.innerHTML = "";

    index = 0;

  }

  const line = document.createElement("div");

  line.textContent = logs[index];

  line.style.opacity = 0;

  line.style.marginBottom = "12px";

  terminal.appendChild(line);

  requestAnimationFrame(() => {

    line.style.transition = ".5s";

    line.style.opacity = 1;

  });

  terminal.scrollTop = terminal.scrollHeight;

  index++;

}

for (let i = 0; i < 4; i++) {

  addLog();

}

setInterval(addLog, 900);

/*-------------------------------
PIPELINE ANIMATION
--------------------------------*/

const steps = document.querySelectorAll(".step");

let active = 0;

function animatePipeline() {

  steps.forEach(step => {

    step.style.boxShadow = "none";

    step.style.transform = "translateY(0)";

  });

  steps[active].style.transform = "translateY(-12px)";

  steps[active].style.boxShadow = "0 25px 60px rgba(0,0,0,.12)";

  active++;

  if (active >= steps.length) {

    active = 0;

  }

}

animatePipeline();

setInterval(animatePipeline, 1200);

/*-------------------------------
SCROLL REVEAL
--------------------------------*/

const reveal = document.querySelectorAll(

  ".pipeline,.metrics,.terminal,.architecture,.timeline"

);

const observer = new IntersectionObserver(

  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("active");

      }

    });

  },

  {

    threshold: .15

  }

);

reveal.forEach(section => {

  section.classList.add("reveal");

  observer.observe(section);

});

/*-------------------------------
BUTTON RIPPLE
--------------------------------*/

document.querySelectorAll("button").forEach(button => {

  button.addEventListener("click", function (e) {

    const circle = document.createElement("span");

    const d = Math.max(this.clientWidth, this.clientHeight);

    circle.style.width = d + "px";

    circle.style.height = d + "px";

    circle.style.left = e.offsetX - d / 2 + "px";

    circle.style.top = e.offsetY - d / 2 + "px";

    this.appendChild(circle);

    setTimeout(() => {

      circle.remove();

    }, 800);

  });

});

/*-------------------------------
CARD LIGHT FOLLOW
--------------------------------*/

document.querySelectorAll(

  ".card,.step,.architecture-card"

).forEach(card => {

  card.addEventListener("mousemove", (e) => {

    const rect = card.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;

    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--x", x + "%");

    card.style.setProperty("--y", y + "%");

  });

});

/*-------------------------------
LIVE STATUS CLOCK
--------------------------------*/

function updateTime() {

  const status = document.querySelector(".live-status");

  if (!status) return;

  const now = new Date();

  status.innerHTML =

    `<span class="pulse"></span>

LIVE • ${now.toLocaleTimeString()}`;

}

updateTime();

setInterval(updateTime, 1000);

/*-------------------------------
FLOATING HERO PARALLAX
--------------------------------*/

const hero = document.querySelector(".hero-right");

document.addEventListener("mousemove", (e) => {

  if (!hero) return;

  const x = (window.innerWidth / 2 - e.clientX) / 45;

  const y = (window.innerHeight / 2 - e.clientY) / 45;

  hero.style.transform = `translate(${x}px,${y}px)`;

});

/*-------------------------------
SMOOTH INTRO
--------------------------------*/

window.addEventListener("load", () => {

  document.body.style.opacity = "0";

  document.body.style.transition = "opacity .9s ease";

  requestAnimationFrame(() => {

    document.body.style.opacity = "1";

  });

});

/*-------------------------------
AUTO UPDATE METRICS
--------------------------------*/

setInterval(() => {

  const req = document.getElementById("requests");

  const lat = document.getElementById("latency");

  if (req) {

    let current = parseInt(req.textContent.replace(/\D/g, ''), 10);

    current += Math.floor(Math.random() * 8);

    req.textContent = current.toLocaleString();

  }

  if (lat) {

    const value = 35 + Math.floor(Math.random() * 10);

    lat.textContent = value + "ms";

  }

}, 3000);