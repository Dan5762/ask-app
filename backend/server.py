import os
from dotenv import load_dotenv

from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import re


app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes
load_dotenv()


@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    query = data.get('query')

#     prompt = f"""Generate a series of 2-3 comments based on the following query. The output should be a list of comments that are relevant to the query, eg ```["Some comment...", "Another comment...", ...]```.

# Query:
# {query}

# Comments:
# """

#     messages = [{
#         "role": "system",
#         "content": [
#             {"type": "text", "text": prompt}
#         ]
#     }]

#     client = openai.OpenAI()
#     response = client.chat.completions.create(
#         temperature=0,
#         model='gpt-4o',
#         messages=messages
#     )

#     output = response.choices[0].message.content

    # print(output)

    # Extract the list of comments from the comments string
    # comments = re.findall(r'\["(.*?)"\]', output)
    # comments = comments[0].split('", "')

    # Print the extracted list of comments
    comments = [
        {"text": "I normally go for al dente, I find I digest it much better that way.", "children": [], "expanded": False},
        {"text": "Pasta's really easy, just bang in 180g's of your finest penne with some boiling water, and bob's your uncle you got pasta", "children": [], "expanded": False},
        {"text": "Usually with tomato and cheese, so simple and sooooo tasty", "children": [], "expanded": False}
    ]
    print(comments)

    return jsonify(comments)


@app.route('/login', methods=['POST'])
def login():
    data = request.json

    stored_password = os.getenv('PASSWORD')

    if data.get('password') == stored_password:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid password"}), 400


if __name__ == '__main__':
    app.run(debug=True, port=5000)
