from flask import Flask, request, jsonify
from flask_cors import CORS
import spacy

app = Flask(__name__)
CORS(app)  # Allow all origins; for more control, specify origins here

nlp = spacy.load("en_core_web_sm")

@app.route('/categorize', methods=['POST'])
def categorize_posts():
    data = request.json
    print("Request received")  # Debugging line
    data = request.json
    print(data)  # See incoming data
    posts = data['savedPosts']
    categorized = {post['title']: {"url": post['url'], "category": categorize_post(post['title'])} for post in posts}
    return jsonify(categorized)

def categorize_post(post):
    doc = nlp(post.lower())
    if "coding" in post:
        return "Coding"
    elif "movie" in post:
        return "Movie Recommendation"
    elif "book" in post:
        return "Book Recommendation"
    elif "edit" in post:
        return "Editing"
    elif "recipe" in post:
        return "Recipes"
    else:
        return "Uncategorized"

if __name__ == "__main__":
    app.run(debug=True)
