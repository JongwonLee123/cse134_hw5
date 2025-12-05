document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("slideshow");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    try {
        const response = await fetch("https://api.jsonbin.io/v3/b/6932298fd0ea881f401396f8/latest");
        const json = await response.json();
        const data = json.record;

        if (!data || data.length === 0) return;

        // Create images
        data.forEach((proj, i) => {
            const img = document.createElement("img");
            img.src = proj.image;
            img.alt = proj.alt || proj.title;

            img.addEventListener("click", () => {
                window.open(proj.link, "_blank");
            });

            if (i === 0) img.classList.add("active");
            container.appendChild(img);
        });

        const images = container.querySelectorAll("img");
        let index = 0;
        let intervalTime = 6000;

        function showSlide(n) {
            images[index].classList.remove("active");
            index = (n + images.length) % images.length;
            images[index].classList.add("active");
        }

        let slideshowInterval = setInterval(() => {
            showSlide(index + 1);
        }, intervalTime);

        prevBtn.addEventListener("click", () => {
            clearInterval(slideshowInterval);
            showSlide(index - 1);
            slideshowInterval = setInterval(() => showSlide(index + 1), intervalTime);
        });

        nextBtn.addEventListener("click", () => {
            clearInterval(slideshowInterval);
            showSlide(index + 1);
            slideshowInterval = setInterval(() => showSlide(index + 1), intervalTime);
        });

    } catch (err) {
        console.error("Slideshow failed to load remote images:", err);
    }
});
