document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getData').addEventListener('click', () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getSavedPosts" }, (response) => {
                if (response && response.posts) {
                    fetch('http://localhost:5000/categorize', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ savedPosts: response.posts })
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(categorizedData => {
                        chrome.storage.local.set({ 'categorizedPosts': categorizedData }, () => {
                            displayCategoryButtons(categorizedData);
                        });
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                        document.getElementById('data').textContent = 'Error fetching data.';
                    });
                } else {
                    document.getElementById('data').textContent = 'No saved posts found.Have a good day!';
                }
            });
        });
    });

    function displayCategoryButtons(categorizedData) {
        const categories = {};

        for (const [postTitle, data] of Object.entries(categorizedData)) {
            const category = data.category;
            if (!categories[category]) {
                categories[category] = [];
            }
            categories[category].push(data);
        }

        const buttonContainer = document.getElementById('buttons');
        buttonContainer.innerHTML = '';

        for (const [category, posts] of Object.entries(categories)) {
            const button = document.createElement('button');
            button.textContent = category;
            button.onclick = () => displayPostsInCategory(category, posts);
            buttonContainer.appendChild(button);
        }
    }

    function displayPostsInCategory(category, posts) {
        const dataContainer = document.getElementById('data');
        dataContainer.innerHTML = `<h2>${category}</h2>`;
        
        if (posts.length > 0) {
            posts.forEach(post => {
                const postElement = document.createElement('p');
                postElement.innerHTML = `<a href="${post.url}" target="_blank">${post.title}</a>`;
                dataContainer.appendChild(postElement);
            });
        } else {
            dataContainer.innerHTML += '<p>No posts available in this category.</p>';
        }
    }
});
