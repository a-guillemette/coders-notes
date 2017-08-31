print(db.File.drop() ? "successfuly dropped File collection":"File collection does not exist");

db.createCollection("File", {
    autoIndexId: true
});