// This code was developed with assistance from OpenAI's ChatGPT.

class IndexPage {
  constructor(messages) {
    this.messages = messages;

    this.pageTitle = document.getElementById("pageTitle");
    this.studentName = document.getElementById("studentName");
    this.writerBtn = document.getElementById("writerBtn");
    this.readerBtn = document.getElementById("readerBtn");
  }

  init() {
    this.render();
  }

  render() {
    this.pageTitle.textContent = this.messages.title;
    this.studentName.textContent = this.messages.studentName;
    this.writerBtn.textContent = this.messages.buttons.writer;
    this.readerBtn.textContent = this.messages.buttons.reader;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const app = new IndexPage(MESSAGES);
  app.init();
});
