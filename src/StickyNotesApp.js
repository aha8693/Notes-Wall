import NotesWall from "./NotesWall.js";

class StickyNotesApp {
  constructor() {
    this.notesWall = new NotesWall();
  }

  
  renderNotes() {
    const visibleNotes = this.notesWall.getNotes();
    const notesWallElements = document.getElementById("notes-wall");
    notesWallElements.innerHTML = "";

    visibleNotes.forEach((note) => {
      const noteElement = document.createElement("div");
      noteElement.className = "relative w-40 h-40 p-0 m-2 overflow-y-auto transition-transform transform bg-yellow-200 shadow-lg note hover:scale-105";

      // Note
      const noteText = document.createElement("div");
      noteText.className = "p-4 note-text";
      noteText.innerHTML  = note.text.replace(/\n/g, '<br>');

      //Text Area
      const noteTextEdit = document.createElement("textarea");
      noteTextEdit.className = "absolute top-0 left-0 hidden w-full h-full p-4 transition-transform transform bg-yellow-300 shadow-xl resize-none outline-rose-700 outline-offset-0 note-edit note hover:scale-105";
      noteTextEdit.innerHTML  = note.text.replace(/\n/g, '<br>');

      //Button
      const deleteButton = document.createElement("button");
      deleteButton.className = "absolute w-5 h-5 leading-5 text-center transition-opacity opacity-0 cursor-pointer delete-btn top-1 right-1 hover:opacity-100";
      deleteButton.innerHTML  = "🗑";


      noteElement.appendChild(noteText);
      noteElement.appendChild(noteTextEdit);
      noteElement.appendChild(deleteButton);
      notesWallElements.appendChild(noteElement);
    });

  }
  
  // New Note
  handleNewNoteKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value.trim() !== "" && !event.shiftKey) {
      this.notesWall.addNote(event.target.value.trim());
      event.target.value = "";
      this.renderNotes();
      event.preventDefault();
    }
  }

  // Remove
  handleRemoveNoteClick = (event) => {
    const notesWallElements = document.getElementById("notes-wall");
    if (event.target.tagName === "BUTTON"){
      const clickedNote = event.target.closest('.note');

      if (clickedNote) {
        const noteIndex = Array.from(notesWallElements.querySelectorAll('.note')).indexOf(clickedNote) / 2;
        if (noteIndex !== -1 && noteIndex < this.notesWall.getNotesCount()) {
          this.notesWall.removeNote(noteIndex);
        }
      }
      this.renderNotes()
    }
  }

  //Edit
  handleEditDblclick = (event) => {
    const notesWallElements = document.getElementById("notes-wall");
    if (event.target.classList.contains("note") || event.target.classList.contains("note-text")){
      const noteClicked = event.target.closest(".note");
      if (!noteClicked) return;
      const noteText = noteClicked.querySelector('.note-text');
      const noteEditArea = noteClicked.querySelector(".note-edit");
      const id = Array.from(notesWallElements.querySelectorAll('.note')).indexOf(noteClicked) / 2;

      noteEditArea.innerHTML = noteText.innerHTML.replace(/<br>/g, '\n');
      noteText.style.display = 'none';
      noteEditArea.style.display = 'block'

      // General editing behaviors
      const finishEditing = () => {
        this.notesWall.editNote(id, noteEditArea.value);
        noteText.textContent = noteEditArea.value;
        noteText.style.display = 'block';
        noteEditArea.style.display = 'none';
        this.renderNotes();
      };

      // Press Enter or click elsewhere to finish editing
      const finishEditingHandler = (event) => {
        if ((event.key === "Enter" && !event.shiftKey) || (event.type === "click" && event.target !== noteEditArea)) {
          event.preventDefault();
          finishEditing();
          document.removeEventListener("click", finishEditingHandler);
        }
      };
  
      document.addEventListener("click", finishEditingHandler);
      noteEditArea.addEventListener("keydown", finishEditingHandler);
      
    }

  }

  init() {
    document
      .getElementById("new-note")
      .addEventListener("keydown", this.handleNewNoteKeyDown);

    document
      .getElementById("notes-wall")
      .addEventListener("click", this.handleRemoveNoteClick);

    document
      .getElementById("notes-wall")
      .addEventListener("dblclick", this.handleEditDblclick);

      
    this.renderNotes();
  }
}

export default StickyNotesApp;
