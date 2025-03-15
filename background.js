let activeTabId = null;
let startTime = null;
// Track Twitter Insta and Snap
let trackedSites = ["x.com", "instagram.com", "tiktok.com"];

// Tab Changes
chome.tabs.onActivated.addListener(async (activateInfo) => {
	const tab = await chrome.tabs.get(activeInfo.tabId);
	handleTabChange(tab);
});

// Tab Updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === "complete") {
		handleTabChange(tab);
	}
});

// Window Changes
chrome.windows.onFocusChanged.addListener(async (windowId) => {
	if (windowId === chrome.windows.WINDOW_ID_NONE) {
		stopTracking();
	} else {
		const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
		if (tabs.length > 0) {
			handleTabChange(tabs[0]);
		}
	}
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    chrome.storage.local.get(["timeData"], (result) => {
        let timeData = result.timeData || {};
        let updatedData = {};

        // Reset time for the closed tab's site
        for (let site in timeData) {
            if (!updatedData[site]) {
                updatedData[site] = 0;  // Reset time when the tab is closed
            }
        }

        chrome.storage.local.set({ timeData: updatedData });
    });
});

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    chrome.storage.local.get(["timeData"], (result) => {
        let timeData = result.timeData || {};
        let updatedData = {};

        // Reset time for the closed tab's site
        for (let site in timeData) {
            if (!updatedData[site]) {
                updatedData[site] = 0;  // Reset time when the tab is closed
            }
        }

        chrome.storage.local.set({ timeData: updatedData });
    });
});

function handleTabChange(tab) {
	if (!tab || !tab.url) return;
	const hostname = new URL(tab.url).hostname;
    
    // Check for tracked site
    if (trackedSites.some(site => hostname.includes(site))) {
		startTracking(tab.id);
	} else {
		stopTracking();
	}
}

function startTracking(tabId) {
	if (activeTabId === tabId) return;
	// Stop previous tab tracking
	stopTracking(); 

	activeTabId = tabId;
	startTime = Date.now();
}

function stopTracking() {
    if (activeTabId && startTime) {
        const timeSpent = (Date.now() - startTime) / 1000;
        // Save the time when tracking is finished
        saveTime(activeTabId, timeSpent);
    }
    activeTabId = null;
    startTime = null;
}

function saveTime(tabId, timeSpent) {
    chrome.storage.local.get(["timeData"], (result) => {
        let timeData = result.timeData || {};
        let domain = trackedSites.find(site => site.includes(tabId));

        // Store the Time in Local Storage so that it can be Accessed by popup.js
        if (domain) {
            timeData[domain] = (timeData[domain] || 0) + timeSpent;
            chrome.storage.local.set({ timeData });
        }
    });
}