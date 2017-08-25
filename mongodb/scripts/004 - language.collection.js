print(db.language.drop() ? "successfuly dropped language collection":"language collection does not exist");

db.createCollection("language", {
    autoIndexId: true
});
try {
    db.language.insertMany([
        { name: "JavaScript", icon: null },
        { name: "Java", icon: null },
        { name: "C#", icon: null },
        { name: "HTML5", icon: null },
        { name: "Python", icon: null }
    ]);
    print("successfuly populated language collection")
} catch (e) {
    print(e);
}