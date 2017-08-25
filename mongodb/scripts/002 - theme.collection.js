print(db.theme.drop() ? "successfuly dropped theme collection":"theme collection does not exist");

db.createCollection("theme", {
    autoIndexId: true
});
try {
    db.theme.insertMany([
        { name: "Red", backgroundColor: "#F44336", foregroundColor: "rgba(255,255,255,.87)" },
        { name: "Pink", backgroundColor: "#E91E63", foregroundColor: "rgba(255,255,255,.87)" },
        { name: "Purple", backgroundColor: "#9C27B0", foregroundColor: "rgba(255,255,255,.87)" },
        { name: "Deep Purple", backgroundColor: "#673AB7", foregroundColor: "rgba(255,255,255,.87)" },
        { name: "Indigo", backgroundColor: "#3F51B5", foregroundColor: "rgba(255,255,255,.87)" },
        { name: "Blue", backgroundColor: "#2196F3", foregroundColor: "rgba(255,255,255,.87)" },
        { name: "Light Blue", backgroundColor: "#03A9F4", foregroundColor: "rgba(0,0,0,.87)" },
        { name: "Cyan", backgroundColor: "#00BCD4", foregroundColor: "rgba(0,0,0,.87)" },
        { name: "Teal", backgroundColor: "#009688", foregroundColor: "rgba(255,255,255,.87)" },
        { name: "Green", backgroundColor: "#4CAF50", foregroundColor: "rgba(0,0,0,.87)" },
        { name: "Light Green", backgroundColor: "#8BC34A", foregroundColor: "rgba(0,0,0,.87)" },
        { name: "Lime", backgroundColor: "#CDDC39", foregroundColor: "rgba(0,0,0,.87)" },
        { name: "Yellow", backgroundColor: "#FFEB3B", foregroundColor: "rgba(0,0,0,.87)" },
        { name: "Amber", backgroundColor: "#FFC107", foregroundColor: "rgba(0,0,0,.87)" },
        { name: "Orange", backgroundColor: "#FF9800", foregroundColor: "rgba(0,0,0,.87)" },
        { name: "Deep Orange", backgroundColor: "#FF5722", foregroundColor: "rgba(255,255,255,.87)" },
        { name: "Brown", backgroundColor: "#795548", foregroundColor: "rgba(255,255,255,.87)" },
        { name: "Grey", backgroundColor: "#9E9E9E", foregroundColor: "rgba(0,0,0,.87)" },
        { name: "Blue Grey", backgroundColor: "#607D8B", foregroundColor: "rgba(255,255,255,.87)" }
    ]);
    print("successfuly populated theme collection")
} catch (e) {
    print(e);
}