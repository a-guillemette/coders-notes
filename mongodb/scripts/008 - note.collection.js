print(db.Note.drop() ? "successfuly dropped Note collection":"Note collection does not exist");

db.createCollection("Note", {
    autoIndexId: true
});