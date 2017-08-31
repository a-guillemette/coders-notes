print(db.Status.drop() ? "successfuly dropped Status collection":"Status collection does not exist");

db.createCollection("Status", {
    autoIndexId: false
});
try {
    db.Status.insertMany([
        { _id: 0, enumValueName: "normal", displayName: "Normal" },
        { _id: 1, enumValueName: "pinned", displayName: "Pinned" },
        { _id: 2, enumValueName: "archived", displayName: "Archived" },
        { _id: 3, enumValueName: "deleted", displayName: "Deleted" }
    ]);
    print("successfuly populated Status collection")
} catch (e) {
    print(e);
}