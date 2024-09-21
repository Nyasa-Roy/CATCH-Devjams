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

    // Use a reliable selector to target posts (adjust if needed based on inspection)
    const posts = document.querySelectorAll('a[href^="/p/"]'); // Target anchor tags with post URLs starting with "/p/"
    
    // Array to store saved posts
    const savedPosts = [];

    posts.forEach(post => {
        const title = post.getAttribute('aria-label'); // Check if aria-label exists and contains the post description
        const url = post.href; // Get the post URL
        savedPosts.push({ title, url }); // Add the post title and URL to the savedPosts array
    });

    console.log(savedPosts); // Log the saved posts for debugging
    chrome.runtime.sendMessage({ posts: savedPosts }); // Send saved posts to background script
}

// Call the function when the DOM is fully loaded
window.addEventListener('load', () => {
    setTimeout(getSavedPosts, 3000); // Optional: Add a delay to ensure posts have loaded
});
