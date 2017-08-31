print(db.Language.drop() ? "successfuly dropped Language collection":"Language collection does not exist");

db.createCollection("Language", {
    autoIndexId: true
});
try {
    db.Language.insertMany([
        { name: "JavaScript", icon: null },
        { name: "Java", icon: null },
        { name: "C#", icon: null },
        { name: "HTML5", icon: null },
        { name: "Python", icon: null }
    ]);
    print("successfuly populated Language collection")
} catch (e) {
    print(e);
}