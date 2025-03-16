document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(["timeData"], (result) => {
        const timeData = result.timeData || {};
        const list = document.getElementById("time-list");
        const image = document.getElementById("status-image");
        const statusText = document.getElementById("status-text");

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
        if (totalTime >= 30 && totalTime <= 31) { 
            currentImage = images.warning1;
            statusText.textContent = "Go touch some grass";
            chrome.windows.create({
                url: "popup.html",
                type: "popup", // Create a small popup window
                width: 400,
                height: 400
            });
        } else if (totalTime = 45 && totalTime <= 46) {
            currentImage = images.warning2;
            statusText.textContent = "Go do your assessments loser";
            chrome.windows.create({
                url: "popup.html",
                type: "popup", // Create a small popup window
                width: 400,
                height: 400
            });
        } else if (totalTime = 60 && totalTime <= 61){
            currentImage = images.warning3;
            statusText.textContent = "What are you doing with your life mate?";
            chrome.windows.create({
                url: "popup.html",
                type: "popup", // Create a small popup window
                width: 400,
                height: 400
            });
        } else if (totalTime = 75 && totalTime <= 76) {
            currentImage = images.warning4;
            statusText.textContent = "Go do something before I doxx you";
            chrome.windows.create({
                url: "popup.html",
                type: "popup", // Create a small popup window
                width: 400,
                height: 400
            });
        } else if (totalTime = 90 && totalTime <= 91) {
            currentImage = images.warning5;
            statusText.textContent = "Mum would be disappointed with you";
            chrome.windows.create({
                url: "popup.html",
                type: "popup", // Create a small popup window
                width: 400,
                height: 400
            });
        } else currentImage = images.neutral;

        // Apply the image
        image.src = currentImage;
    });
});
