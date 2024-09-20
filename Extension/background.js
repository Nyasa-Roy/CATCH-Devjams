chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.savedData) {
      fetch('http://localhost:5000/categorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: request.savedData})
      })
      .then(response => response.json())
      .then(categories => {
        console.log(categories);
        // Optionally store categorized data in Chrome storage
        chrome.storage.local.set({categorizedData: categories});
      });
    }
  });
  