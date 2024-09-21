// Event listener for the "Fetch Starred Repos" button
document.getElementById('fetch-repos-btn').addEventListener('click', () => {
    console.log("Button clicked!");  // Debugging line
    const username = document.getElementById('github-username').value;

    if (!username) {
        alert('Please enter a GitHub username.');
        return;
    }

    $.ajax({
        url: `http://localhost:8000/starred/${username}`,
        method: 'GET',
        success: function(languageData) {
            console.log("Data received:", languageData);  // Debugging line
            displayLanguageButtons(languageData);
        },
        error: function(xhr) {
            alert('Failed to fetch repositories. Please try again.');
            console.error(xhr);
        }
    });
});

// Function to display buttons for each language
function displayLanguageButtons(languageMap) {
    const languageButtonsDiv = document.getElementById('language-buttons');
    languageButtonsDiv.innerHTML = ''; // Clear any existing buttons

    // Create a button for each language
    for (const language in languageMap) {
        const button = document.createElement('button');
        button.innerText = language;
        button.onclick = () => displayReposByLanguage(languageMap[language]);
        languageButtonsDiv.appendChild(button);
    }

    document.getElementById('language-section').classList.remove('hidden'); // Show the language section
}

// Function to display repositories by selected language
function displayReposByLanguage(repos) {
    const repoList = document.getElementById('repo-list');
    repoList.innerHTML = ''; // Clear any existing repo list

    // Create a list item for each repo
    repos.forEach(repo => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = repo.html_url;
        link.innerText = repo.full_name;
        link.target = '_blank'; // Open link in a new tab
        listItem.appendChild(link);
        repoList.appendChild(listItem);
    });

    document.getElementById('repo-list-section').classList.remove('hidden'); // Show the repository list
}
