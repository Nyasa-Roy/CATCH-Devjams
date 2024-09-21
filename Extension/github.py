import requests

USERNAME = 'Nyasa-Roy'
HEADER = {'Accept': 'application/vnd.github.v3.star+json'}

for i in range(1, 19):
    url = f"https://api.github.com/users/{USERNAME}/starred?per_page=100&page={i}"
    fname = f"GithubStarredpost-{USERNAME}-{i}.json"
    response = requests.get(url, headers=HEADER)
    if response.status_code==200:
         starredcontent=response.json()

    if not starredcontent:
        break
    if response.status_code == 200:
        with open(fname, 'w') as file:
            file.write(response.text)
        print(f"Saved {fname}")
    else:
        print(f"Failed to fetch {url}: {response.status_code}")
