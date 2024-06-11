document.addEventListener('DOMContentLoaded', () => {
    const noteForm = document.getElementById('note-form');
    const noteInput = document.getElementById('note-input');
    const notesContainer = document.getElementById('notes-container');

    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notesContainer.innerHTML = '';
        notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.innerHTML = `
                <p>${note}</p>
                <button onclick="deleteNote(${index})">Delete</button>
            `;
            notesContainer.appendChild(noteElement);
        });
    };

    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const noteText = noteInput.value.trim();
        if (noteText !== '') {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(noteText);
            localStorage.setItem('notes', JSON.stringify(notes));
            noteInput.value = '';
            loadNotes();
        }
    });

    window.deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem('notes'));
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
        loadNotes();
    };

    loadNotes();
});
