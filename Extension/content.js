// content.js

const savedPosts = [];

// Function to extract saved posts from Instagram
function getSavedPosts() {
    console.log('Content script running'); // Debugging line
    const posts = document.querySelectorAll('#mount_0_0_u2 > div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x9f619.xvbhtw8.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.x1gryazu.xh8yej3.x10o80wk.x14k21rp.x17snn68.x6osk4m.x1porb0y.x8vgawa > section > main > div > div > div.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1n2onr6.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1'); // Adjust this selector if needed
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
