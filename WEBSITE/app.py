from flask import Flask, render_template
import requests
import time
import json

app = Flask(__name__)

USERNAME = 'Nyasa-Roy'
HEADER = {
    'Accept': 'application/vnd.github.v3.star+json',
}

def get_starred_repos(username):
    all_repos = []
    for i in range(1, 19):
        url = f"https://api.github.com/users/{username}/starred?per_page=100&page={i}"
        response = requests.get(url, headers=HEADER)
        
        if response.status_code == 403:
            reset_time = int(response.headers.get("X-RateLimit-Reset", time.time() + 60))
            sleep_time = max(reset_time - time.time(), 0)
            time.sleep(sleep_time)
            continue

        if response.status_code == 200:
            starred_content = response.json()
            if not starred_content:
                break
            all_repos.extend(starred_content)
        else:
            return []
    
    return [item["repo"]["html_url"] for item in all_repos]

@app.route('/')
def index():
    repos = get_starred_repos(USERNAME)
    return render_template('index.html', repos=repos)

if __name__ == '__main__':
    app.run(debug=True)
