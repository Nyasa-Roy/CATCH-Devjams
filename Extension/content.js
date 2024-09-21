const savedPosts = [];

// Function to extract saved posts from Instagram
function getSavedPosts() {
    const posts = document.querySelectorAll('article a'); // Adjust this selector based on Instagram's structure
    posts.forEach(post => {
        const title = post.getAttribute('aria-label'); // Get the post title or description
        const url = post.href; // Get the post URL
        savedPosts.push({ title, url });
    });
    // Send data to popup or background script
    chrome.runtime.sendMessage({ posts: savedPosts });
}

// Call the function on page load
window.addEventListener('load', getSavedPosts);