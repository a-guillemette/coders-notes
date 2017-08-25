print(db.label.drop() ? "successfuly dropped label collection":"label collection does not exist");

db.createCollection("label", {
    autoIndexId: true
});