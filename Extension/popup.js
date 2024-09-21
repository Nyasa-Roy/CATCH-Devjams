// popup.js

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getData').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getSavedPosts" }, (response) => {
                if (chrome.runtime.lastError) {
                    console.error(chrome.runtime.lastError);
                    document.getElementById('data').textContent = 'Error connecting to content script.';
                    return;
                }

                if (response && response.posts) {
                    displayPosts(response.posts);
                } else {
                    document.getElementById('data').textContent = 'No saved posts found.Have a good day!';
                }
            });
        });
    });
});

// Function to display posts in the popup
function displayPosts(posts) {
    const dataContainer = document.getElementById('data');
    dataContainer.innerHTML = ''; // Clear previous data

    if (posts.length > 0) {
        posts.forEach(post => {
            const postElement = document.createElement('p');
            postElement.innerHTML = `<a href="${post.url}" target="_blank">${post.title}</a>`;
            dataContainer.appendChild(postElement);
        });
    } else {
        dataContainer.innerHTML = '<p>No posts available.</p>';
    }
};
