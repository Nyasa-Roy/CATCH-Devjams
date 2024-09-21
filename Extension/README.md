GitHub Starred Repositories Fetcher
This project is designed to fetch and display the repositories that a GitHub user has starred, using the GitHub API. The program is written in Python and uses the requests library to make API calls to GitHub, retrieve the list of starred repositories, and display them in a user-friendly format. It handles rate limiting imposed by the GitHub API and is designed to fetch all starred repositories by making multiple requests if necessary.

Table of Contents
Introduction
Features
Prerequisites
Installation
Usage
How It Works
Rate Limiting
Improvements and Future Work
Troubleshooting
License
1. Introduction
GitHub provides a feature for users to star repositories they find interesting or wish to revisit later. This project allows users to fetch and view all the repositories they or others have starred on GitHub. The fetched data is displayed in the form of repository URLs.

One common issue when working with the GitHub API is rate limiting, which occurs if too many requests are made within a short period of time. This script includes built-in handling for GitHub's API rate limiting, ensuring it pauses and resumes appropriately if the limit is reached.

2. Features
Fetch starred repositories for any GitHub user.
Handles GitHub's API rate-limiting effectively.
Outputs repository URLs for easy access.
Supports pagination, ensuring that all starred repositories are retrieved even if there are many pages of results.
Can be extended with GitHub authentication for higher API rate limits (useful for users who fetch starred repos frequently).
3. Prerequisites
Before you can run this project, you will need the following:

Python 3.x installed on your machine.

requests library for Python to make HTTP requests. You can install it using the following command:

bash
Copy code
pip install requests
GitHub Access Token (optional but recommended): While the script can work without authentication, using a personal access token allows you to make more requests before hitting the API rate limit.

4. Installation
To get started with the GitHub Starred Repositories Fetcher, follow these steps:

Clone the repository:

If the project is hosted on GitHub, you can clone it using:

bash
Copy code
git clone https://github.com/yourusername/github-star-fetcher.git
cd github-star-fetcher
Install the required dependencies:

Use pip to install the requests library:

bash
Copy code
pip install requests
Setup your access token (Optional but Recommended):

To avoid hitting the rate limits too often, generate a GitHub personal access token:

Go to GitHub → Settings → Developer settings → Personal Access Tokens.
Generate a new token with the appropriate permissions (you only need public_repo access).
Uncomment the line # 'Authorization': 'token YOUR_PERSONAL_ACCESS_TOKEN' in the script and replace YOUR_PERSONAL_ACCESS_TOKEN with your actual token.
5. Usage
To use the script, follow these steps:

Edit the script to replace the USERNAME variable with the GitHub username whose starred repositories you want to fetch:

python
Copy code
USERNAME = 'Nyasa-Roy'
Run the script:

After setting the username, run the Python script from your terminal:

bash
Copy code
python fetch_starred.py
View the output:

The script will print the URLs of the repositories the user has starred.

Example:
bash
Copy code
python fetch_starred.py
Repo URL: https://github.com/someuser/someproject
Repo URL: https://github.com/anotheruser/anotherproject
...
6. How It Works
Main Components
GitHub API Request: The GitHub API provides an endpoint that lets you retrieve the repositories a user has starred. The URL structure is as follows:

bash
Copy code
https://api.github.com/users/{username}/starred
The script sends an HTTP GET request to this endpoint, using the requests library. The response is a JSON array of repositories the user has starred.

Pagination: GitHub limits the number of results returned in a single API call to 100 repositories. If the user has starred more than 100 repositories, the script will automatically fetch the next "page" of results until all repositories have been retrieved.

Rate Limiting: GitHub imposes rate limits on how many API requests can be made in an hour (60 requests per hour for unauthenticated requests, 5000 for authenticated requests). If the rate limit is exceeded, the script will automatically wait for the rate limit to reset before continuing.

Key Functions:
linkbhej(username)
This function performs the following:

Iterates over pages of results from the GitHub API.
If rate-limited, it waits until the rate limit resets.
Saves each batch of results into a JSON file for easy reference.
Returns a list of repository URLs.
python
Copy code
def linkbhej(username):
    all_repos = []
    
    page = 1
    while True:
        url = f"https://api.github.com/users/{username}/starred?per_page=100&page={page}"
        response = requests.get(url, headers=HEADER)
        
        if response.status_code == 403:  # Rate-limited
            reset_time = int(response.headers.get("X-RateLimit-Reset", time.time() + 60))
            sleep_time = max(reset_time - time.time(), 0)
            print(f"Rate limit exceeded. Sleeping for {int(sleep_time)} seconds...")
            time.sleep(sleep_time)
            continue
        
        if response.status_code != 200:
            return f"Failed to fetch {url}: {response.status_code}"
        
        starred_content = response.json()
        
        if not starred_content:
            break  # No more pages
        
        all_repos.extend(starred_content)
        page += 1
    
    repo_urls = [item["repo"]["html_url"] for item in all_repos]
    return repo_urls if repo_urls else "No repositories found"
7. Rate Limiting
GitHub enforces rate limiting on its API to prevent abuse. Here are some details about the rate limits:

Unauthenticated Requests: 60 requests per hour.
Authenticated Requests (with a personal access token): 5000 requests per hour.
Handling Rate Limiting
When the rate limit is exceeded, GitHub returns a 403 Forbidden status code. The script reads the X-RateLimit-Reset header, which tells us when the rate limit will reset. It calculates the remaining time and sleeps until that time is reached, preventing further requests until the limit is lifted.

python
Copy code
if response.status_code == 403:
    reset_time = int(response.headers.get("X-RateLimit-Reset", time.time() + 60))
    sleep_time = max(reset_time - time.time(), 0)
    print(f"Rate limit exceeded. Sleeping for {int(sleep_time)} seconds...")
    time.sleep(sleep_time)
8. Improvements and Future Work
This project is a simple utility to fetch GitHub starred repositories, but there are a few ways it can be improved:

Web Interface: You can create a Flask-based web interface where users can enter their GitHub username and see the starred repositories in the browser.
Sorting and Filtering: Add functionality to sort the starred repositories by language, stars, or last updated date.
Export to CSV: Add an option to export the repository data to a CSV or Excel file for easy reference.
Error Handling: Improve error handling for scenarios like invalid usernames, network issues, or GitHub server downtime.
9. Troubleshooting
Common Issues
Rate Limit Exceeded: If you're fetching repositories frequently, you might hit GitHub's rate limit. Consider using a personal access token for increased limits.
Invalid Username: Double-check that the GitHub username you're using is valid.
Network Issues: If you're facing network problems, ensure your internet connection is stable and try again.
Debugging Tips
Check the API response status codes to understand what went wrong (403 for rate-limiting, 404 for invalid username, etc.).
Use a small test case (a GitHub user with only a few starred repositories) to verify the script works before scaling up.
10. License
This project is licensed under the MIT License. See the LICENSE file for more details.

