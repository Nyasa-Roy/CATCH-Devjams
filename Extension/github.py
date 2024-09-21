import requests
import time
import json

USERNAME = 'Nyasa-Roy'
HEADER = {
    'Accept': 'application/vnd.github.v3.star+json',
    # 'Authorization': 'token YOUR_PERSONAL_ACCESS_TOKEN'  # Uncomment this line if using authentication
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
            
            # Save the current page's content to a file
            fname = f"GithubStarredpost-{username}-{i}.json"
            with open(fname, 'w') as file:
                json.dump(starred_content, file, indent=4)
            
        else:
            return f"Failed to fetch {url}: {response.status_code}"
    
    # Extract and return the repository URLs
    repo_urls = [item["repo"]["html_url"] for item in all_repos]
    
    if repo_urls:
        return repo_urls
    else:
        return "No repositories found"

# Call the function
repos = linkbhej(USERNAME)
for repo in repos:
    print(repo)

