print(db.user.drop() ? "successfuly dropped user collection":"user collection does not exist");

db.createCollection("user", {
    autoIndexId: true
});