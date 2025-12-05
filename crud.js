// Load existing localStorage data or create empty array
function getData() {
    return JSON.parse(localStorage.getItem("projectData")) || [];
}

function saveData(data) {
    localStorage.setItem("projectData", JSON.stringify(data));
    alert("Saved! Go back to Portfolio → Load Local");
}

// Create
document.getElementById("create").addEventListener("click", () => {
    const data = getData();

    const newEntry = {
        title: title.value,
        image: image.value,
        alt: alt.value,
        description: description.value,
        link: link.value
    };

    data.push(newEntry);
    saveData(data);
});

// Update
document.getElementById("update").addEventListener("click", () => {
    const data = getData();
    const i = parseInt(index.value);

    if (isNaN(i) || i < 0 || i >= data.length) {
        alert("Invalid index");
        return;
    }

    data[i] = {
        title: title.value,
        image: image.value,
        alt: alt.value,
        description: description.value,
        link: link.value
    };

    saveData(data);
});

// Delete
document.getElementById("delete").addEventListener("click", () => {
    const data = getData();
    const i = parseInt(index.value);

    if (isNaN(i) || i < 0 || i >= data.length) {
        alert("Invalid index");
        return;
    }

    data.splice(i, 1);
    saveData(data);
});
