// content.js

const savedPosts = [];

// Function to extract saved posts from Instagram
function getSavedPosts() {
    console.log('Content script running'); // Debugging line
    const posts = document.querySelectorAll('article a'); // Adjust this selector if needed
    posts.forEach(post => {
        const title = post.getAttribute('aria-label'); // Get the post title or description
        const url = post.href; // Get the post URL
        savedPosts.push({ title, url });
    });

    console.log(savedPosts); // Debugging line
    chrome.runtime.sendMessage({ posts: savedPosts });
}

// Call the function on page load
window.addEventListener('load', getSavedPosts);
