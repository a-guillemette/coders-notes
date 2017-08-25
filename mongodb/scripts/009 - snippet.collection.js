print(db.snippet.drop() ? "successfuly dropped snippet collection":"snippet collection does not exist");

db.createCollection("snippet", {
    autoIndexId: true
});