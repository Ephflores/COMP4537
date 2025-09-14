// This code was developed with assistance from OpenAI's ChatGPT.

class Note {
  constructor(text = "", onRemove) {
    this.text = text;
    this.onRemove = onRemove;
    this.element = this.createNoteElement();
  }

  createNoteElement() {
    const noteDiv = document.createElement("div");
    noteDiv.className = "note";

    this.textarea = document.createElement("textarea");
    this.textarea.value = this.text;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = MESSAGES.buttons.remove;
    removeBtn.className = "btn orange";

    removeBtn.addEventListener("click", () => {
      noteDiv.remove();
      this.onRemove(this);
    });

    noteDiv.appendChild(this.textarea);
    noteDiv.appendChild(removeBtn);

    return noteDiv;
  }

  getValue() {
    return this.textarea.value;
  }
}

class NoteApp {
  constructor(containerId, saveTimeId, addBtnId, backBtnId) {
    this.notesContainer = document.getElementById(containerId);
    this.saveTime = document.getElementById(saveTimeId);
    this.addBtn = document.getElementById(addBtnId);
    this.backBtn = document.getElementById(backBtnId);
    this.notes = [];

    this.addBtn.textContent = MESSAGES.buttons.add;
    this.backBtn.textContent = MESSAGES.buttons.back;

    this.addBtn.addEventListener("click", () => this.addNote());

    this.loadNotes();

    setInterval(() => this.saveNotes(), 2000);

    this.saveNotes();
  }

  loadNotes() {
    const saved = localStorage.getItem("notes");
    if (saved) {
      const noteObjects = JSON.parse(saved);
      noteObjects.forEach((n) => this.addNote(n.text));
    }
  }

  saveNotes() {
    const notesData = this.notes.map((note) => ({ text: note.getValue() }));
    localStorage.setItem("notes", JSON.stringify(notesData));
    const now = new Date().toLocaleTimeString();
    this.saveTime.textContent = `${MESSAGES.labels.storeTimeLabel}: ${now}`;
  }

  addNote(text = "") {
    const note = new Note(text, (noteToRemove) => this.removeNote(noteToRemove));
    this.notes.push(note);
    this.notesContainer.appendChild(note.element);
  }

  removeNote(note) {
    this.notes = this.notes.filter((n) => n !== note);
    this.saveNotes();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("writerPage").textContent = MESSAGES.labels.writerPage;
  new NoteApp("notesContainer", "saveTime", "addBtn", "backBtn");
});
