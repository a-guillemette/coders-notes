print(db.visibility.drop() ? "successfuly dropped visibility collection":"visibility collection does not exist");

db.createCollection("visibility", {
    autoIndexId: false
});
try {
    db.visibility.insertMany([
        { _id: 0, enumValueName: "private", displayName: "Private" },
        { _id: 1, enumValueName: "unlisted", displayName: "Unlisted" },
        { _id: 2, enumValueName: "public", displayName: "Public" }
    ]);
    print("successfuly populated visibility collection")
} catch (e) {
    print(e);
}