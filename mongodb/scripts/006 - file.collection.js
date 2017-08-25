print(db.file.drop() ? "successfuly dropped file collection":"file collection does not exist");

db.createCollection("file", {
    autoIndexId: true
});