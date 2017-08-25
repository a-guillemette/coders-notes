//load("path/to/another/file.js");

//db = new Mongo().getDB("codernotes");
//db.auth("codersnotes-api", "Password1");
var COLLECTION_NAME = "theme";
print("using db: " + db.getName());

print(db.status.drop() ? "successfuly dropped " + COLLECTION_NAME + " collection":COLLECTION_NAME + " collection does not exist");
db.createCollection(COLLECTION_NAME, {
    autoIndexId: false
});
try {
    db.status.insertMany([
        { _id: 0, name: "Black", backgroundColor: "000000", foregroundColor: "FFFFFF" },
        { _id: 1, name: "Orange", backgroundColor: "D1A01F", foregroundColor: "000000" },
        { _id: 2, name: "Green", backgroundColor: "0B9915", foregroundColor: "000000" }
    ]);
    print("successfuly populated " + COLLECTION_NAME + " collection")
} catch (e) {
    print(e);
}