import requests
import time
import json

USERNAME = 'Nyasa-Roy'
HEADER = {
    'Accept': 'application/vnd.github.v3.star+json',
    # 'Authorization': 'token YOUR_PERSONAL_ACCESS_TOKEN'  # Uncomment this line if using authentication
}

for i in range(1, 19):
    url = f"https://api.github.com/users/{USERNAME}/starred?per_page=100&page={i}"
    fname = f"GithubStarredpost-{USERNAME}-{i}.json"
    
    response = requests.get(url, headers=HEADER)
    
    # Handle rate limiting
    if response.status_code == 403:
        print("Rate limit exceeded. Sleeping for 60 seconds...")
        time.sleep(60)
        continue
    
    if response.status_code == 200:
        starred_content = response.json()
        
        # Stop if no more content
        if not starred_content:
            break
        
        # Save to JSON
        with open(fname, 'w') as file:
            json.dump(starred_content, file, indent=4)
        print(f"Saved {fname}")
    else:
        print(f"Failed to fetch {url}: {response.status_code}")