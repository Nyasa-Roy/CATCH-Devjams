const savedPosts = [];

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSavedPosts") {
        getSavedPosts(); // Call the function to retrieve saved posts
        sendResponse({ posts: savedPosts });
    }
});

// Function to extract saved posts from Instagram
function getSavedPosts() {
    console.log('Content script running'); // Debugging line
    const posts = document.querySelectorAll('YOUR_SELECTOR_HERE'); // Update this selector
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
