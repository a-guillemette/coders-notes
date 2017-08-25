print(db.status.drop() ? "successfuly dropped status collection":"status collection does not exist");

db.createCollection("status", {
    autoIndexId: false
});
try {
    db.status.insertMany([
        { _id: 0, enumValueName: "normal", displayName: "Normal" },
        { _id: 1, enumValueName: "pinned", displayName: "Pinned" },
        { _id: 2, enumValueName: "archived", displayName: "Archived" },
        { _id: 3, enumValueName: "deleted", displayName: "Deleted" }
    ]);
    print("successfuly populated status collection")
} catch (e) {
    print(e);
}