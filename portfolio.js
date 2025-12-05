function createProjectCard(item) {
    const card = document.createElement("project-card");

    // Picture
    const pic = document.createElement("span");
    pic.slot = "picture";
    pic.innerHTML = `
        <picture>
            <img src="${item.image}" alt="${item.alt}">
        </picture>
    `;

    // Title
    const title = document.createElement("span");
    title.slot = "title";
    title.textContent = item.title;

    // Description
    const desc = document.createElement("span");
    desc.slot = "description";
    desc.textContent = item.description;

    // Link
    const link = document.createElement("span");
    link.slot = "link";
    link.textContent = item.link;

    // Append slots
    card.append(pic, title, desc, link);

    return card;
}


// Load Local JSON
document.getElementById("load-local").addEventListener("click", () => {
    const container = document.getElementById("project-list");
    container.innerHTML = "";

    const data = JSON.parse(localStorage.getItem("projectData"));

    if (!data) {
        container.innerHTML = "No local data found.";
        return;
    }

    data.forEach(item => {
        container.appendChild(createProjectCard(item));
    });
});



// Load Remote JSON
document.getElementById("load-remote").addEventListener("click", async () => {
    const container = document.getElementById("project-list");
    container.innerHTML = "Loading…";

    try {
        // using JSON Bin API
        const response = await fetch("https://api.jsonbin.io/v3/b/6932298fd0ea881f401396f8/latest");
        const json = await response.json();
        const data = json.record;

        container.innerHTML = "";

        data.forEach(item => {
            container.appendChild(createProjectCard(item));
        });

    } catch (err) {
        container.innerHTML = "Failed to load remote data.";
        console.error(err);
    }
});

