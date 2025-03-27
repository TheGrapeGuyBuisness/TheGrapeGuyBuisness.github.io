window.onload = function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            displayTechniques(data);
        })
        .catch(error => console.log("Error loading JSON data:", error));
};

function displayTechniques(data) {
    const techniquesContainer = document.getElementById("techniques");

    for (const techniqueKey in data) {
        const technique = data[techniqueKey];
        const techniqueDiv = document.createElement("div");
        techniqueDiv.classList.add("technique");

        const title = document.createElement("h2");
        title.textContent = technique.title;
        techniqueDiv.appendChild(title);

        const content = document.createElement("p");
        content.textContent = technique.content;
        techniqueDiv.appendChild(content);

        // Check for specific technique sections and display them
        for (const sectionKey in technique) {
            if (sectionKey === "start_and_underwater_phase" || sectionKey === "high_stroke_rate_and_unique_pull") {
                const section = technique[sectionKey];

                const sectionTitle = document.createElement("h3");
                sectionTitle.textContent = section.title;
                techniqueDiv.appendChild(sectionTitle);

                const sectionContent = document.createElement("p");
                sectionContent.textContent = section.content;
                techniqueDiv.appendChild(sectionContent);

                const keyTakeaways = document.createElement("ul");
                keyTakeaways.classList.add("key-takeaways");

                section.key_takeaways.forEach(takeaway => {
                    const li = document.createElement("li");
                    li.textContent = takeaway;
                    keyTakeaways.appendChild(li);
                });
                techniqueDiv.appendChild(keyTakeaways);

                if (section.video) {
                    const videoLink = document.createElement("a");
                    videoLink.href = section.video.url;
                    videoLink.target = "_blank";
                    videoLink.textContent = section.video.title;
                    techniqueDiv.appendChild(videoLink);
                }

                if (section.image) {
                    const image = document.createElement("img");
                    image.src = section.image;
                    techniqueDiv.appendChild(image);
                }
            }
        }

        techniquesContainer.appendChild(techniqueDiv);
    }
}
