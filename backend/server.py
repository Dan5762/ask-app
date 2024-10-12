from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


@app.route('/strings', methods=['POST'])
def get_strings():
    # This list can be modified to include any strings you want to return
    strings_list = [
        "Hello World, this is a test. Perhaps I should have said something more interesting.",
        "When I was a kid, I used to play with my friends. But now I am a grown up and I don't have time for that. If I had more time, I would have gone to the gym today.",
        "I am a software engineer and I love to code. I also love to travel and explore new places. I have been to 25 countries and 45 states. I have a goal to visit all 50 states and 7 continents.",
        "The quick brown fox jumps over the lazy dog. If the dog barked, was it really lazy?",
    ]
    return jsonify(strings_list)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
