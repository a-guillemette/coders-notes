var COLLECTION_NAME = "label";
print("using db: " + db.getName());

print(db.status.drop() ? "successfuly dropped " + COLLECTION_NAME + " collection":COLLECTION_NAME + " collection does not exist");
db.createCollection(COLLECTION_NAME, {
    autoIndexId: true
});