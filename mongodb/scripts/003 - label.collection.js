print(db.Label.drop() ? "successfuly dropped Label collection":"Label collection does not exist");

db.createCollection("Label", {
    autoIndexId: true
});