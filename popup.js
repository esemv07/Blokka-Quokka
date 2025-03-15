document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["timeData"], (result) => {
        const timeData = result.timeData || {};
        const list = document.getElementById("time-list");
        const image = document.getElementById("status-image");

        // Define custom images
        const images = {
            neutral: "neutral.png",
            warning1: "quokka_30min.png",
            warning2: "quokka_45min.png",
            warning3: "quokka_1hr.png",
            warning4: "quokka_1hr15.png",
            warning5: "quokka_1hr30.png"
        };

        list.innerHTML = "";
        let totalTime = 0;

        for (let site in timeData) {
            let minutesSpent = Math.floor(timeData[site] / 60); // Convert to minutes
            let li = document.createElement("li");
            li.textContent = `${site}: ${minutesSpent} min`;
            list.appendChild(li);
            totalTime += minutesSpent;
        }

        // Set the image variable based on time spent
        let currentImage = images.neutral;
        if (totalTime >= 30) currentImage = images.warning1;
        if (totalTime >= 45) currentImage = images.warning2;
        if (totalTime >= 60) currentImage = images.warning3;
        if (totalTime >= 75) currentImage = images.warning4;
        if (totalTime >= 90) currentImage = images.warning5;

        // Apply the image
        image.src = currentImage;
    });
});
