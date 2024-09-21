from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this based on your needs
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

USERNAME = 'Nyasa-Roy'
HEADER = {
    'Accept': 'application/vnd.github.v3.star+json',
}

@app.get("/starred/{username}")
async def get_starred_repos(username: str):
    language_map = {}
    for i in range(1, 19):
        url = f"https://api.github.com/users/{username}/starred?per_page=100&page={i}"
        response = requests.get(url, headers=HEADER)

        if response.status_code == 403:
            return {"error": "Rate limit exceeded."}
        elif response.status_code == 200:
            starred_content = response.json()
            if not starred_content:
                break
            for item in starred_content:
                language = item.get("language", "Unknown")
                if language not in language_map:
                    language_map[language] = []
                language_map[language].append(item)
        else:
            return {"error": f"Failed to fetch repositories: {response.status_code}"}

    return language_map
