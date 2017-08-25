print(db.note.drop() ? "successfuly dropped note collection":"note collection does not exist");

db.createCollection("note", {
    autoIndexId: true
});