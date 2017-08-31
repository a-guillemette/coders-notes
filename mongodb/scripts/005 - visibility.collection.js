print(db.Visibility.drop() ? "successfuly dropped Visibility collection":"Visibility collection does not exist");

db.createCollection("Visibility", {
    autoIndexId: false
});
try {
    db.Visibility.insertMany([
        { _id: 0, enumValueName: "private", displayName: "Private" },
        { _id: 1, enumValueName: "unlisted", displayName: "Unlisted" },
        { _id: 2, enumValueName: "public", displayName: "Public" }
    ]);
    print("successfuly populated Visibility collection")
} catch (e) {
    print(e);
}