class Note {
    static nextId = 0;
  
    constructor(text) {
      this.id = Note.nextId++;
      this.text = text;
    }

    edit(newText) {
        this.text = newText
    }
    removeCount() {
      Note.nextId--;
    }
  
  }
  
  export default Note;