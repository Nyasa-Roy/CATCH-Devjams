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

// Call the function on page load
window.addEventListener('load', getSavedPosts);
