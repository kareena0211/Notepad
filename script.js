const addBtn = document.querySelector("#addBtn");
const main = document.querySelector("#main");

const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea");
    const data = [];
    notes.forEach(
        (note) => {
            data.push(note.value);
        }
    );
    localStorage.setItem("notes", JSON.stringify(data));

    const savedNoteIds = [];
    document.querySelectorAll('.note').forEach((note) => {
        savedNoteIds.push(note.id);
    });
    localStorage.setItem("savedNoteIds", JSON.stringify(savedNoteIds));
};

addBtn.addEventListener("click", function () {
    addNote();
});

const addNote = (text = "", isSaved = false) => {
    const note = document.createElement("div");
    note.classList.add("note");

    const noteId = `note_${Date.now()}`;
    note.id = noteId;

    if (isSaved) {
        note.classList.add("saved");
    }

    note.innerHTML = `
        <div class="tool">
            <p>Notepad</p>
            <i class="save fa fa-save"></i>
            <i class="trash fa fa-trash"></i>
        </div>
        <textarea>${text}</textarea>`;

    
        note.querySelector(".trash").addEventListener("click", function () {
            // console.log("deleted")
            if (note.classList.contains("saved")) {
                note.remove();
                saveNotes();
            }
        });
   
    
    note.querySelector(".save").addEventListener("click", function () {
        saveNotes();
    });

    main.appendChild(note);
    saveNotes();
};

(function () {
    const lsnotes = JSON.parse(localStorage.getItem("notes"));
    if (lsnotes) {
        lsnotes.forEach((text) => {
            addNote(text, true);
        });
    }
})();
