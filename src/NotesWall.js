import Note from "./Note.js"; // If not default import, I should use `import {Todo}`

class NotesWall {
  constructor() {
    this.notes = [];
    this.count = 0;
  }

  getNotes() {
    return this.notes;
  }

  getNotesCount() {
    return this.count;
  }

  addNote(text) {
    const note = new Note(text);
    this.notes.push(note);
    this.count++;
  }

  // Edit an existing note by ID
  editNote(id, newText) {
    const noteToEdit = this.notes.find((note) => note.id === id);
    if (noteToEdit) {
      noteToEdit.edit(newText);
    }
  }

  // Remove a note by ID
  removeNote(id) {
    const indexToRemove = this.notes.findIndex((note) => note.id === id);
    if (indexToRemove !== -1) {
      this.count--;
      this.notes[indexToRemove].removeCount();
      this.notes.splice(indexToRemove, 1);
    }
    // Update ids after removal
    this.notes.forEach((note, i) => note.id = i);
    
  }
  

}

export default NotesWall;
