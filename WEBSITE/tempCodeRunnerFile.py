from flask import Flask, render_template, request
import requests
import time
import json

app = Flask(__name__)

HEADER = {
    'Accept': 'application/vnd.github.v3.star+json',
}

def linkbhej(username):
    all_repos = []
    for i in range(1, 19):
        url = f"https://api.github.com/users/{username}/starred?per_page=100&page={i}"
        
        response = requests.get(url, headers=HEADER)
        
        # Handle rate limiting
        if response.status_code == 403:
            reset_time = int(response.headers.get("X-RateLimit-Reset", time.time() + 60))  # Get reset time from headers
            sleep_time = max(reset_time - time.time(), 0)
            print(f"Rate limit exceeded. Sleeping for {int(sleep_time)} seconds...")
            time.sleep(sleep_time)
            continue
        
        if response.status_code == 200:
            starred_content = response.json()
            
            # Stop if no more content
            if not starred_content:
                break
            
            # Append the current batch of repositories
            all_repos.extend(starred_content)
            
        else:
            return f"Failed to fetch data for {username}: {response.status_code}"
    
    # Extract and return the repository URLs
    repo_urls = [item["repo"]["html_url"] for item in all_repos]
    
    if repo_urls:
        return repo_urls
    else:
        return "No repositories found"

# Flask route for the homepage
@app.route('/')
def home():
    return render_template('index.html')

# Flask route to handle the form submission
@app.route('/fetch', methods=['POST'])
def fetch_repos():
    username = request.form.get('username')
    repos = linkbhej(username)
    
    if isinstance(repos, list):
        return render_template('repos.html', username=username, repos=repos)
    else:
        return render_template('index.html', error=repos)

if __name__ == '__main__':
    app.run(debug=True)
