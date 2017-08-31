print(db.Snippet.drop() ? "successfuly dropped Snippet collection":"Snippet collection does not exist");

db.createCollection("Snippet", {
    autoIndexId: true
});