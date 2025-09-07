class ButtonGenerator {
  constructor(inputId, goBtnId, containerId) {
    this.input = document.getElementById(inputId);
    this.goBtn = document.getElementById(goBtnId);
    this.container = document.getElementById(containerId);

    this.originalOrder = [];
    this.userProgress = 0;

    this.goBtn.addEventListener("click", () => this.startGame());
  }

  startGame() {
    const n = parseInt(this.input.value, 10);

    if (isNaN(n) || n < 3 || n > 7) {
      alert("Please enter a number between 3 and 7.");
      return;
    }

    this.container.innerHTML = "";
    this.originalOrder = [];
    this.userProgress = 0;

    for (let i = 1; i <= n; i++) {
      const btn = this.createButton(i);
      this.container.appendChild(btn);
      this.originalOrder.push(i);
    }

    setTimeout(() => {
      this.scrambleButtons(n);
    }, n * 1000 - 2000);
  }

  createButton(index) {
    const btn = document.createElement("button");
    btn.textContent = `${index}`;
    btn.classList.add("generated-btn", "disabled-btn");
    btn.style.backgroundColor = this.getRandomColor();
    btn.disabled = true;
    return btn;
  }

  scrambleButtons(n) {
    let scrambleCount = 0;
    const scrambleInterval = setInterval(() => {
      this.randomizePositions();

      scrambleCount++;
      if (scrambleCount === n) {
        clearInterval(scrambleInterval);
        this.prepareForGame();
      }
    }, 2000);
  }

  randomizePositions() {
    const buttons = this.container.querySelectorAll(".generated-btn");

    const safeZoneHeight = 100;

    buttons.forEach((btn) => {
      const winWidth = window.innerWidth;
      const winHeight = window.innerHeight;

      const btnWidth = btn.offsetWidth;
      const btnHeight = btn.offsetHeight;

      const maxX = winWidth - btnWidth;
      const maxY = winHeight - btnHeight;

      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * (maxY - safeZoneHeight)) + safeZoneHeight;

      btn.style.position = "absolute";
      btn.style.left = `${randomX}px`;
      btn.style.top = `${randomY}px`;
    });
  }

  prepareForGame() {
    const buttons = this.container.querySelectorAll(".generated-btn");
    buttons.forEach((btn, index) => {
      btn.textContent = "";
      btn.disabled = false;
      btn.classList.remove("disabled-btn");
      btn.onclick = () => this.checkClick(index + 1, btn);
    });
  }

  checkClick(expectedNumber, btn) {
    const correctNext = this.originalOrder[this.userProgress];
    if (expectedNumber === correctNext) {
      btn.textContent = expectedNumber;
      this.userProgress++;
      if (this.userProgress === this.originalOrder.length) {
        alert("Excellent memory!");
      }
    } else {
      alert("Wrong order!");
      this.revealAll();
    }
  }

  revealAll() {
    const buttons = this.container.querySelectorAll(".generated-btn");
    buttons.forEach((btn, index) => {
      btn.textContent = this.originalOrder[index];
    });
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ButtonGenerator("btnCount", "goBtn", "btnContainer");
});
