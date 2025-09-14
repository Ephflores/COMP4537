// This code was developed with assistance from OpenAI's ChatGPT.

class ReadNote {
  constructor(text = "") {
    this.text = text;
    this.element = this.createNoteElement();
  }

  createNoteElement() {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    const textarea = document.createElement("textarea");
    textarea.value = this.text;
    textarea.readOnly = true;
    
    noteDiv.appendChild(textarea);
    return noteDiv;
  }
}

class ReaderApp {
  constructor(containerId, saveTimeId, backBtnId) {
    this.notesContainer = document.getElementById(containerId);
    this.saveTime = document.getElementById(saveTimeId);
    this.backBtn = document.getElementById(backBtnId);
    this.notes = [];

    this.backBtn.textContent = MESSAGES.buttons.back;

    this.refreshNotes();
    setInterval(() => this.refreshNotes(), 2000);
  }

  refreshNotes() {
    this.notesContainer.innerHTML = "";
    this.notes = [];

    const saved = localStorage.getItem("notes");
    if (saved) {
      const noteObjects = JSON.parse(saved);
      noteObjects.forEach((n) => this.addNote(n.text));
    }

    this.showSaveTime();
  }

  addNote(text) {
    const note = new ReadNote(text);
    this.notes.push(note);
    this.notesContainer.appendChild(note.element);
  }

  showSaveTime() {
    const now = new Date().toLocaleTimeString();
    this.saveTime.textContent = `${MESSAGES.labels.updateTimeLabel}: ${now}`;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("readerPage").textContent = MESSAGES.labels.readerPage;
  new ReaderApp("notesContainer", "saveTime", "backBtn");
});
