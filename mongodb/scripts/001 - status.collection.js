var collectionName = "status";
print("using db: " + db.getName());

print(db.status.drop() ? "successfuly dropped " + collectionName + " collection":collectionName + " collection does not exist");
db.createCollection(collectionName, {
    autoIndexId: false
    //max: 4
});
try {
    db.status.insertMany([
        { _id: 0, enumValueName: "normal", displayName: "Normal" },
        { _id: 1, enumValueName: "pinned", displayName: "Pinned" },
        { _id: 2, enumValueName: "archived", displayName: "Archived" },
        { _id: 3, enumValueName: "deleted", displayName: "Deleted" }
    ]);
    print("successfuly populated " + collectionName + " collection")
} catch (e) {
    print(e);
}