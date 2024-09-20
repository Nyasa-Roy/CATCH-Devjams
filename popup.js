document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('getData').addEventListener('click', () => {
      const postsData = ["My first saved post", "Another interesting article about coding"]; 
  
      fetch('http://localhost:5000/categorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ savedPosts: postsData })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(categorizedData => {
        chrome.storage.local.set({ 'categorizedPosts': categorizedData }, () => {
          console.log('Categorized posts saved to storage:', categorizedData);
          displayCategoryButtons(categorizedData);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('data').textContent = 'Error fetching data.';
      });
    });
  
    function displayCategoryButtons(categorizedData) {
      const categories = {};
      
      // Organize posts by category
      for (const [post, category] of Object.entries(categorizedData)) {
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(post);
      }
  
      // Clear previous buttons
      const buttonContainer = document.getElementById('buttons');
      buttonContainer.innerHTML = '';
  
      // Create buttons for each category
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
          postElement.textContent = post;
          dataContainer.appendChild(postElement);
        });
      } else {
        dataContainer.innerHTML += '<p>No posts available in this category.</p>';
      }
    }
  });
  