// This code was developed with assistance from OpenAI's ChatGPT.

class ButtonItem {
  constructor(index, color, onClick) {
    this.index = index;
    this.color = color;
    this.onClick = onClick;
    this.btn = this.createButton();
  }

  createButton() {
    const btn = document.createElement("button");
    btn.textContent = `${this.index}`;
    btn.classList.add("generated-btn", "disabled-btn");
    btn.style.backgroundColor = this.color;
    btn.disabled = true;
    return btn;
  }

  setPosition(x, y) {
    this.btn.style.position = "absolute";
    this.btn.style.left = `${x}px`;
    this.btn.style.top = `${y}px`;
  }

  hideLabel() {
    this.btn.textContent = "";
  }

  revealLabel() {
    this.btn.textContent = this.index;
  }

  enable() {
    this.btn.disabled = false;
    this.btn.classList.remove("disabled-btn");
    this.btn.onclick = () => this.onClick(this.index, this);
  }

  disable() {
    this.btn.disabled = true;
    this.btn.classList.add("disabled-btn");
    this.btn.onclick = null;
  }

  get element() {
    return this.btn;
  }
}

class ButtonContainer {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.buttons = [];
  }

  clear() {
    this.container.innerHTML = "";
    this.buttons = [];
  }

  addButton(button) {
    this.buttons.push(button);
    this.container.appendChild(button.element);
  }

  scramblePositions() {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;
    const safeZoneHeight = 100;

    this.buttons.forEach((btn) => {
      const btnWidth = btn.element.offsetWidth;
      const btnHeight = btn.element.offsetHeight;

      const maxX = winWidth - btnWidth;
      const maxY = winHeight - btnHeight;

      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * (maxY - safeZoneHeight)) + safeZoneHeight;

      btn.setPosition(randomX, randomY);
    });
  }

  getAllButtons() {
    return this.buttons;
  }
}

class Game {
  constructor(inputId, goBtnId, containerId, labelId) {
    this.input = document.getElementById(inputId);
    this.goBtn = document.getElementById(goBtnId);
    this.label = document.getElementById(labelId);
    this.container = new ButtonContainer(containerId);

    this.label.textContent = MESSAGES.labels.btnCount;
    this.goBtn.textContent = MESSAGES.labels.goBtn;

    this.originalOrder = [];
    this.userProgress = 0;

    this.goBtn.addEventListener("click", () => this.start());
  }

  start() {
    const n = parseInt(this.input.value, 10);

    if (isNaN(n) || n < 3 || n > 7) {
      alert(MESSAGES.alerts.invalidInput);
      return;
    }

    this.container.clear();
    this.originalOrder = [];
    this.userProgress = 0;

    for (let i = 1; i <= n; i++) {
      const btn = new ButtonItem(i, this.getRandomColor(), (index, button) =>
        this.handleClick(index, button)
      );
      this.container.addButton(btn);
      this.originalOrder.push(i);
    }

    setTimeout(() => this.scramblePhase(n), n * 1000 - 2000);
  }

  scramblePhase(n) {
    let scrambleCount = 0;
    const interval = setInterval(() => {
      this.container.scramblePositions();

      scrambleCount++;
      if (scrambleCount === n) {
        clearInterval(interval);
        this.prepareForGame();
      }
    }, 2000);
  }

  prepareForGame() {
    this.container.getAllButtons().forEach((btn) => {
      btn.hideLabel();
      btn.enable();
    });
  }

  handleClick(index, btn) {
    const correctNext = this.originalOrder[this.userProgress];
    if (index === correctNext) {
      btn.revealLabel();
      this.userProgress++;
      if (this.userProgress === this.originalOrder.length) {
        alert(MESSAGES.alerts.win);
      }
    } else {
      alert(MESSAGES.alerts.lose);
      this.endGame();
    }
  }

  endGame() {
    this.container.getAllButtons().forEach((btn) => {
      btn.revealLabel();
      btn.disable();
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
  new Game("btnCount", "goBtn", "btnContainer", "btnCountLabel");
});
