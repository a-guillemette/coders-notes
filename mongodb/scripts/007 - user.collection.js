print(db.User.drop() ? "successfuly dropped User collection":"User collection does not exist");

db.createCollection("User", {
    autoIndexId: true
});