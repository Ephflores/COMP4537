class ButtonGenerator {
  constructor(inputId, goBtnId, containerId) {
    this.input = document.getElementById(inputId);
    this.goBtn = document.getElementById(goBtnId);
    this.container = document.getElementById(containerId);

    this.goBtn.addEventListener("click", () => this.generateButtons());
  }

  generateButtons() {
    const n = parseInt(this.input.value, 10);

    if (isNaN(n) || n < 3 || n > 7) {
      alert("Please enter a number between 3 and 7.");
      return;
    }

    this.container.innerHTML = "";

    for (let i = 1; i <= n; i++) {
      const btn = this.createButton(i);
      this.container.appendChild(btn);
    }
  }

  createButton(index) {
    const btn = document.createElement("button");
    btn.textContent = `${index}`;
    btn.classList.add("generated-btn");
    btn.style.backgroundColor = this.getRandomColor();
    return btn;
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
